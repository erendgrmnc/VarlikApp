import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './SignUpScreen';
import SingInScreen from './SingInScreen';
import { auth } from '../../firebase';
const AuthManagementScreen = (prop) => {


    function GetSignUpScreen() {
        return <SignUpScreen />
    }

    function GetSignInScreen() {
        return <SingInScreen />
    }

    const Stack = createNativeStackNavigator();
    if (auth.currentUser) {
        return (
            <Stack.Navigator>
                <Stack.Screen name='Sign In' component={GetSignInScreen} />
                <Stack.Screen name='Sign Up' component={GetSignUpScreen} />
            </Stack.Navigator>
        );


    }
    else {
        return (
            <View>
                <Text>{auth.currentUser.uid}</Text>
            </View>
        );
    }

}

export default AuthManagementScreen;