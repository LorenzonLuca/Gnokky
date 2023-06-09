import { AppBar, HStack, IconButton } from "react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

export default function GNAppBar() {
    
    return (
        <AppBar
            title="Title"
            subtitle="Lorem ipsum"
            centerTitle={true}
            leading={props => (
            <IconButton icon={props => <Icon name="menu" {...props} />} {...props} />
            )}
            trailing={props => (
            <IconButton
                icon={props => <Icon name="dots-vertical" {...props} />}
                {...props}
            />
            )}
        />
    );
}


