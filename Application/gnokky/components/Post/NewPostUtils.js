import * as Location from 'expo-location';
import axios from 'axios';
import { MAPBOX_ACCESS_TOKEN } from '../../private.conf';

export default class NewPostUtils {
    static async getUserLocation() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return "Permission to access location was denied";
        }

        let location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const city = await this.getCityName(latitude, longitude);
        return city;
    }
    static async getCityName(latitude, longitude) {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

        try {
            const response = await axios.get(url);
            if (response.data.features.length > 0) {
                const city = response.data.features[0].place_name;
                return city;
            }
        } catch (error) {
            console.error('Error retrieving city name:', error);
        }

        return null;
    }
}