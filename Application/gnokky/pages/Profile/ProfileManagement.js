import { View, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GNButton from '../../components/GNButton';
import GNHeader from '../../components/GNHeader';
import GNProfileImage from '../../components/GNProfileImage';
import styles from "../../styles/Styles";


export default function ProfileManagement({ navigation, route }) {
    const { title } = route.params;
    const placeholder = require('./../../assets/blank_profile.png');
    const [selectedImage, setSelectedImage] = useState(null);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.background}>
            <GNHeader title={title}></GNHeader>
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <GNProfileImage placeholder={placeholder} size={90} selectedImage={selectedImage}></GNProfileImage>
                    <GNButton text={"Edit Image"} width={100} onPress={pickImageAsync}></GNButton>
                </View>
                <Text>pfjkdahfukfgu</Text>
            </View>
        </View>
    );
}