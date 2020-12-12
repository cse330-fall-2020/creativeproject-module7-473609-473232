import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBI3L5Yf8l5khsVzvo_xtPja_isEwMSJME",
  authDomain: "creative-project-ac267.firebaseapp.com",
  databaseURL: "https://creative-project-ac267-default-rtdb.firebaseio.com",
  projectId: "creative-project-ac267",
  storageBucket: "creative-project-ac267.appspot.com",
  messagingSenderId: "555203400107",
  appId: "1:555203400107:web:c7be4d42e88f3ac48e42ee",
  measurementId: "G-S3SSD9PRW4"
};
var fire = firebase.initializeApp(config);
export default fire;