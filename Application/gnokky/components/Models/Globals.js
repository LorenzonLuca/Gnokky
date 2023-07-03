import User from "./User";

export const appUser = new User("", "");
export const COLORS = {
    "background": "#F2F3F4",
    "elements": "#A020F0",
    "firtText": "#000500",
    "secondText": "#808080",
    "thirdText": "#C0C0C0",
    "fourthText": "#EDEDED"
};

export const IMAGES = {
    LOGO: require('./../../assets/logo/logo_gnocchi_viola.png'),
    LOGO_OUTLINE: require('./../../assets/logo/logo_gnocchi_outline.png'),
    EMPTY_PROFILE: require('./../../assets/blank_profile.png'),
}

export const ROUTES = {
    BOTTOM_NAVIGATOR: 'Bottom',
    HOME_NAVIGATOR: 'HomeNavigator',

    ADMIN: 'Admin',
    LOGIN: 'Login',
    REGISTER: 'Register',
    VERIFY_EMAIL: 'WaitingPage',
    PROFILE_MANAGEMENT: 'ProfileManagement',
    CREATE_PROFILE: 'CreateProfile',

    HOME: "Home",
    SEARCH: "Search",
    NOTIFICATION: "Notification",
    PROFILE: "Profile",
    CHAT: "Chat",

    FLOATING_NAVITAGOR: 'FloatingNavigator',
    POST: "Post",
    STORY: "Story",

    NEW_STORY: "NewStory",
};