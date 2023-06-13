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
            console.log(result);
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