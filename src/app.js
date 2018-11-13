const App = {};

import auth from './auth.js';
import Phone from './phone.js';

var phones = {};

let user;

const onChangeHandler = function (snapshot) {
    let userOrientations = snapshot.val().users;
    for (var key in userOrientations) {
        phones[key].rotate(userOrientations[key].gamma);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('firebase.auth: ', firebase.auth);
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
    
    onLoad(addPhonesToPage);
});


const dbChangeHandler = () => {
    firebase.database().ref().on("value", onChangeHandler, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });
}



const onLoad = (addPhonesToPage) => {
    firebase.database().ref('/users').once('value')
        .then(function (snapshot) {
        const users = snapshot.val();
        addPhonesToPage(users, dbChangeHandler);
    });
}

const addPhonesToPage = (users, afterPhonesAddedToPage) => {
    for (var key in users) {
        let newPhone = Phone.createPhoneElement(key);
        document.body.appendChild(newPhone);
        phones[key] = Phone.createPhone(newPhone);
    }
    afterPhonesAddedToPage();
}

App.addPhonesToPage = addPhonesToPage;

export default App;