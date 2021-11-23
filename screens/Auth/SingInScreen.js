import React, { useState } from 'react'
import { KeyboardAvoidingView, Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { auth, signIn, signUp } from '../../firebase';
const SingInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSignUp() {
        await signUp(email, password);
    }

    async function handleSignIn() {

        await signIn(email, password).then(() => {
            Alert.alert(
                "Hoşgeldin" + auth.currentUser.email,
                "SelamunAleyküm",
                [
                    {
                        text: "Sg",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                    },
                    { text: "Sağol", onPress: () => console.log("OK Pressed") }
                ]
            );
        });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='padding'
        >
            <View
                style={styles.inputContainer}
            >
                <TextInput
                    placeholder='email'
                    value={email}
                    onChangeText={text => {
                        setEmail(text);
                    }}
                    style={styles.emailInput}
                />
                <TextInput
                    placeholder='password'
                    secureTextEntry
                    value={password}
                    onChangeText={text => {
                        setPassword(text);
                    }}
                    style={styles.passwordInput}
                />
            </View>

            <View
                style={styles.buttonContainer}
            >
                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignIn}
                >
                    <Text
                        style={styles.buttonText}
                    >Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignUp}
                >
                    <Text
                        style={styles.buttonOutlineText}
                    >Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%'
    },
    emailInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    passwordInput: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonText: {
        color: 'black',
        fontWeight: '700',
        fontSize: 16,
    }


})

export default SingInScreen
