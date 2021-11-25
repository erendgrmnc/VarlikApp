import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SingInScreen from './SingInScreen';
import { auth, signIn } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import WalletScreen from '../Wallet/WalletScreen';
const AuthManagementScreen = (prop) => {

    function GetSignUpScreen() {
        return <SignUpScreen />
    }

    function GetSignInScreen() {
        return <SingInScreen />
    }

    function GetWalletScreen() {
        return <WalletScreen />
    }

    const [isUserSignedIn, setUserSignedIn] = useState(false);

    onAuthStateChanged(auth, user => {
        if (user) {
            setUserSignedIn(true);
        }
        else {
            setUserSignedIn(false);
        }
    });

    if (isUserSignedIn) {
        return (
            <WalletScreen />
        );
    }
    else {
        return (
            <SingInScreen />
        );
    }


}

export default AuthManagementScreen;