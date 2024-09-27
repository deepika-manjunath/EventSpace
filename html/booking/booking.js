import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, getDocs, collection,addDoc, query, where, Timestamp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";


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
const auth = getAuth(app);

// Function to fetch data based on collection name
async function fetchData(collectionName) {
    const contentDisplay = document.getElementById("contentDisplay");
    contentDisplay.innerHTML = ""; // Clear previous content

    // Get today's date and the date 7 days from now
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);

    // Convert to Firestore Timestamps
    const todayTimestamp = Timestamp.fromDate(today);
    const nextWeekTimestamp = Timestamp.fromDate(nextWeek);

    try {
        // Create a query to fetch documents with checkIn date in the next 7 days
        const q = query(
            collection(db, collectionName),
            where("checkIn", ">=", todayTimestamp),
            where("checkIn", "<=", nextWeekTimestamp)
        );

        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            contentDisplay.textContent = "No bookings available for the next 7 days.";
            return;
        }

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const docId = doc.id; // Get the document ID

            // Convert Firestore timestamps to JavaScript Date objects
            const checkIn = data.checkIn ? data.checkIn.toDate() : null;
            const checkOut = data.checkOut ? data.checkOut.toDate() : null;
            const event = data.event || "N/A";
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
                <strong>Department Name: </strong> ${departmentName} <br>
                <strong>Event Details: </strong> ${event} <br>
                <strong>Check In: </strong> ${checkInString} <br>
                <strong>Check Out: </strong> ${checkOutString} <br>
                <strong>Student ID: </strong> ${studentId} <br>
                <strong>Student Name: </strong> ${studentName} <br>
                <strong>Student Contact: </strong> ${studentContact} <br>
                <button id="reject-${docId}" class="reject">Reject</button>
                <button id="accept-${docId}" class="accept">Accept</button>
                <hr>
            `;
            contentDisplay.appendChild(div);
            
            // Use unique IDs to add event listeners
            document.getElementById(`accept-${docId}`).addEventListener('click', function() {
                acceptBooking(event, studentName,checkInString,checkOutString);
                this.disabled = true;
                this.classList.remove('clickable');
                document.getElementById(`reject-${docId}`).disabled = true;
            });
            document.getElementById(`reject-${docId}`).addEventListener('click', function() {
                rejectBooking(event, studentName,checkInString,checkOutString);
                this.disabled = true;
                this.classList.remove('clickable');
                document.getElementById(`accept-${docId}`).disabled = true;
            });
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

async function acceptBooking(event, studentName,checkInString,checkOutString) {
    console.log('Accepting booking for event:', event, 'and student:', studentName); // Debugging line
    try {
        const docRef = await addDoc(collection(db, 'acceptedBookings'), {
            event: event,
            studentincharge: studentName,
            checkIn:checkInString,
            checkOut:checkOutString,
            status: 'accepted',
        });
        console.log('Document written with ID: ', docRef.id); // Confirm successful write
        alert('Booking request accepted');
    } catch (error) {
        console.error('Error accepting booking: ', error);
        alert('Failed to accept booking. Please try again.');
    }
}

async function rejectBooking(event, studentName,checkInString,checkOutString) {
    console.log('Accepting booking for event:', event, 'and student:', studentName); // Debugging line
    try {
        const docRef = await addDoc(collection(db, 'rejectedBookings'), {
            event: event,
            studentincharge: studentName,
            checkIn:checkInString,
            checkOut:checkOutString,
            status: 'rejected',
        });
        console.log('Document written with ID: ', docRef.id); // Confirm successful write
        alert('Booking request rejected');
    } catch (error) {
        console.error('Error rejecting booking: ', error);
        alert('Failed to reject booking. Please try again.');
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        console.log("User signed out successfully.");
        window.location.href = "login.html"; 
    } catch (error) {
        console.error("Error signing out: ", error);
        alert("Error signing out. Please try again.");
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logout").addEventListener("click", handleLogout);
});
