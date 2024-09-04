// src/firebaseConfig.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBqCAIcBrnCrMx4TmlOR5j9v6QRhlS2HwI',
	authDomain: 'chores-a385d.firebaseapp.com',
	projectId: 'chores-a385d',
	storageBucket: 'chores-a385d.appspot.com',
	messagingSenderId: '557594084836',
	appId: '1:557594084836:web:d82a18ba98ec5e923f33f1'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)
