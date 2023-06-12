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

    setName(name) {
        this.name = name;
    }

    setSurname(surname) {
        this.surname = surname;
    }

    setBio(bio) {
        this.bio = bio;
    }

    setFollowers(followers) {
        this.followers = followers;
    }

    setFollowing(following) {
        this.following = following;
    }

    setPosts(posts) {
        this.posts = posts;
    }
}