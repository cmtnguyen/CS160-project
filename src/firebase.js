// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const url = process.env.FIREBASE_URL; 

const createToken = async () => {
  const user = auth.currentUser;
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