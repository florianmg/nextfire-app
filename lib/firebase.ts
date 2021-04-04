import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/**
 * Firebase SDK Projet configuration
 */
const firebaseConfig = {
  apiKey: "AIzaSyBa62sC6zdVSEl7iPqBjhx-a3yc48NrWx4",
  authDomain: "nextfire-app-587b8.firebaseapp.com",
  projectId: "nextfire-app-587b8",
  storageBucket: "nextfire-app-587b8.appspot.com",
  messagingSenderId: "764361996912",
  appId: "1:764361996912:web:93d8366a0c21285b7152b5"
};
  
/**
 * Prevent from initializing app twice
 */
if (!firebase.apps.length) { 
  firebase.initializeApp(firebaseConfig)
}

/**
 * Init firebase tools
 */
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();