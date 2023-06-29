import { Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function GNEmptyText ({ style, icon = "", text }) {
    if (!text) {
        return <Text style={{ display: 'none' }}>{text}</Text>;
    }
    return <Text style={[style, {marginVertical: 7,}]}><Ionicons name={icon} size={15} />{text}</Text>;
};