import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDabgowi1-rIIChyMVCHFOgKoVQi73uWFE",
    authDomain: "nextfire-50ecb.firebaseapp.com",
    projectId: "nextfire-50ecb",
    storageBucket: "nextfire-50ecb.appspot.com",
    messagingSenderId: "964632017205",
    appId: "1:964632017205:web:71d16faa075edace11b47c",
    measurementId: "G-RJNRGZ4VN9"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  export const auth = firebase.auth();
  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export const firestore = firebase.firestore();
  export const fromMillis = firebase.firestore.Timestamp.fromMillis;
  export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
  export const increment = firebase.firestore.FieldValue.increment;

  export const storage = firebase.storage();
  export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

  // Helper functions

  /**
   * Gets a users/{uid} document with username
   * @param {string} username 
   */
  export async function getUserWithUsername(username) {
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    return userDoc;
  }

  export function postToJSON(doc) {
    const data = doc.data();
    return {
      ...data,
      createdAt: data.createdAt.toMillis(),
      updatedAt: data.updatedAt.toMillis(),
    };
  }