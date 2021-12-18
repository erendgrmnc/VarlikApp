import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CoinListScreen from './screens/CoinListScreen';
import BistListScreen from './screens/BistListScreen';
import AuthManagementScreen from './screens/Auth/AuthManagementScreen';
function GetHomeScreen() {
  return (
    <HomeScreen />
  );
}
function GetCoinListScreen() {
  return (
    <CoinListScreen />
  );
}

function GetBistListScreen() {
  return <BistListScreen />
}



const Tab = createBottomTabNavigator();

export default function App() {

  function GetAuthManagementScreen() {
    return <AuthManagementScreen />
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Kripto Para') {
              return <Image style={{ width: 25, height: 25 }} source={require('./assets/crypto-icon.png')} />
            } else if (route.name === 'Hesap') {
              return <Image style={{ width: 25, height: 25 }} source={require('./assets/varlik-app-profile-icon.png')} />
            }
            else if (route.name === 'Borsa İstanbul') {
              return <Image style={{ width: 25, height: 25 }} source={require('./assets/stock-icon.png')} />
            }
            ;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Kripto Para' component={GetCoinListScreen} />
        <Tab.Screen name='Hesap' component={GetAuthManagementScreen} />
        <Tab.Screen name='Borsa İstanbul' component={BistListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
