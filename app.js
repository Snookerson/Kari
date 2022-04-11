/* AUTH MODALS ==================================================== */

    const authLoginButtons = document.querySelectorAll(".authLoginButton");
    const authRegisterButtons = document.querySelectorAll(".authRegisterButton");
    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");
    const modalOverlay = document.getElementById("modalOverlay");

    const authLoginButton = document.querySelectorAll(".auth-button-login");
    const authRegisterButton = document.querySelectorAll(".auth-button-register");

    const forgotModal = document.getElementById("forgotModal");
    const forgotModalLink = document.querySelectorAll(".forgotModalLink");

    const authModalClose = document.querySelectorAll(".close-auth-modal");

    // This is an array so the dropdown buttons can still work as the main navbar buttons
    authLoginButtons.forEach(button => {
        // Open modal
        button.addEventListener("click", () => {
            openLoginModal(loginModal, modalOverlay);
        });
    });
        
    // This is an array so the dropdown buttons can still work as the main navbar buttons
    authRegisterButtons.forEach(button => {
        // Open modal
        button.addEventListener("click", () => {
            openRegisterModal(registerModal, modalOverlay);
        });
    });

    // Close modal
    modalOverlay.addEventListener("click", () => {
        closeAuthModal(loginModal, registerModal, modalOverlay);
    });

    authModalClose.forEach(button => {
    button.addEventListener("click", () => {
        closeAuthModal(loginModal, registerModal, modalOverlay);
        });
    });

    // Switch to another modal
    authLoginButton.forEach(button => {
        button.addEventListener("click", () => {
            closeAuthModal(loginModal, registerModal, modalOverlay);
            openLoginModal(loginModal, modalOverlay);
        });
    });

    authRegisterButton.forEach(button => {
        button.addEventListener("click", () => {
            closeAuthModal(loginModal, registerModal, modalOverlay);
            openRegisterModal(registerModal, modalOverlay);
        });
    });

    forgotModalLink.forEach(link => {
        link.addEventListener("click", ()  => {
            closeAuthModal(loginModal, registerModal, modalOverlay);
            openForgotModal(forgotModal, modalOverlay);
        })
    })

/* Modal funcions ---------------------------------- */

    function closeAuthModal(loginModal, registerModal, modalOverlay) {
        loginModal.classList.add("display-none");
        registerModal.classList.add("display-none");
        forgotModal.classList.add("display-none");
        modalOverlay.classList.add("display-none");
    };

    function openLoginModal(loginModal, modalOverlay) {
        loginModal.classList.remove("display-none");
        modalOverlay.classList.remove("display-none")
    };

    function openRegisterModal(registerModal, modalOverlay) {
        registerModal.classList.remove("display-none");
        modalOverlay.classList.remove("display-none")
    }

    function openForgotModal(forgotModal, modalOverlay) {
        forgotModal.classList.remove("display-none");
        modalOverlay.classList.remove("display-none")
    }





/* DROPDOWN LIST ===================================================== */
const hamburgeButton = document.getElementById("hamburgeButton");
const dropdownList = document.getElementById("dropdownList");
const dropdownOverlay = document.getElementById("dropdownOverlay");
const header = document.querySelector("header")

hamburgeButton.addEventListener("click", () => {

    // Open the dropdown
    dropdownList.classList.remove("display-none");      // Remove display-none (we needed it to hide it, another metohod didnt allow transitions or removed it from the flow)
    dropdownList.classList.add("active-dropdown");      // Make it visible
    header.classList.add("header-border-radius-fix");   // Make the header border seamless
    dropdownOverlay.classList.add("active-overlay");    // Add overlay for closing dropdown by clicking anywhere

    // Close dropdown by clicking anywhere
    dropdownOverlay.addEventListener("click", () => {
        dropdownList.classList.add("display-none");      // Remove display-none (we needed it to hide it, another metohod didnt allow transitions or removed it from the flow)
        dropdownList.classList.remove("active-dropdown");      // Make it visible
        header.classList.remove("header-border-radius-fix");   // Make the header border seamless
        dropdownOverlay.classList.remove("active-overlay");    // Add overlay for closing dropdown by clicking anywhere
    });


});



