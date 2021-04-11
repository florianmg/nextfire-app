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

// HELPERS

/**
* Gets a users/{uid} document with username
* @param  {string} username
*/
export const getUserWithUsername = async (username: string) => {
  const usersRef = firestore.collection('users');
  console.log("username => ", username)
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];

  return userDoc;
}

/**
* Converts a firestore document to JSON
* @param  {DocumentSnapshot} doc
*/
export const postsToJSON = (doc) => {
  const data = doc.data();

  return {
    ...data,
    // firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis()
  }
}

/**
* Creates a new timestamp from the given number of milliseconds.
* @param milliseconds
* Number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
*
* @return
* A new Timestamp representing the same point in time as the given number of milliseconds.
*/
export const fromMillis = firebase.firestore.Timestamp.fromMillis;