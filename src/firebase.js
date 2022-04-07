// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
// import { getAnalytics } from "firebase/analytics";
import axios from 'axios';

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbAKy7GUQPr5KMcmaBjbElXFoy0LXDZsc",
    authDomain: "car-eservation.firebaseapp.com",
    projectId: "car-eservation",
    storageBucket: "car-eservation.appspot.com",
    messagingSenderId: "494168999521",
    appId: "1:494168999521:web:618493f47d4ce93e62cc20",
    measurementId: "G-Q1NT69S8PK"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const fire = firebase
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);
const url = 'http://localhost:5000/api/users'; //fix url to .env


// const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

const createToken = async () => {
    const user = fire.auth().currentUser;
    const token = user && (await user.getIdToken());  
    
    const payloadHeader = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    return payloadHeader;
  }

const addToUserDB = async (uid, name, email, isEmployee) => {
    const header = await createToken();
    const payload = {
      uid,
      name,
      email,
      isEmployee,
    }
    try {
        console.log("about to send request")
        const res = await axios.post(url, payload, header);
        console.log("post request was sent")
        return res.data;
    }

    catch (e) {
        console.error(e);
    }
    
  };

//google auth
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        addToUserDB(user.uid, user.displayName, user.email, "false")
        // const q = query(collection(db, "users"), where("uid", "==", user.uid));
        // const docs = await getDocs(q);
        // if (docs.docs.length === 0) {
        //     await addDoc(collection(db, "users"), {
        //         uid: user.uid,
        //         name: user.displayName,
        //         authProvider: "google",
        //         email: user.email,
        //         isEmployee: "false"
        //     });
        // }



    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {
    auth,
    db,
    signInWithGoogle,
    logout
};