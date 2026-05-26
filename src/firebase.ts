import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyDpa3z6iGvCm1Or9hZz6ZgT6uZBAKVUlpY",
  authDomain: "disney-app-d2597.firebaseapp.com",
  projectId: "disney-app-d2597",
  storageBucket: "disney-app-d2597.firebasestorage.app",
  messagingSenderId: "823498845682",
  appId: "1:823498845682:web:b91afc8244c4980f320f6b"
}

const app = initializeApp(firebaseConfig)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})
export const db = getFirestore(app)