import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

document.getElementById('registration').addEventListener('submit', submitForm);

async function submitForm(e) {
    e.preventDefault();
    const entrydate = getElementVal('entryd');
    const entrytime = getElementVal('entryt');
    const exitdate = getElementVal('exitd');
    const exittime = getElementVal('exitt');
    const departmentname = getElementVal('dept');
    const HOD = getElementVal('hod');
    const staffincharge = getElementVal('staff');
    const staffcontact = getElementVal('staffno');
    const studentincharge = getElementVal('stu');
    const studentid = getElementVal('stuid');
    const studentcontact = getElementVal('stuno');

    // Convert dates and times to Date objects
    const checkIn = new Date(`${entrydate}T${entrytime}`);
    const checkOut = new Date(`${exitdate}T${exittime}`);

    await saveMessages(checkIn,checkOut,departmentname, HOD, staffincharge, staffcontact, studentincharge, studentid, studentcontact);
}

const saveMessages = async (checkIn,checkOut,departmentname, HOD, staffincharge, staffcontact, studentincharge, studentid, studentcontact) => {
    try {
        await addDoc(collection(db, "galleria"), {
            checkIn:checkIn,
            checkOut:checkOut,
            department: departmentname,
            HOD: HOD,
            Staff: staffincharge,
            staffcontact: staffcontact,
            studentincharge: studentincharge,
            studentid: studentid,
            studentcontact: studentcontact,
        });
        console.log("Document successfully written!");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
