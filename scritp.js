// Firebase Config (Replace with your own)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function recordAction(action) {
    db.collection("attendance").add({
        action: action,
        time: new Date().toLocaleString()
    }).then(() => {
        displayRecords();
    }).catch(error => {
        console.error("Error adding document: ", error);
    });
}

function displayRecords() {
    const table = document.getElementById("recordTable");
    table.innerHTML = "";

    db.collection("attendance").orderBy("time", "desc").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let record = doc.data();
            let row = `<tr>
                <td>${doc.id}</td>
                <td>${record.action}</td>
                <td>${record.time}</td>
            </tr>`;
            table.innerHTML += row;
        });
    });
}

// Load records on page load
window.onload = displayRecords;
