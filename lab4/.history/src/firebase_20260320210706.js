import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMpU9waelzRJJx3KP8aS7wylJx4hoWpvE",
  authDomain: "my-project-lab-4-af00c.firebaseapp.com",
  projectId: "my-project-lab-4-af00c",
  storageBucket: "my-project-lab-4-af00c.firebasestorage.app",
  messagingSenderId: "839830623411",
  appId: "1:839830623411:web:7488cf55925d5a817b0cc6",
  measurementId: "G-LCVBSK77GG"
};

const app = initializeApp(firebaseConfig);

// ── Auth
export const auth = {
  onAuthStateChanged: (callback) =>
    onAuthStateChanged(getAuth(app), callback),

  createUserWithEmailAndPassword: (email, password) =>
    createUserWithEmailAndPassword(getAuth(app), email, password),

  signInWithEmailAndPassword: (email, password) =>
    signInWithEmailAndPassword(getAuth(app), email, password),

  signOut: () =>
    signOut(getAuth(app)),
};

// ── Firestore
export const db = {
  getCollection: async (collectionName) => {
    const snap = await getDocs(collection(getFirestore(app), collectionName));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  },

  addDocument: async (collectionName, data) => {
    const ref = await addDoc(collection(getFirestore(app), collectionName), data);
    return { id: ref.id, ...data };
  },
};