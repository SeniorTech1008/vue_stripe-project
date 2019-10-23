function SendRef() {
    var db = firebase.database();
    const userEmail = document.getElementById("reference").value;
    const user = firebase.auth().currentUser;
    const userProfile = buildUserProfile();
    
    if (user) {
        $.post( "https://us-central1-wanderift-c9a53.cloudfunctions.net/invitationEmail", { email: userEmail } )
        .done(function(){
            alert('Invitation sent successfully');
            $('#referFriend').modal('hide')
        }).fail(function(){
            console.log('Invitation not sent successfully');
        });
        // const invitation = db.ref('/users/invite').once('value').then(function(){
        //     console.log('Invitation sent!');
        // });
        // db.ref('users/' + user.uid).set( userProfile );
        
        // invitation.on('value',function (snapshot) {
        //     console.log("In Value: ");
        //     console.log(snapshot);
        //     console.log('email sent successfully');
        //     // Close modal
        //     $('#referFriend').modal('hide')
        // });
        
        // .then(function(snapshot) {
        //     // Show success
            
        // }).catch(function(error) {

        //     // Handle Errors here.
    
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     alert(errorMessage);
        //     //window.location.href = "Payment.html";
    
        //     // ...
        // })
    }
}

function buildUserProfile() {
    var currentMonth = '';
    let userObject = {};
    userObject.firstname = null;
    userObject.lastname = null;
    userObject.dob = null;
    userObject.gender = null;
    userObject.subscriber_market = null;
    userObject.email = document.getElementById("reference").value;
    userObject.reference = null;
    userObject.joined_on = Date.now();
    userObject.tokens = { available: 0, lastupdated: null };

    return userObject
}

