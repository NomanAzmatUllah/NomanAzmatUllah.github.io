const txtLoginEmail = document.getElementById('loginEmail');
const txtLoginPassword = document.getElementById('loginPass');

const txtCreateName = document.getElementById('createName');
const txtCreateEmail = document.getElementById('createEmail');
const txtCreatePassword = document.getElementById('createPass');

// const database = firebase.database().ref();

// let createAcc = document.getElementById("createAcc");
// let loginAcc = document.getElementById("loginAcc");

// const auth = firebase.auth();
// const firebaseDb = firebase.database();

function createAccount() {
    
    const name = txtCreateName.value;
    const email = txtCreateEmail.value;
    const pass = txtCreatePassword.value;
    const auth = firebase.auth();
    //signup
    let regEmail = /^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-z0-9-]+(\.[a-z0-9]+)*(\.[a-z]{2,})$/;
    if (regEmail.exec(email)) {
        if (pass.length < 6) {
            alert("Enter at least 6 characters");
        }
        else if (pass.search(/[0-9]/) === -1) {
            alert("Enter at least 1 number");
        }

        // else if (pass.search(/[A-Z]/) === -1) {
        //     alert("Enter 1 capital letter");
        // }
        else {

            const promise = auth.createUserWithEmailAndPassword(email, pass);
            promise.then(result => {
                var uid = database.child("users").push().key;
                var obj = {
                    email: email,
                    id: uid,
                    name: name,
                    pass: pass
                }
                database.child("/users/" + uid).set(obj);
            });
            promise.then(f => {
                window.location.href = "login.html";
            });
            promise.catch(e => {
                console.log(e.message);
            });
        }
    }
    else {
        console.log("Invalid Email");
    }

}

//Login Validation

function loginAccount() {
    const logemail = txtLoginEmail.value;
    const logpass = txtLoginPassword.value;
    const logauth = firebase.auth();
    const logpromise = logauth.signInWithEmailAndPassword(logemail, logpass);
    logpromise.then(e => {
        window.location.href = "home.html";
        // localStorage.setItem("pollemail",logemail);
    })
    logpromise.catch(e => {
        console.log(e.message);
        alert(e.message);
    });
}