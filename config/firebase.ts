// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyB_40Vvsei0msN7dLy1lv9Ysce0-Wzf5r0',
  authDomain: 'learn-fun-11244.firebaseapp.com',
  projectId: 'learn-fun-11244',
  storageBucket: 'learn-fun-11244.appspot.com',
  messagingSenderId: '817831349516',
  appId: '1:817831349516:web:dd8cabd08307ad88bb8d29',
  measurementId: 'G-5KGNM55TL5',
}

// Initialize Firebase
const apps = getApps()
const app = apps.length > 0 ? apps[0] : initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)

export const auth = getAuth(app)
