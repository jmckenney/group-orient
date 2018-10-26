import auth from './auth.js';

var phones = {};

let user;

export const createPhoneElement = function(key) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("phone");
    newDiv.setAttribute("id", key);
    return newDiv;
}

export const createPhone = (element) => {
    return {
        rotate: function(gamma) {
            this.element.style.transform =
            "rotateZ(1deg) " +
            "rotateX(45deg) " +
            "rotateY(" + (gamma) + "deg) " +
            "skew(-3deg)";
        },
        element: element
    }
};

const onChangeHandler = function (snapshot) {
    let userOrientations = snapshot.val().users;
    for (var key in userOrientations) {
        phones[key].rotate(userOrientations[key].gamma);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    const database = firebase.database();
    auth.initiateLogin(provider, database);
    user = firebase.auth().currentUser;

    window.addEventListener("deviceorientation", function (event) {
        if (user === null) {
            user = firebase.auth().currentUser;
        }
        firebase.database().ref('users/' + user.uid).set({
            gamma: event.gamma,
            photo: user.photoURL
        });
    });

    const dbChangeHandler = () => {
        firebase.database().ref().on("value", onChangeHandler, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    const addPhonesToPage = () => {
        firebase.database().ref('/users').once('value').then(function (snapshot) {
            const users = snapshot.val();
            for (var key in users) {
                if (!users.hasOwnProperty(key)) continue;
                let newPhone = createPhoneElement(key);
                document.body.appendChild(newPhone);
                phones[key] = createPhone(newPhone);
            }

            dbChangeHandler();
        });
    }

    addPhonesToPage();
});

export default {createPhoneElement, createPhone};