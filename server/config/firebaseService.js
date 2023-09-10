// Import the functions you need from the SDKs you need
const {initializeApp } = require('firebase/app');
const {getAnalytics} = require('firebase/analytics');
const {getStorage} = require('firebase/storage');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXN3_fH5KR-iSWP7t5LY7xDX87V6SzK3M",
  authDomain: "projectpi-fa7b4.firebaseapp.com",
  projectId: "projectpi-fa7b4",
  storageBucket: "projectpi-fa7b4.appspot.com",
  messagingSenderId: "1010278952504",
  appId: "1:1010278952504:web:6cca4d921dee70794080cd",
  measurementId: "G-3NR5PG2WKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const storageForFirebase = getStorage(app);

module.exports = {app ,storageForFirebase};