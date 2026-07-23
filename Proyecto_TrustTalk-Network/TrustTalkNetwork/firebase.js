// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAg0hfPYOxa5nSaCFJEKIGvvPpoF8bcm2E",
  authDomain: "trusttalknetwork.firebaseapp.com",
  projectId: "trusttalknetwork",
  storageBucket: "trusttalknetwork.appspot.com",
  messagingSenderId: "254007976737",
  appId: "1:254007976737:web:2653c7e2d7540a29e79460",
  measurementId: "G-JQYPSSNR4Q",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
