import User from "./User";
import EventEmitter from 'eventemitter3';

export const dataStoreEmitter = new EventEmitter();

export const appUser = new User("", "");
export const COLORS = { "background": "#F2F3F4", "elements": "#A020F0", "firtText": "#000500", "secondText": "#808080", "thirdText": "#C0C0C0", "fourthText": "#EDEDED" };

export const updateUser = (newUser) => {
    console.log("MAREMMA HANEEEEEEEEEEEEEEEEE");
    console.log(appUser.posts.length);
    appUser.updateOnlyValues(newUser);
    console.log(appUser.posts.length);
    dataStoreEmitter.emit('changeUser');
}

export const ROUTES = {
    LOGIN: 'Login',
    REGISTER: 'Register',
    VERIFY_EMAIL: 'VerifyEmail',
    CREATE_PROFILE: 'CreateProfile',

    HOME: "Home",
    SEARCH: "Search",
    NOTIFICATION: "Notification",
    PROFILE: "Profile",

    FLOATING_NAVITAGOR: 'FloatingNavigator',
    POST: "Post",
    STORY: "Story",
};