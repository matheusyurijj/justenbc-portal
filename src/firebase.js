import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnja321y36CwV8NLyqU0MOwiV7CGty14w",
  authDomain: "justenbc-c5015.firebaseapp.com",
  projectId: "justenbc-c5015",
  storageBucket: "justenbc-c5015.firebasestorage.app",
  messagingSenderId: "1089888977284",
  appId: "1:1089888977284:web:9bc2c67d8c88c9cc169dd1",
  measurementId: "G-CNRZ1N30VX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;