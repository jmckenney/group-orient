export default {
    initiateLogin: function(provider) {
        firebase.auth().getRedirectResult().then(function (result) {
            if (result.credential) {
                database.ref('users/' + window.fbuser.uid).set({
                    gamma: 0,
                    photo: result.user.photoURL
                });
                return result.user;
            } else {
                firebase.auth().signInWithRedirect(provider);
                return "";
            }
        }).catch(function (error) {
            console.log(error);
        });
    }
}

