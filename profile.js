/* AUTH ====================================================================== */

const firebaseConfig = {
    apiKey: "AIzaSyB3W8_sT2O-F9l76NH3ZfXWqXjgwHjR7JE",
    authDomain: "kari-f74bb.firebaseapp.com",
    projectId: "kari-f74bb",
    storageBucket: "kari-f74bb.appspot.com",
    messagingSenderId: "1046793098807",
    appId: "1:1046793098807:web:df6102b6d7135abb2091b2",
    measurementId: "G-4JYFB8LH21"
};

// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const analytics = firebase.analytics();
    const auth = firebase.auth();
    const db = firebase.firestore();

/* Listen to auth status changes ---------------*/
auth.onAuthStateChanged(user => {
    if(user) {
        console.log(`This user is logged in ${user.email}!`);
        console.log(user)
        changeUI(user);
    } else {
        window.location = "index.html"; // hide non accesable pages if not signed in
        console.log("User logged out!");
        changeUI();
    }
});




/* Change UI based on sign in or not -------------------------------------*/
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const profileButton = document.getElementById("profileButton");

const profileTitle = document.getElementById("profileTitle");
const userDisplayName = document.getElementById("userDisplayName");
const userEmail = document.getElementById("userEmail");
const userRegisteredTime = document.getElementById("userRegisteredTime");
const userLastSignIn = document.getElementById("userLastSignIn");


function changeUI(user) {
    // When the user is logged in
    if(user) { 
        // Display Name settings
        if (user.displayName !== null) {
            profileButton.innerText = `${user.displayName} profilja`;
            profileTitle.innerText = `Szia ${user.displayName}! Ez a te profilod`;
            userDisplayName.innerText = user.displayName;
        } else {
             null;
        };
        // Email settings
        userEmail.innerText = user.email;
        // Registered Time
        userRegisteredTime.innerText = user.metadata.creationTime;
        // Last sign in time
        userLastSignIn.innerText = user.metadata.lastSignInTime;
        

    // When the user is logged out
    } else {
        
    };
};

/* Logout --------------------------------------*/
// Declair logout variables
const logoutButton = document.querySelectorAll(".authLogoutButton");


    logoutButton.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // prevent page realoading
    
            auth.signOut();
            window.location.replace("index.html");
            });
    })