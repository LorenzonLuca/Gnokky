

const CLIENT_ID = "4cf3e0c8d0c34b6c82239bea526c5825";
const CLIENT_SECRET = "2cfc428a075d4b35aba9e0a4a00d63c0";

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
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => {
                console.log("data spotify API: ", data.access_token);
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