import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYRgHMuQ1y9rGEOmhmCKYUSsz9AiPPqjU",
  authDomain: "center78.firebaseapp.com",
  projectId: "center78",
  storageBucket: "center78.firebasestorage.app",
  messagingSenderId: "787984389741",
  appId: "1:787984389741:web:5c8d6b243860b576bd5164",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
