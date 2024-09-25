import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Your web app's Firebase configuration
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
const db = getFirestore(app);

const form = document.getElementById('f1');

form.addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const entrydate = document.getElementById('entryd').value;
    const entrytime = document.getElementById('entryt').value;
    const exitdate = document.getElementById('exitd').value;
    const exittime = document.getElementById('exitt').value;

    // Convert dates and times to Date objects
    const checkIn = new Date(`${entrydate}T${entrytime}`);
    const checkOut = new Date(`${exitdate}T${exittime}`);

    if (checkIn >= checkOut) {
        alert('Check-out time must be after check-in time.');
        return;
    }

    try {
        // Query Firestore for overlapping bookings
        const bookingsRef = collection(db, "conferencehall");
        const q = query(
            bookingsRef,
            where('checkIn', '<', checkOut), // Existing bookings that start before new check-out
            where('checkOut', '>', checkIn)  // Existing bookings that end after new check-in
        );

        const snapshot = await getDocs(q);

        // If there are overlapping bookings
        if (!snapshot.empty) {
            alert('The selected time is already booked by others.');
        } else {
            // No overlaps, store check-in and check-out in localStorage
            localStorage.setItem('entrydate', entrydate);
            localStorage.setItem('entrytime', entrytime);
            localStorage.setItem('exitdate', exitdate);
            localStorage.setItem('exittime', exittime);

            // Redirect after saving to localStorage
            window.location.href = "confform.html";
        }
    } catch (error) {
        console.error('Error checking booking:', error);
        alert('An error occurred while processing your booking.');
    }
});
