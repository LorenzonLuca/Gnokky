import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomePage from "../pages/Home/HomePage";
// import the others pages

const Tab = createBottomTabNavigator();

export default function NavigatorTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Home" component={HomePage} />
            <Tab.Screen name="Home" component={HomePage} />
        </Tab.Navigator>
    );
}
