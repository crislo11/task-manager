import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

/**
 * NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCz-VaFYSiOTJTnI1trWAB8dTohPigeL3M
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=project-management-592ce.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=project-management-592ce
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=project-management-592ce.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=747759643266
NEXT_PUBLIC_FIREBASE_APP_ID=1:747759643266:web:289f4919ac09adf3ae229b
 */
const firebaseConfig = {
  apiKey: "AIzaSyCz-VaFYSiOTJTnI1trWAB8dTohPigeL3M",
  authDomain: "project-management-592ce.firebaseapp.com",
  projectId: "project-management-592ce",
  storageBucket: "project-management-592ce.firebasestorage.app",
  messagingSenderId: "747759643266",
  appId: "1:747759643266:web:289f4919ac09adf3ae229b",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { db };
