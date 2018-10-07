export default {
    initiateLogin: function(provider) {
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                window.fbuser = result.user;
                database.ref('users/' + window.fbuser.uid).set({
                    gamma: 0,
                    photo: ""
                });
            } else {
                firebase.auth().signInWithRedirect(provider);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

