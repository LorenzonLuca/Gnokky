import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import WaitingPage from './pages/Auth/WaitingPage';
import HomeTemplate from './pages/Home/HomeTemplate';
import ProfileManagement from './pages/Profile/ProfileManagement';
import { useFonts } from 'expo-font';
import { Animated, Easing } from 'react-native';

const Stack = createStackNavigator();

export default function App() {

  const [loaded] = useFonts({
    "mnst-bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    "mnst-mid": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
    "mnst-reg": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    "mnst-light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
  });

  if (!loaded) {
    return null;
  }

  const transitionConfig = () => ({
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;

      const translateX = position.interpolate({
        inputRange: [scene.index - 1, scene.index, scene.index + 1],
        outputRange: [width, 0, 0],
      });

      return { transform: [{ translateX }] };
    },
  });

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
        cardStyleInterpolator: ({ current: { progress } }) => ({
          cardStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
          overlayStyle: {
            opacity: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.7],
              extrapolate: 'clamp',
            }),
          },
        }),
      }}
        transitionConfig={transitionConfig}
      >
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
        <Stack.Screen name="Waiting" component={WaitingPage} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTemplate" component={HomeTemplate} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}