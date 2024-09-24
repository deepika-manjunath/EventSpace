const firebaseConfig = {
    apiKey: "AIzaSyDLaVHy4Xjfhn8XVtqklgoXyqCKJatjA5Y",
    authDomain: "eventspace-001.firebaseapp.com",
    databaseURL: "https://eventspace-001-default-rtdb.firebaseio.com",
    projectId: "eventspace-001",
    storageBucket: "eventspace-001.appspot.com",
    messagingSenderId: "283581802144",
    appId: "1:283581802144:web:53f3c87f3df96d1f7c0bc5"
  };

 firebase.initializeApp(firebaseConfig);
 var eventspaceDB = firebase.database().ref('eventspace');

  document.getElementById('registration').addEventListener('submit', submitForm);

  function submitForm(e){
    e.preventDefault();

    var departmentname = getElementVal('dept');
    var HOD = getElementVal('hod');
    var staffincharge = getElementVal('staff');
    var staffcontact = getElementVal('staffno');
    var studentincharge = getElementVal('stu');
    var studentid = getElementVal('stuid');
    var studentcontact = getElementVal('stuno');

    console.log(departmentname,HOD,staffincharge,staffcontact,studentincharge,studentid,staffcontact);
  }

  const getElementVal = (id) => {
    return document.getElementById(id).value;
  }
