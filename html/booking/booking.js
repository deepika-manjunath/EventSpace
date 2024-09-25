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
            const checkIn = data.checkIn ? data.checkIn.toDate() : null;
            const checkOut = data.checkOut ? data.checkOut.toDate() : null;
            const departmentName = data.department || "N/A";
            const studentId = data.studentid || "N/A";
            const studentName = data.studentincharge || "N/A";
            const studentContact = data.studentcontact || "N/A";

            // Format dates to a standard readable format
            const formatDate = (date) => {
                if (!date) return "N/A";
                return date.toLocaleString(); // Default format
            };

            const checkInString = formatDate(checkIn);
            const checkOutString = formatDate(checkOut);

            const div = document.createElement("div");
            div.innerHTML = `
                <strong>Department Name : </strong> ${departmentName} <br>
                <strong>Check In : </strong> ${checkInString} <br>
                <strong>Check Out : </strong> ${checkOutString} <br>
                <strong>Student ID : </strong> ${studentId} <br>
                <strong>Student Name : </strong> ${studentName} <br>
                <strong>Student Contact : </strong> ${studentContact} <br>
                <hr>
            `;
            contentDisplay.appendChild(div);
        });
    } catch (error) {
        console.error("Error fetching data: ", error);
        contentDisplay.textContent = "Error loading content.";
    }
}
// Event listeners for buttons
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("auditoriumButton").addEventListener("click", () => fetchData("auditorium"));
    document.getElementById("seminarHallButton").addEventListener("click", () => fetchData("seminarhall"));
    document.getElementById("galleriaButton").addEventListener("click", () => fetchData("galleria"));
    document.getElementById("conferenceHallButton").addEventListener("click", () => fetchData("conferencehall"));
});
