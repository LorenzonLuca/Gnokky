import User from "./User";
import SpotifyUtils from "./SpotifyUtils";


export const appUser = new User("", "");
export const spotifyIntegration = new SpotifyUtils();


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
    ADMIN_NAVIGATOR: 'AdminNavigator',
    
    POST_REPORTS: 'PostReports',
    USER_REPORTS: 'UserReports',
    

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

    PROFILE_NAVIGATOR: "ProfileNavigator",
    SETTINGS: 'Settings',
};