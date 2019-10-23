var db = firebase.database();

function makeRandomString() {
    let result = "";
    let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 10; i++) {
        result += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return result;
}

function signup() {

    let userEmail = document.getElementById("email").value;
    let company = document.getElementById("company").value;
    let userPass = document.getElementById("password").value;

    let userProfile = buildUserProfile();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function(auth) {

        db.ref('users/' + auth.user.uid).set(userProfile);
        document.getElementById("email_field").value = '';
        document.getElementById("password_field").value = '';
        window.location = "account-corporate-subscription.html";

        // ...
    }).catch(function(error) {

        // Handle Errors here.

        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
        //window.location.href = "Payment.html";

        // ...
    });


}


function getStarted() {

    let userEmail = document.getElementById("input1").value;
    let company = document.getElementById("input2").value;
    let userPass = document.getElementById("input3").value;

    let userProfile = buildUserProfile();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).then(function(auth) {

        db.ref('users/' + auth.user.uid).set(userProfile);
        document.getElementById("email_field").value = '';
        document.getElementById("password_field").value = '';
        window.location = "account-corporate-subscription.html";

        // ...
    }).catch(function(error) {

        // Handle Errors here.

        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
        //window.location.href = "Payment.html";

        // ...
    });


}

function buildUserProfile() {
    var currentMonth = moment().format('MMM');
    let userObject = {};
    userObject.firstname = null;
    userObject.lastname = null;
    userObject.dob = null;
    userObject.gender = null;
    userObject.subscriber_market = null;
    userObject.email = document.getElementById("email").value;
    userObject.reference = null;
    userObject.joined_on = Date.now();
    userObject.tokens = { available: null, lastupdated: null };

    return userObject
}


// function buildUserProfile() {
//     var currentMonth = moment().format('MMM');
//     let userObject = {};
//     userObject.firstname = document.getElementById('first-name').value;
//     userObject.lastname = document.getElementById('last-name').value;
//     userObject.dob = document.getElementById('dob').value;
//     userObject.gender = document.getElementById('gender').value;
//     userObject.subscriber_market = document.getElementById('sub-market').value;
//     // userObject.tsa_number = document.getElementById('tsa-number').value;
//     userObject.email = document.getElementById('email').value;
//     userObject.reference = document.getElementById('reference').value;
//     userObject.joined_on = Date.now();
//     userObject.tokens = { available: 0, lastupdated: currentMonth };

//     return userObject
// }