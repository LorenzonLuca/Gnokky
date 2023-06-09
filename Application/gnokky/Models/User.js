export default class User {

    constructor(username, email, typeSignIn) {
        this.username = username;
        this.email = email;
        this.typeSignIn = typeSignIn;
    }

    checkSignIn() {
        return new Promise((resolve, reject) => {
            const intervalCheck = setInterval(() => {
                if (this.typeSignIn === "Register" || this.typeSignIn === "Login") {
                    console.log("type sign in changed in user");
                    clearInterval(intervalCheck);
                    resolve(this.typeSignIn);
                }
            }, 1000);
        });
    }

    setEmail(email) {
        this.email = email;
    }

    setUsername(username) {
        this.username = username;
    }

    setType(typeSignIn) {
        this.typeSignIn = typeSignIn;
    }

    setId(id) {
        this.id = id;
    }

    setProfilePic(pic) {
        this.profilePic = pic;
    }
}