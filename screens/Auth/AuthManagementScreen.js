import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SingInScreen from './SingInScreen';
import { auth } from '../../firebase';
import WalletScreen from '../Wallet/WalletScreen';
const AuthManagementScreen = (prop, { navigation }) => {


    function GetSignUpScreen() {
        return <SignUpScreen />
    }

    function GetSignInScreen() {
        return <SingInScreen />
    }

    function GetWalletScreen() {
        return <WalletScreen />
    }

    auth().onAuthStateChanged((user) => {
        if (user) {
            navigation.navigate('Wallet');
        }
        else {
            navigation.navigate('Sign In');
        }
    });

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='Sign In' component={GetSignInScreen} />
            <Stack.Screen name='Wallet' component={GetWalletScreen} />
        </Stack.Navigator>
    );
}

export default AuthManagementScreen;