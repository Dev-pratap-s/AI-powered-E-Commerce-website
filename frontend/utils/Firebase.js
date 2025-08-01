import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecard.firebaseapp.com",
  projectId: "loginonecard",
  storageBucket: "loginonecard.firebasestorage.app",
  messagingSenderId: "388256072067",
  appId: "1:388256072067:web:2c6cea34370b45d71076b6"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Get auth instance
const auth = getAuth(app);



const provider =new GoogleAuthProvider()

export { auth, provider };