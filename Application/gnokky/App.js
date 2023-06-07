import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { auth } from './Models/Firebase';

import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import WaitingPage from './pages/Auth/WaitingPage';
import HomeTemplate from './pages/Home/HomeTemplate';

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  function onAuthStateChanged(user) {
    console.log("user changed");
    setUser(user);

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const users = auth.onAuthStateChanged(onAuthStateChanged);
    if (emailSent) {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          setEmailVerified(true);
        }
        setEmailSent(false);
      });
    }
    return users;
  }, [emailSent]);

  if (initializing) return null;


  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterPage} options={{ headerShown: false }} />
      </Stack.Navigator >
    );
  } else {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Waiting" component={WaitingPage} options={{ headerShown: false }} />
        <Stack.Screen name="HomeTemplate" component={HomeTemplate} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}



export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
};