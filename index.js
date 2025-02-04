document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const toggleBtn = document.getElementById("toggle-btn");
    const alertBox = document.getElementById("alert-box");
    
    toggleBtn.addEventListener("click", () => {
        if (registerForm.classList.contains("d-none")) {
            registerForm.classList.remove("d-none");
            loginForm.classList.add("d-none");
            toggleBtn.textContent = "Already registered? Login";
        } else {
            registerForm.classList.add("d-none");
            loginForm.classList.remove("d-none");
            toggleBtn.textContent = "Don't have an account? Register";
        }
    });
    
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fullName = document.getElementById("fullname").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (localStorage.getItem(email) !== null) {
            showAlert("Email is already registered!", "danger");
            return;
        }
        
        localStorage.setItem(email, JSON.stringify({ fullName, password }));
        showAlert("Registration successful! Please log in.", "success");
        registerForm.reset();
    });
    
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        
        const user = JSON.parse(localStorage.getItem(email));
        if (user && user.password === password) {
            showAlert("Login successful!", "success");
        } else {
            showAlert("Invalid email or password!", "danger");
        }
        loginForm.reset();
    });
    
    function showAlert(message, type) {
        alertBox.innerHTML = `<div class="alert alert-${type}" role="alert">${message}</div>`;
        setTimeout(() => alertBox.innerHTML = "", 3000);
    }
});