
import auth from './auth.js';

document.addEventListener('DOMContentLoaded', function () {
    const provider = new firebase.auth.GoogleAuthProvider();
    const user = auth.initiateLogin(provider);

    const phoneElements = {};

    const initDbListener = function () {
        firebase.database().ref().on("value", onChangeHandler, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });
    }

    const initDbWriter = () => {
        window.addEventListener("deviceorientation", function (event) {
            if (user.uid) {
                firebase.database().ref('users/' + user.uid).set({
                    gamma: event.gamma,
                    photo: user.photoURL
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

    const phone = (element) => {
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

    const onChangeHanlder = function (snapshot) {
        let userOrientations = snapshot.val().users;
        for (var key in userOrientations) {
            let newDiv = createPhone();
            // document.body.appendChild(newDiv);
            // phoneElements[key] = newDiv;
        }
    }

    addPhonesToPage();
    initDbWriter();
});

const createPhone = function(key) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("phone");
    newDiv.setAttribute("id", key);
    return phone(newDiv);
}

export default createPhone;