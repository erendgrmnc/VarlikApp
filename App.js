import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CoinListScreen from './screens/CoinListScreen';
import BistListScreen from './screens/BistListScreen';
import AuthManagerScreen from './screens/Auth/AuthManagerScreen';
function GetHomeScreen() {
  return (
    <AuthManagerScreen />
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
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name='Crypto Coins' component={GetCoinListScreen} />
        <Tab.Screen name='Auth' component={GetHomeScreen} />
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
