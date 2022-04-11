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
        console.log("User logged out!");
        changeUI();
    }
});






/* Declair error handling variables */
const authInputFields = document.querySelectorAll(".auth-input");
const emailInput = document.getElementById("loginEmail");
const invalidAuthPrompts = document.querySelectorAll(".invalid-auth");


/* Register User ----------------------------------- */
const registerForm = document.getElementById("registerForm");

const registerUserNameInput = document.getElementById("registerUserName");


registerUserNameInput.addEventListener("input", () => {
    registerUserNameInput.classList.remove("error-auth-input");
    if (registerUserNameInput.value.length > 0 && registerUserNameInput.value.length < 3) {
        registerUserNameInput.classList.add("error-auth-input");
    } else {
        null;
    }
 });




registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page realoading

    // get user info
    const email = document.getElementById("registerEmail").value;

    const pw = document.getElementById("registerPassword").value;
    const pwAgain = document.getElementById("registerPasswordAgain").value;
    const pwAgainInput = document.getElementById("registerPasswordAgain");

    const passwordNotMatching = document.getElementById("passwordNotMatching");
    const passwordIsWeak = document.getElementById("passwordIsWeak");
    const emailInUse = document.getElementById("emailInUse");

    const registerUserName = document.getElementById("registerUserName").value;
    
    if(pw === pwAgain) {
        // Try to register the user
        auth.createUserWithEmailAndPassword(email, pw)
            // Succesful registration
            .then(credential => {
                console.log(credential.user.email + " is registered");
                closeAuthModal(loginModal, registerModal, modalOverlay);

                // Add display name to profile
                    const user = firebase.auth().currentUser;
                    user.updateProfile(
                        {
                        displayName: registerUserName
                        }
                    ).then(() => {
                        console.log(user.displayName)
                    }).catch((error) => {
                        console.log("display name update unsuccessful")
                    });  
                
                registerForm.reset();
            
            })
            // Error during registration
            .catch(error => {
                invalidAuthPrompts.forEach(prompt => prompt.classList.add("display-none"));                 // Hide all error messages before presenting new ones
                authInputFields.forEach(inputField => inputField.classList.remove("error-auth-input"));     // Hide all error input highlights before presenting new ones
                switch(error.code) {
                    case "auth/weak-password":
                        passwordIsWeak.classList.remove("display-none");
                        break;
                    case "auth/email-already-in-use":
                        emailInUse.classList.remove("display-none");
                        break;
                }   

                console.log(error.code);
            });

    } else {  // If the choosen pw and the confirmation pw do not match
        invalidAuthPrompts.forEach(prompt => prompt.classList.add("display-none"));     // Hide all error messages before presenting new ones
        passwordNotMatching.classList.remove("display-none");
        authInputFields.forEach(inputField => inputField.classList.remove("error-auth-input"));
        pwAgainInput.classList.add("error-auth-input");
    }
});



/* Logout User --------------------------------------*/
// Declair logout variables
const logoutButton = document.querySelectorAll(".authLogoutButton");


    logoutButton.forEach(button => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // prevent page realoading
    
            auth.signOut();
            window.location.replace("index.html");
            });
    })



/* Login  User------------------------------------------*/
// Declair login variables
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent page realoading

    // Declair login variables
    const email = document.getElementById("loginEmail").value;

    const pw = document.getElementById("loginPassword").value;
    const pwInput = document.getElementById("loginPassword");

    const wrongPassword = document.getElementById("wrongPassword");
    const noUserLikeThis = document.getElementById("noUserLikeThis");
    const unVerified = document.getElementById("unVerified");
    const tooManyRequests = document.getElementById("tooManyRequests")

    auth.signInWithEmailAndPassword(email, pw)
        // Succesful sign in
        .then(credential => {
            /* console.log(credential.user.email + " signed in") */
            loginForm.reset();
            closeAuthModal(loginModal, registerModal, modalOverlay);
        })
        // Unsuccessful sign in
        .catch(error => {
            invalidAuthPrompts.forEach(prompt => prompt.classList.add("display-none"));                 // Hide all error messages before presenting new ones
            authInputFields.forEach(inputField => inputField.classList.remove("error-auth-input"));     // Hide all error input highlights before presenting new ones
            console.log(error.code)
            switch(error.code) {
                case "auth/wrong-password":
                    wrongPassword.classList.remove("display-none");
                    pwInput.classList.add("error-auth-input");
                    break;
                case "auth/user-not-found":
                    noUserLikeThis.classList.remove("display-none");
                    emailInput.classList.add("error-auth-input");
                    break;
                case "auth/unverified-email":
                    unVerified.classList.remove("display-none");
                    emailInput.classList.add("error-auth-input");
                    break;
                case "auth/too-many-requests":
                    case "auth/too-many-requests":
                    tooManyRequests.classList.remove("display-none");
                    break;
                };
        });
});




/* Change UI based on sign in or not -------------------------------------*/
const loggedIn = document.querySelectorAll(".logged-in");
const loggedOut = document.querySelectorAll(".logged-out");
const profileButton = document.getElementById("profileButton");
const bannerMainButton = document.getElementById("bannerMainButton");
const bannerMainButtonHref = document.getElementById("bannerMainButtonHref");

function changeUI(user) {
    // When the user is logged in
    if(user) { 
        loggedIn.forEach(item => item.classList.remove("display-none"));
        loggedOut.forEach(item => item.classList.add("display-none"));
        user.displayName === null ?  null : profileButton.innerText = `${user.displayName} profilja`;  // Change the profile button's text
        
        if (window.location.pathname === "/public/index.html") {
            bannerMainButton.innerText = "Kezdjük!"
            bannerMainButtonHref.setAttribute("href", "#familymenu.html");
        } else {
            null;
        }
        
        

    // When the user is logged out
    } else {
        loggedOut.forEach(item => item.classList.remove("display-none"));
        loggedIn.forEach(item => item.classList.add("display-none"));
        
    };
};
