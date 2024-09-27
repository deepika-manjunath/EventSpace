import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Step 2: Initialize Firebase
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

// Function to fetch data based on collection name
async function fetchData(collectionName) {
    const contentDisplay = document.getElementById("contentDisplay");
    contentDisplay.innerHTML = ""; // Clear previous content

    try {
        const querySnapshot = await getDocs(collection(db, collectionName));
        if (querySnapshot.empty) {
            contentDisplay.textContent = "No content available.";
            return;
        }

        querySnapshot.forEach(doc => {
            const data = doc.data();

            // Convert Firestore timestamps to JavaScript Date objects
            const checkIn = data.checkIn;
            const checkOut = data.checkOut ;
            const event = data.event || "N/A";
            const studentName = data.studentincharge || "N/A";
            const status = data.status || "N/A";


            const div = document.createElement("div");
            div.innerHTML = `
                <strong>Event Details:</strong> ${event} <br>
                <strong>Check In:</strong> ${checkIn} <br>
                <strong>Check Out:</strong> ${checkOut} <br>
                <strong>Student In Charge:</strong> ${studentName} <br>
                <strong>Status:</strong> ${status} <br>
                <hr />  <!-- Added a separator for better readability -->
            `;
            contentDisplay.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        contentDisplay.textContent = "Error loading content. Please try again later.";
    }
}

// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("accept").addEventListener("click", () => fetchData("acceptedBookings"));
    document.getElementById("reject").addEventListener("click", () => fetchData("rejectedBookings"));
});
