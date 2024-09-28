import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAS48lfbuczHDMHdcH8LFeA7toFPU1S3-A",
    authDomain: "eventspace-02.firebaseapp.com",
    databaseURL: "https://eventspace-02-default-rtdb.firebaseio.com",
    projectId: "eventspace-02",
    storageBucket: "eventspace-02.appspot.com",
    messagingSenderId: "629353359488",
    appId: "1:629353359488:web:43d20fd3659f60bb691e65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sign in function
const signInBtn = document.getElementById('btn');
signInBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.querySelector('input[type="email"]').value.trim();
    const password = document.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign-in successful
            const user = userCredential.user;
            console.log('User signed in:', user);
            window.location.href = 'booking.html';
        })
        .catch((error) => {
            // Handle Errors here.
            console.error('Error signing in:', error);
            alert(`Sign-in failed: ${error.message}`); // Provide feedback to user
        });
});
