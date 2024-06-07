var Email = document.getElementById("EmailInput");
var Password = document.getElementById("PasswordInput");
var btnLogin = document.getElementById("btnLogin");
var EmailAlert = document.getElementById("EmailAlert");
var PasswordAlert = document.getElementById("PasswordAlert");
var Name = document.getElementById('NameInput');
var DataArr = JSON.parse(localStorage.getItem('userInfos')) ?? [];

// Function to check if fields are empty
function isEmpty() {
    if (Name && (Name.value == "" || Email.value == "" || Password.value == "")) {
        return false;
    } else {
        return true;
    }
}

// Function to check if email already exists
function isEmailExist() {
    for (var i = 0; i < DataArr.length; i++) {
        if (DataArr[i].Email === Email.value) {
            alert("Email already exists");
            return true;
        }
    }
    return false;
}

// Function to sign up
function signUp() {
    var Info = {
        Name: Name.value,
        Email: Email.value,
        Password: Password.value,
    }
    if (!isEmailExist()) {
        DataArr.push(Info);
        localStorage.setItem('userInfos', JSON.stringify(DataArr));
        clearInput();
        onDataChange();
        alert("Sign up successful");
        window.location.href = "index.html"; 
    }
}

// Function to log in
function login(event) {
    event.preventDefault(); 

    var checkData = {
        email: Email.value,
        password: Password.value
    };

    for (var i = 0; i < DataArr.length; i++) {
        if (DataArr[i].Email === checkData.email && DataArr[i].Password === checkData.password) {
            console.log("Login successful");
            window.location.href = "home.html";
            return;
        }
    }
}

// Check input fields before submitting
document.getElementById("btnLogin").addEventListener('click', function (e) {
    if (!IsValid() || !isEmpty() || isEmailExist()) {
        e.preventDefault();
        alert("All fields are required or email already exists");
    } else {
        signUp();
    }
});

// Function to clear input fields
function clearInput() {
    if (Name) Name.value = "";
    Email.value = "";
    Password.value = "";
    Email.classList.remove("is-valid");
    Email.classList.remove("is-invalid");
    Password.classList.remove("is-valid");
    Password.classList.remove("is-invalid");
}

// Update data in local storage
function onDataChange() {
    localStorage.setItem('userInfos', JSON.stringify(DataArr));
}

// Check email and password validity
function IsValid() {
    var emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    return emailRegex.test(Email.value) && passwordRegex.test(Password.value);
}

function validateEmail() {
    var emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (emailRegex.test(Email.value)) {
        EmailAlert.classList.add("d-none");
        Email.classList.add("is-valid");
        Email.classList.remove("is-invalid");
    } else {
        Email.classList.add("is-invalid");
        Email.classList.remove("is-valid");
        EmailAlert.classList.remove("d-none");
    }
}

function validatePassword() {
    var passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (passwordRegex.test(Password.value)) {
        PasswordAlert.classList.add("d-none");
        Password.classList.add("is-valid");
        Password.classList.remove("is-invalid");
    } else {
        Password.classList.add("is-invalid");
        Password.classList.remove("is-valid");
        PasswordAlert.classList.remove("d-none");
    }
}

document.getElementById('EmailInput').addEventListener('input', validateEmail);
document.getElementById('PasswordInput').addEventListener('input', validatePassword);

// Add event listener for login
btnLogin.addEventListener('click', login);