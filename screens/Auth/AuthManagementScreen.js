import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SignUpScreen from './SignUpScreen';
import SingInScreen from './SingInScreen';
import { auth, signIn } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import WalletScreen from '../Wallet/WalletScreen';

let authFlag = false;
const AuthManagementScreen = (prop) => {
    const [isUserSignedIn, setUserSignedIn] = useState(false);
    const [userToken, setUserToken] = useState('');
    const [loading, setLoading] = useState(true);

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
        if (user) {
            setUserSignedIn(true);
            if (!authFlag) {
                user.getIdToken(true).then(idToken => {
                    setUserToken(idToken);
                });
                authFlag = true;
            }


        }
        else {
            setUserSignedIn(false);
            if (userToken != null || userToken != '') {
            }
        }
    });


    if (isUserSignedIn) {
        return (
            <WalletScreen userToken={userToken} />
        );
    }
    else {
        return (
            <SingInScreen />
        );
    }
}

export default AuthManagementScreen;