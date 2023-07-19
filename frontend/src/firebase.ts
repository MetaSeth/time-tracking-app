import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyDpkLNLJCL6uj3INQJLMe-LTjBei8CUT8Y',
    authDomain: 'time-tracking-app-7d901.firebaseapp.com',
    projectId: 'time-tracking-app-7d901',
    storageBucket: 'time-tracking-app-7d901.appspot.com',
    messagingSenderId: '1091539694889',
    appId: '1:1091539694889:web:77344147f5bc57625df338',
}

let instance: FirebaseApp | null = null

export const getFirebaseInstance = () => {
    if (!instance) {
        instance = initializeApp(firebaseConfig)
    }
    return instance
}

export const getFirestoreInstance = () => {
    const firebaseInstance = getFirebaseInstance()
    return getFirestore(firebaseInstance)
}
