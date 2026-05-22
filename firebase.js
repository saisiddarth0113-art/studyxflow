const firebaseConfig = {
  apiKey: "AIzaSyCV4Dh59Z7a787_6K9wyFQEkpwpYzJELhk",
  authDomain: "studyxflow.firebaseapp.com",
  projectId: "studyxflow",
  storageBucket: "studyxflow.firebasestorage.app",
  messagingSenderId: "694556908965",
  appId: "1:694556908965:web:3d514b02f2cc56579adc4c",
  measurementId: "G-VR94LFWTMS"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();