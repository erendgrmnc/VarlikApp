import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SignUpScreen from './SignUpScreen';
import SingInScreen from './SingInScreen';
import { auth, signIn } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import WalletScreen from '../Wallet/WalletScreen';
const AuthManagementScreen = (prop) => {
    const [isUserSignedIn, setUserSignedIn] = useState(false);

    function GetSignUpScreen() {
        return <SignUpScreen />
    }

    function GetSignInScreen() {
        return <SingInScreen />
    }

    function GetWalletScreen() {
        return <WalletScreen />
    }


    onAuthStateChanged(auth, user => {
        if (auth.currentUser == null) {
            setUserSignedIn(false);
        }
        else {
            setUserSignedIn(true);
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