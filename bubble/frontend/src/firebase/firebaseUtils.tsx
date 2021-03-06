import firebase from "firebase/app/"
import "firebase/database/"
import "firebase/firestore/"

const FIREBASE_CONFIG = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
}

firebase.initializeApp(FIREBASE_CONFIG)

export const fireDb = firebase.firestore()

export function getServerTimestampField () {
  return firebase.firestore.FieldValue.serverTimestamp()
};

export function getServerTimestamp () {
  return firebase.firestore.Timestamp.now();
};

export function timestampFromDate (date: Date): firebase.firestore.Timestamp {
  return firebase.firestore.Timestamp.fromDate(date)
};
