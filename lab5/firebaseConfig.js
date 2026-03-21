// firebaseConfig.js — конфігурація Firebase для серверної частини
// Використовується як довідка. У server.js підключення відбувається
// через serviceAccountKey.json (Firebase Admin SDK).
//
// Ці дані — з вашого Firebase проєкту (вже використовуються на фронтенді).

const firebaseConfig = {
  apiKey:            "AIzaSyAMpU9waelzRJJx3KP8aS7wylJx4hoWpvE",
  authDomain:        "my-project-lab-4-af00c.firebaseapp.com",
  projectId:         "my-project-lab-4-af00c",
  storageBucket:     "my-project-lab-4-af00c.firebasestorage.app",
  messagingSenderId: "839830623411",
  appId:             "1:839830623411:web:7488cf55925d5a817b0cc6",
  measurementId:     "G-LCVBSK77GG",
};

export default firebaseConfig;
