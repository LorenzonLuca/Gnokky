export default class User {

    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    setEmail(email) {
        this.email = email;
    }

    setUsername(username) {
        this.username = username;
    }

    setId(id) {
        this.id = id;
    }

    setProfilePic(pic) {
        this.profilePic = pic;
    }
}