
import auth from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.initiateLogin(provider);

    const phoneElements = {};

    const initDbListener = function () {
        firebase.database().ref().on("value", function (snapshot) {
            let userOrientations = snapshot.val().users;
            for (var key in userOrientations) {
                phoneElements[key].style.transform =
                    "rotateZ(1deg) " +
                    "rotateX(45deg) " +
                    "rotateY(" + (userOrientations[key].gamma) + "deg) " +
                    "skew(-3deg)";
                phoneElements[key].style.backgroundImage = "url('" + userOrientations[key].photo + "')";
            }
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    const initDbWriter = () => {
        window.addEventListener("deviceorientation", function (event) {
            if (window.fbuser.uid) {
                firebase.database().ref('users/' + window.fbuser.uid).set({
                    gamma: event.gamma,
                    photo: window.fbuser.photoURL
                });
            }
        });
    }

    const addPhonesToPage = () => {
        firebase.database().ref('/users').once('value').then(function (snapshot) {
            let users = snapshot.val();
            for (var key in users) {
                let newDiv = document.createElement("div");
                newDiv.classList.add("phone");
                newDiv.setAttribute("id", key);
                document.body.appendChild(newDiv);
                phoneElements[key] = newDiv;
            }
            initDbListener();
        });
    }

    addPhonesToPage();
    initDbWriter();
});