function addEmp() {
    var db = firebase.database();

    let i;
    for (i = 0; i<3; i++) {
        let userEmail = document.getElementById("employee" + (i+1)).value;
        if(userEmail) {
            let user = firebase.auth().currentUser;
            let userProfile = buildEmpProfile(userEmail);

            if (user) {
                $.post( "https://us-central1-wanderift-c9a53.cloudfunctions.net/invitationEmail", { email: userEmail } )
                .done(function(){
                    alert('Invitation sent successfully');
                }).fail(function(){
                    console.log('Invitation not sent successfully');
                });
               
            }
        }
        
        
    }
    
   
   
}

function buildEmpProfile(email) {
    var currentMonth = '';
    let userObject = {};
    userObject.firstname = null;
    userObject.lastname = null;
    userObject.dob = null;
    userObject.gender = null;
    userObject.company = null;
    userObject.subscriber_market = null;
    userObject.email = email;
    userObject.reference = null;
    userObject.joined_on = Date.now();
    userObject.tokens = { available: 0, lastupdated: null };

    return userObject
}

