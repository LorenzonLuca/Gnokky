import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { auth } from './Models/Firebase';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import WaitingPage from './pages/Auth/WaitingPage';
import HomeTemplate from './pages/Home/HomeTemplate';
import { appUser } from './Models/Globals';
import ProfileManagement from './pages/Profile/ProfileManagement';
import { useFonts } from 'expo-font';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [typeSignIn, setTypeSignIn] = useState("");



  const [loaded] = useFonts({
    "mnst-bold": require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
    "mnst-mid": require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
    "mnst-reg": require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
    "mnst-light": require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
  });

  function onAuthStateChanged(user) {
    console.log("user changed");
    setUser(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const users = auth.onAuthStateChanged(onAuthStateChanged);

    appUser.checkSignIn()
      .then((result) => {
        setTypeSignIn(result);
        console.log(result);
      })

    return users;
  }, []);


  if (initializing) return null;


  if (!loaded) {
    return null;
  }

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={ProfileManagement} options={{ headerShown: false }} initialParams={{ title: "sium" }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
      </Stack.Navigator >
    );
  } else {
    if (typeSignIn === "Login") {
      return (
        <Stack.Navigator>
          <Stack.Screen name="HomeTemplate" component={HomeTemplate} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
    } else if (typeSignIn === "Register") {
      return (
        <Stack.Navigator>
          <Stack.Screen name="Waiting" component={WaitingPage} options={{ headerShown: false }} />
          <Stack.Screen name="ProfileManagement" component={ProfileManagement} options={{ headerShown: false }} />
          <Stack.Screen name="HomeTemplate" component={HomeTemplate} options={{ headerShown: false }} />
        </Stack.Navigator>
      );
    }
  }
}



export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};