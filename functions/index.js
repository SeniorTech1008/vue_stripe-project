const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sendgMail = require('@sendgrid/mail');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

const MY_SENDGRID_API_KEY = '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';

sendgMail.setApiKey(MY_SENDGRID_API_KEY);

exports.newUserMail = functions.database.ref('users/{userId}')
    .onCreate((snap, context) => {
        const user = snap.val();

        sendgMail.setSubstitutionWrappers('{{', '}}');
        const msg = {
            to: user.email,
            from: 'info@wanderift.com',
            subject: 'Welcome to Wanderift',
            templateId: 'd-d43bc7b7ec354516a1963869c59da68b'
        };
        const adminMsg = {
            from: user.email,
            subject: 'Welcome to Wanderift',
            templateId: 'd-d43bc7b7ec354516a1963869c59da68b',
            personalizations: [{
                to: [{
                    email: user.email
                }],
                dynamic_template_data: {
                    email: user.email
                }
            }]
        };

        sendgMail.send(msg)
            .then(() => {
                console.log('New user email sent to', user.email);
                sendgMail.send(adminMsg)
                    .then(() => console.log('email sent to admin!'))
                    .catch(err => console.log("Error encountered", err));
            })
            .catch(err => console.log("Error encountered", err));

    });

exports.firestoreEmail = functions.database.ref('users/{userId}')
    .onCreate((snap, context) => {
        const user = snap.val();

        sendgMail.setSubstitutionWrappers('{{', '}}');
        const msg = {
            to: user.email,
            from: 'info@wanderift.com',
            subject: 'Welcome to Wanderift',
            templateId: 'd-9acf68693171447bba4fabb7ed3b31e3'
        };
        const adminMsg = {
            from: user.email,
            subject: 'New Wanderift user',
            templateId: 'd-9acf68693171447bba4fabb7ed3b31e3',
            personalizations: [{
                to: [{
                    email: 'subscribers@wanderift.com'
                }],
                dynamic_template_data: {
                    email: user.email
                }
            }]
        };

        sendgMail.send(msg)
            .then(() => {
                console.log('New user email sent!');
                sendgMail.send(adminMsg)
                    .then(() => console.log('email sent to admin!'))
                    .catch(err => console.log("Error encountered", err));
            })
            .catch(err => console.log("Error encountered", err));

    });

exports.flightMails = functions.database.ref("/flightBooking/")
    .onCreate((snap, context) => {
        const flightData = snap.val();

        sendgMail.setSubstitutionWrappers('{{', '}}');
        const flightMsg = {
            from: flightData.useremail,
            subject: 'Flight Bookings',
            templateId: 'd-317217850d1d4a9e9ea38a1ca3400c71',
            personalizations: [{
                to: [{
                    email: 'bookings@wanderift.com'
                }],
                dynamic_template_data: {
                    email: flightData.useremail,
                    departure_city: flightData.dep_city,
                    arrival_city: flightData.ari_city,
                    departure_date: flightData.dep_date,
                    return_date: flightData.return.dep_date,
                    departure_time: flightData.dep_date,
                    return_time: flightData.return.dep_date,
                    dep_carrier: flightData.carrier,
                    ret_carrier: flightData.return.carrier
                }
            }]
        };

        sendgMail.send(flightMsg)
            .then(() => console.log('Flight details posted'))
            .catch(err => console.log("Error encountered", JSON.stringify(err.body)));
    });

exports.searchStats = functions.database.ref("/flightSearch/")
    .onCreate((snap, context) => {
        const statsData = snap.val();


        sendgMail.setSubstitutionWrappers('{{', '}}');
        const flightMsg = {
            from: "no-reply@wanderift.com",
            subject: 'Trip search Statistics',
            templateId: 'd-f1e6e2d14e0748f8bdcdf0a1446e4833',
            personalizations: [{
                to: [{
                    email: 'bookings@wanderift.com'
                }],
                dynamic_template_data: {
                    departure_city: statsData.dep_city,
                    arrival_city: statsData.ari_city,
                    return_date: statsData.return_date,
                    trip_date: statsData.trip_date,
                    trip_type: statsData.trip_type
                }
            }]
        };

        sendgMail.send(flightMsg)
            .then(() => console.log('Search stats posted'))
            .catch(err => console.log("Error encountered", err));
    });

exports.paymentsEmails = functions.firestore
    .document('stripe_customers/{stripeCustomersId}')
    .onCreate((snapshot, context) => {
        const paymentData = snapshot.data();


        sendgMail.setSubstitutionWrappers('{{', '}}');
        const flightMsg = {
            from: "no-reply@wanderift.com",
            subject: 'Payment Upgrade',
            templateId: 'd-5d398d6796ab4d92bee9c70cfe08e575',
            personalizations: [{
                to: [{
                    email: 'info@wanderift.com'
                }],
                dynamic_template_data: {
                    email: paymentData.email,
                    name: paymentData.name,
                    plan: paymentData.plan
                }
            }]
        };

        sendgMail.send(flightMsg)
            .then(() => console.log('Search stats posted'))
            .catch(err => console.log("Error encountered", err));
    });

exports.adSubscription = functions.firestore
    .document('ad-subscription/{adSubscriptionId}')
    .onCreate((snapshot, context) => {
        const adData = snapshot.data();


        sendgMail.setSubstitutionWrappers('{{', '}}');
        const flightMsg = {
            from: "no-reply@wanderift.com",
            subject: 'Add Subscription',
            templateId: 'd-72e48fded87142e989a6ec9bf0b9ec81',
            personalizations: [{
                to: [{
                    email: 'info@wanderift.com'
                }],
                dynamic_template_data: {
                    email: adData.email,
                    name: adData.name,
                    company: adData.company,
                    adplan: adData.adplan
                }
            }]
        };

        sendgMail.send(flightMsg)
            .then(() => console.log('Add subscription email sent to info@wanderift.com'))
            .catch(err => console.log("Error encountered", err));
    });