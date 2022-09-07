import firebase from 'firebase';
import "firebase/storage";
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCsJ3pwYBkq-CDTCxBrC8gbvDcPFqwzBLs",
  authDomain: "jira-clone-bfb85.firebaseapp.com",
  projectId: "jira-clone-bfb85",
  storageBucket: "jira-clone-bfb85.appspot.com",
  messagingSenderId: "128887216799",
  appId: "1:128887216799:web:f4f0c089e6796c9ede20aa",
  measurementId: "G-X5BBVXRFV2",
});

export const db = firebaseConfig.firestore();
export const auth = firebaseConfig.auth();
export const storage = firebaseConfig.storage();


