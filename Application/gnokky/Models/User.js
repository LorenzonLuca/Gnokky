export default class User {

    constructor(username, typeSignIn) {
        this.username = username;
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

    setUsername(username) {
        this.username = username;
    }

    setType(typeSignIn) {
        this.typeSignIn = typeSignIn;
    }
}