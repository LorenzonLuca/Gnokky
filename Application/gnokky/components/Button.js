import { TouchableOpacity, Text } from "react-native";
import ComponentsStyles from "../styles/ComponentsStyles";

export default function Button({ text, onPress, backgroundColor, color, extraStyle }) {


    return (
        <View style={[ComponentsStyles.button.buttonContainer, extraStyle]}>
            <TouchableOpacity style={[ComponentsStyles.button.button, backgroundColor]} onPress={onPress}>
                <Text style={styles.appButtonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}