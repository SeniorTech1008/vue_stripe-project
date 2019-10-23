var db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

var app = new Vue({
    el: '#app',
    data: {
        name: null,
        email: null,
        company: null,
        adplan: null
    },
    methods: {
        submit: function () {
            let adData = {
                name: app.name,
                email: app.email,
                company: app.company,
                adplan: app.adplan
            }

            db.collection("ad-subscription").add(adData)
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });;
        }
    },
    beforeMount() {
    }
})