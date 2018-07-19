document.addEventListener('DOMContentLoaded', function () {
    let database = firebase.database();
    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        window.fbuser = result.user;
        initDbWriter();
    });

    const initDbListener = function () {
        database.ref().on("value", function (snapshot) {
            console.log(snapshot.val().users);
            gamma = snapshot.val().gamma;
            // phone.style.transform =
            //     "rotateZ(1deg) " +
            //     "rotateX(45deg) " +
            //     "rotateY(" + (gamma) + "deg) " +
            //     "skew(-3deg)";
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    const initDbWriter = function () {
        window.addEventListener("deviceorientation", function (event) {
            database.ref('users/' + window.fbuser.uid).set({
                gamma: event.gamma
            });
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
            }
            initDbListener();
        });
    }

    addPhonesToPage();
});