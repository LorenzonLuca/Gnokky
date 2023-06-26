import FirebaseUtils from './FirebaseUtils';
import { storage } from './Firebase';
import { getDownloadURL, ref } from 'firebase/storage';

export default class User {

    constructor(username, email) {
        this.username = username;
        this.email = email;
    }

    async getValueAndUpdate() {
        FirebaseUtils.getUser(this.id).then((result) => {
            this.setUsername(result.username);
            this.setName(result.name);
            this.setSurname(result.surname);
            this.setBio(result.bio);
            this.setFollowers(result.followers);
            this.setFollowing(result.following);
            this.setPosts(result.posts);
            this.setProfilePic(result.profilePic);
        });
    }
    updateOnlyValues(newUser) {
        this.setUsername(newUser.username);
        this.setName(newUser.name);
        this.setSurname(newUser.surname);
        this.setBio(newUser.bio);
        this.setFollowers(newUser.followers);
        this.setFollowing(newUser.following);
        this.setPosts(newUser.posts);
        this.setProfilePic(newUser.profilePic);
    }
    resetAllValues() {
        this.setId("");
        this.setUsername("");
        this.setName("");
        this.setSurname("");
        this.setBio("");
        this.setFollowers("");
        this.setFollowing("");
        this.setPosts("");
        this.setProfilePic("");
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