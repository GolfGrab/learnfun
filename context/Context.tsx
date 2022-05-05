import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
} from 'firebase/auth'
import { getDoc, doc, collection, setDoc } from 'firebase/firestore'
import { auth, firestore } from '../config/firebase'

interface ContextInterface {
  dbUser: any
  user: User | null
  githubSignInWithPopup: () => Promise<void>
  googleSignInWithPopup: () => Promise<void>
  signOut: () => Promise<void>
}

const Context = createContext<ContextInterface | null>(null)

export const useAuth = () => useContext(Context)

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [dbUser, setDbUser] = useState<any>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  // console.log(user, loading)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        setUser(authUser)
        const docRef = doc(firestore, 'users', authUser.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setDbUser(docSnap.data())
        } else {
          // add user to DB

          await setDoc(doc(collection(firestore, 'users'), authUser.uid), {
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
            uid: authUser.uid,
          })
          setDbUser({
            uid: authUser.uid,
            displayName: authUser.displayName,
            email: authUser.email,
            photoURL: authUser.photoURL,
          })
        }
      } else {
        setUser(null)
        setDbUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const githubSignInWithPopup = async () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
      const githubUser = result.user
      setUser(githubUser)
    })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   console.log(errorCode, errorMessage)
    // })
  }

  const googleSignInWithPopup = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result) => {
      const googleUser = result.user
      setUser(googleUser)
    })
    // .catch((error) => {
    //   // Handle Errors here.
    //   const errorCode = error.code
    //   const errorMessage = error.message
    //   console.log(errorCode, errorMessage)
    // })
  }

  const signOut = async () => {
    setUser(null)
    await auth.signOut()
  }

  return (
    <Context.Provider
      value={{ dbUser, user, githubSignInWithPopup, googleSignInWithPopup, signOut }}
    >
      {loading ? null : children}
    </Context.Provider>
  )
}
