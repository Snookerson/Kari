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

        } else {
             null;
        };
        

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

/* Page turns ============================================================== */
/* // Declair logout variables

// All input fields -------------- 
const inputContainers = document.querySelectorAll(".input-container");
const newDBNav = document.querySelectorAll(".new-db-menu-element");
    // Name
    const newDBName = inputContainers[0];   
        // Buttons        
        const newDBNextButtonName = document.getElementById("newDBNextButtonName");
        // Navigation
        const navName = newDBNav[0];

    // Members     
    const newDBMembers = inputContainers[1];   
        // Buttons  
        const newDBNextButtonMembers = document.getElementById("newDBNextButtonMembers");
        const newDBPrevButtonMembers = document.getElementById("newDBPrevButtonMembers");
        // Navigation
        const navMembers = newDBNav[1];
        
    // Discription
    const newDatabaseDiscription = inputContainers[2];
        // Buttons
        const newDBNextButtonDiscription = document.getElementById("newDBNextButtonDiscription");
        const newDBPrevButtonDiscription = document.getElementById("newDBPrevButtonDiscription");
        // Navigation
        const navDiscription = newDBNav[2];


    // Spending
    const newDiscriptionSpending = inputContainers[3];  
        // Buttons
        const newDBSubmitButton = document.getElementById("newDBSubmitButton");
        const newDBPrevButtonSpending = document.getElementById("newDBPrevButtonSpend");
        // Navigation
        const navSpending = newDBNav[3];


// Change layout ---------------


// Name --> Members
newDBNextButtonName.addEventListener("click", () => {
    newDBName.classList.add("display-none");
    newDBMembers.classList.remove("display-none");

    // Change navigation
    navName.classList.remove("active-new-db-menu");
    navMembers.classList.add("active-new-db-menu");
});
    


// Members --> Discription || Members --> Name
newDBNextButtonMembers.addEventListener("click", () => {
    newDBMembers.classList.add("display-none");
    newDatabaseDiscription.classList.remove("display-none");

    // Change navigation
    navMembers.classList.remove("active-new-db-menu");
    navDiscription.classList.add("active-new-db-menu");
});

newDBPrevButtonMembers.addEventListener("click", () => {
    newDBMembers.classList.add("display-none");
    newDBName.classList.remove("display-none");

    // Change navigation
    navMembers.classList.remove("active-new-db-menu");
    navName.classList.add("active-new-db-menu");
});



// Discription --> Spending || Discription --> Members
newDBNextButtonDiscription.addEventListener("click", () => {
    newDatabaseDiscription.classList.add("display-none");
    newDiscriptionSpending.classList.remove("display-none");

    // Change navigation
    navDiscription.classList.remove("active-new-db-menu");
    navSpending.classList.add("active-new-db-menu");
});

newDBPrevButtonDiscription.addEventListener("click", () => {
    newDatabaseDiscription.classList.add("display-none");
    newDBMembers.classList.remove("display-none");

    // Change navigation
    navDiscription.classList.remove("active-new-db-menu");
    navMembers.classList.add("active-new-db-menu");
});

// Spending --> End || Spending --> Discription

newDBPrevButtonSpending.addEventListener("click", () => {
    newDiscriptionSpending.classList.add("display-none");
    newDatabaseDiscription.classList.remove("display-none");

    // Change navigation
    navSpending.classList.remove("active-new-db-menu");
    navDiscription.classList.add("active-new-db-menu");
});

 */

// UI elements - Array 
const inputContainers = document.querySelectorAll(".input-container");
const newDBNav = document.querySelectorAll(".new-db-menu-element");

// Buttons - Array
const newDBnextButtons = document.querySelectorAll(".newDbNextButton");
const newDbPrevButton = document.querySelectorAll(".newDbPrevButton");

let pageCounter = 0;
let navCounter = 0;

newDBnextButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Layout
        inputContainers[pageCounter].classList.add("display-none");
        pageCounter++;
        inputContainers[pageCounter].classList.remove("display-none");

        // Navigation
        newDBNav[navCounter].classList.remove("active-new-db-menu");
        navCounter++;
        newDBNav[navCounter].classList.add("active-new-db-menu");
    });
});


newDbPrevButton.forEach(button => {
    button.addEventListener("click", () => {
        // layout
        inputContainers[pageCounter].classList.add("display-none");
        pageCounter--;
        inputContainers[pageCounter].classList.remove("display-none");

        // Navigation
        newDBNav[navCounter].classList.remove("active-new-db-menu");
        navCounter--;
        newDBNav[navCounter].classList.add("active-new-db-menu");
    });
});