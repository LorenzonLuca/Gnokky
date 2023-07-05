import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { COLORS } from '../Models/Globals';

import PostReports from './PostReports';
import UserReports from './UserReports';
import BlackList from './BlackList';

// Crea il navigatore a schede
const TabNavigator = createMaterialTopTabNavigator(
  {
    Posts: {
      screen: PostReports,
      navigationOptions: {
        title: 'Posts',
      },
    },
    Users: {
      screen: UserReports,
      navigationOptions: {
        title: 'Users',
      },
    },
    BlackList: {
      screen: BlackList,
      navigationOptions: {
        title: 'Blacklist',
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: COLORS.elements, // Colore dell'icona/etichetta della scheda attiva
      inactiveTintColor: COLORS.thirdText, // Colore dell'icona/etichetta delle schede inattive
      showIcon: false, // Mostra le icone sulla scheda (true) o solo il testo (false)
      showLabel: true, // Mostra le etichette sulla scheda (true) o solo le icone (false)
      style: {
        backgroundColor: 'white', // Colore di sfondo della barra delle schede
      },
      indicatorStyle: {
        backgroundColor: COLORS.elements, // Colore dell'indicatore della scheda attiva
      },
    },
  }
);

// Crea il contenitore dell'applicazione
const AppContainer = createAppContainer(TabNavigator);

// Esporta il componente principale
export default function AdminNavigator() {
  return <AppContainer />;
}
