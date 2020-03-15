import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyDFHj_OpSfe4ES-7IYCyMJwTu69E028tRI",
    authDomain: "greentree-1a2c0.firebaseapp.com",
    databaseURL: "https://greentree-1a2c0.firebaseio.com",
    projectId: "greentree-1a2c0",
    storageBucket: "greenus tree-1a2c0.appspot.com",
    messagingSenderId: "145681952564",
    appId: "1:145681952564:web:aaabf07c7dadccd9c93f61",
    measurementId: "G-DLH7KZW5MB"
  };

  const FIREBASE = firebase.initializeApp(firebaseConfig);
  export default FIREBASE;


