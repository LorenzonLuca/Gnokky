import { CLIENT_ID_SPOTIFY, CLIENT_SECRET_SPOTIFY } from "../../private.conf";


export default class SpotifyUtils {

    constructor() {
        this.accessTokenPromise = this.fetchAccessToken();
    }

    async fetchAccessToken() {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID_SPOTIFY + '&client_secret=' + CLIENT_SECRET_SPOTIFY
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => {
                console.log("spotify API token OK");
                this.accesToken = data.access_token;
            })
    }

    async searchForTrack(research) {
        await this.accessTokenPromise;

        const requestParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.accesToken
            }
        }


        const result = await fetch('https://api.spotify.com/v1/search?q=' + research + '&type=track&limit=10', requestParameters)
            .then(response => response.json())

        return result;
    }

}