let currentUser = firebase.auth().currentUser;

var db = firebase.database();

let currentMonth = moment().format('MMM');
let auth = firebase.auth();

// let forgotPasswordButton = document.getElementById('forgot-password');

// forgotPasswordButton.onclick(function() {
//     forgotPassword()
// })

function forgotPassword() {
    let userEmail = document.getElementById("email_field").value;
    auth.sendPasswordResetEmail(userEmail).then(function() {
        // Email sent.
        alert('password reset link has been sent to your email ' + userEmail)
    }).catch(function(error) {
        alert(error)
    });
}
checkLoginstatus();

function checkLoginstatus() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.

            if (user != null) {
                updateToken(user.uid);
            }
        } else {

        }
    });
}
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.

        if (user != null) {

            updateToken(user.uid)
        }
    } else {

    }
});

function login() {
    let userEmail = document.getElementById("email_field").value;
    let userPass = document.getElementById("password_field").value;
    
    
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
        .then(function() {
            window.location = "index.html"
        }).catch(function(error) {

            // Handle Errors here.
            let errorCode = error.code;
            let errorMessage = error.message;

            if (errorMessage == 'The email address is badly formatted.') {
                errorMessage = "Your email isn't formatted correctly";
            } else if (errorMessage == 'The password is invalid or the user does not have a password.') {
                errorMessage = 'Your password is incorrect. If you forgot it click "Forgot Password"';
            }
            $('#error_message').text(errorMessage);
            $('#login-Error-Modal').modal('show');
            //window.alert("Error : " + errorMessage);

        });
}

function updateToken(uid) {
    //checking available tokens
    firebase.database().ref('/users/' + uid).once('value').then(function(snapshot) {

        let tokens = 0;
        let lastupdated = null;
        if (snapshot.val().tokens) {
            tokens = (snapshot.val() && snapshot.val().tokens.available);
            lastupdated = (snapshot.val() && snapshot.val().tokens.lastupdated);
        }

        if (lastupdated != currentMonth) {
            if (tokens < 5) {
                let newToken = tokens;
                let postData = { available: newToken, lastupdated: currentMonth };
                let updates = {};
                updates['/users/' + uid + '/tokens/'] = postData;
                firebase.database().ref().update(updates);
            }
        } else {
            console.log('No changes made')
        }

    });

}