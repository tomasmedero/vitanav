// Import the functions you need from the SDKs you need

import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getFirestore } from 'firebase/firestore/lite'

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: 'AIzaSyBhp1eJmMMz_CLSjASqiMmei2JylXE-Ppo',

  authDomain: 'vita-nav.firebaseapp.com',

  projectId: 'vita-nav',

  storageBucket: 'vita-nav.appspot.com',

  messagingSenderId: '378941640063',

  appId: '1:378941640063:web:73071d2490bfc5b07e1e4a',
}

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig)

export const FirebaseAuth = getAuth(FirebaseApp)

export const FirebaseDB = getFirestore(FirebaseApp)
