// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw2zaZjgnVzfZpXN3_QU-B5cA7d4-4e6Y",
  authDomain: "a3-profile-app-235f1.firebaseapp.com",
  databaseURL: "https://a3-profile-app-235f1-default-rtdb.firebaseio.com",
  projectId: "a3-profile-app-235f1",
  storageBucket: "a3-profile-app-235f1.appspot.com",
  messagingSenderId: "625571616876",
  appId: "1:625571616876:web:d5d63b41b01af5d6ee2049",
  measurementId: "G-TRBCF6CBN3"
};



const app = initializeApp(firebaseConfig);
const anal = getAnalytics(app);
const auth = getAuth(app);

const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#authForm");
const secretContent = document.querySelector("#secretContent");
const signUpButton = document.querySelector("#signUpButton");
const signInButton = document.querySelector("#signInButton");
const signOutButton = document.querySelector("#signOutButton");

secretContent.style.display = 'none';



const userSignUp = async() => {
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;
    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Your account has been created!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

const userSignIn = async() => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            alert("You have signed in successfully!");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + errorMessage)
        })
}

const checkAuthState = async() => {
    onAuthStateChanged(auth, user => {
        if(user) {
            authForm.style.display = 'none';
            secretContent.style.display = 'block';
        }
        else {
            authForm.style.display = 'block';
            secretContent.style.display = 'none';
        }
    })
}

const userSignOut = async() => {
    await signOut(auth);
}

checkAuthState();

signUpButton.addEventListener('click', userSignUp);
signInButton.addEventListener('click', userSignIn);
signOutButton.addEventListener('click', userSignOut);
