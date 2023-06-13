// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import LoginPage from './Auth/LoginPage';
// import RegisterPage from './Auth/RegisterPage';

// const SwitchPage = ( { onLogin } ) => {
//   const [currentPage, setCurrentPage] = useState('Page1');

//   const switchPage = () => {
//     setCurrentPage(currentPage === 'Page1' ? 'Page2' : 'Page1');
//   };

//   return (
//     <View style={styles.container}>
//       {currentPage === 'Page1' && (
//         <Page1 switchPage={switchPage} onLogin={onLogin} />
//       )}
//       {currentPage === 'Page2' && (
//         // <Page2 switchPage={switchPage} onLogin={onLogin} />
//         <Page2 switchPage={switchPage} onLogin={() => { setInitialRoute('WaitingPage') }} />
//         )}
//     </View>
//   );
// };

// const Page1 = ({ switchPage, onLogin }) => {
//   return (
//       <LoginPage onPress={switchPage} onLogin={onLogin}></LoginPage>
//   );
// };

// const Page2 = ({ switchPage, onLogin }) => {
//   return (
//     // <RegisterPage onPress={switchPage} onLogin={onLogin}></RegisterPage>
//     <RegisterPage onPress={switchPage} onLogin={() => { setInitialRoute('WaitingPage') }}></RegisterPage>
//     );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   pageContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

// export default SwitchPage;
