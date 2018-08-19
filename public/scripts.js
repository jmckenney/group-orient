document.addEventListener('DOMContentLoaded', function () {
    let database = firebase.database();
    let provider = new firebase.auth.GoogleAuthProvider();
    window.phoneElements = {};

    firebase.auth().getRedirectResult().then(function (result) {
        debugger;
        if (result.credential) {
            var token = result.credential.accessToken;
            window.fbuser = result.user;
            database.ref('users/' + window.fbuser.uid).set({
                gamma: 0,
                photo: ""
            });
            addPhonesToPage();
            initDbWriter();
        } else {
            firebase.auth().signInWithRedirect(provider);
        }
        // The signed-in user info.
        var user = result.user;
    }).catch(function (error) {
        debugger;
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });


    // firebase.auth().signInWithPopup(provider).then(function (result) {
    // });

    const initDbListener = function () {
        database.ref().on("value", function (snapshot) {
            // debugger;
            let userOrientations = snapshot.val().users;
            for (var key in userOrientations) {
                window.phoneElements[key].style.transform =
                    "rotateZ(1deg) " +
                    "rotateX(45deg) " +
                    "rotateY(" + (userOrientations[key].gamma) + "deg) " +
                    "skew(-3deg)";
                window.phoneElements[key].style.backgroundImage = "url('" + userOrientations[key].photo + "')";
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    const initDbWriter = function () {
        window.addEventListener("deviceorientation", function (event) {
            // debugger;
            if (window.fbuser.uid) {
                database.ref('users/' + window.fbuser.uid).set({
                    gamma: event.gamma,
                    photo: window.fbuser.photoURL
                });
            }
        });
    }

    const addPhonesToPage = function () {
        firebase.database().ref('/users').once('value').then(function (snapshot) {
            let users = snapshot.val();
            for (var key in users) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("phone");
                newDiv.setAttribute("id", key);
                document.body.appendChild(newDiv);
                window.phoneElements[key] = newDiv;
            }
            initDbListener();
        });
    }

});