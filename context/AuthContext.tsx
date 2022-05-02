import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth'

import { auth } from '../config/firebase'

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  console.log(user)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser({
          uid: authUser.uid,
          email: authUser.email,
          displayName: authUser.displayName,
          photoURL: authUser.photoURL,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const githubSignInWithPopup = async () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const githubUser = result.user
        setUser({
          uid: githubUser.uid,
          email: githubUser.email,
          displayName: githubUser.displayName,
          photoURL: githubUser.photoURL,
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const googleSignInWithPopup = async () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
      .then((result) => {
        const googleUser = result.user
        setUser({
          uid: googleUser.uid,
          email: googleUser.email,
          displayName: googleUser.displayName,
          photoURL: googleUser.photoURL,
        })
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  const signOut = async () => {
    setUser(null)
    await auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, githubSignInWithPopup, googleSignInWithPopup, signOut }}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}
