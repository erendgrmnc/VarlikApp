import React, { useState } from 'react'
import { KeyboardAvoidingView, Alert, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { auth, signIn, signUp } from '../../firebase';
const SingInScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function AlertUser(header, message) {
        Alert.alert(header, message, [
            {
                text: "Tamam",
                onPress: () => {
                },
                style: "cancel",
            },
        ]);
    }
    function ValidateEmail(email) {

        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.match(validRegex)) {
            return true;
        }
        else {
            return false;

        }

    }

    function ValidatePassword(password) {
        if (password.length < 6 || password.length > 16) {
            return false;
        }
        else {
            return true;
        }
    }

    async function handleSignUp() {

        if (!ValidateEmail(email)) {
            AlertUser('E Posta Uygun Değil !', 'Lütfen kayıtlı olduğunuz e posta adresini giriniz.');
        }
        else if (!ValidatePassword(password)) {
            AlertUser('Şifre Uygun Değil !', 'Lütfen 6 ile 15 karakter arasında bir şifre giriniz !');
        }
        else {
            try {
                await signUp(email, password).then(() => {
                    Alert.alert(
                        "Başarıyla Kayıt Olundu !",
                        "Kayıt işlemi başarıyla tamamlandı.",
                        [
                            {
                                text: "Tamam",
                                onPress: () => {
                                    //TO DO Kayıt Olduktan Sonra Cüzdanım Sayfasına Yönlendir. 
                                }
                            }
                        ]
                    )
                })
            }
            catch (exception) {
                Alert.alert(
                    "Hata",
                    "Kayıt olma işlemi sırasında bir hata meydana geldi!",
                    [
                        {
                            text: "Tamam",
                            onPress: () => {
                            },
                            style: "cancel"
                        }
                    ]

                )
            }
        }
    }

    async function handleSignIn() {
        try {
            await signIn(email, password).then(() => {
                Alert.alert(
                    "Hoşgeldin" + auth.currentUser.email,
                    "Başarıyla Giriş Yapıldı.",
                    [
                        {
                            text: "Tamam", onPress: () => {
                                //TO DO Kayıt Olduktan Sonra Cüzdanım Sayfasına Yönlendir. 
                            }
                        }
                    ]
                );
            });
        }
        catch (exception) {
            Alert.alert(
                "Hata",
                "Giriş yapma işlemi sırasında bir hata meydana geldi!",
                [
                    {
                        text: "Tamam",
                        onPress: () => {
                        },
                        style: "cancel"
                    }
                ]

            )
        }

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
                    maxLength={50}
                />
                <TextInput
                    placeholder='şifre'
                    secureTextEntry
                    value={password}
                    onChangeText={text => {
                        setPassword(text);
                    }}
                    style={styles.passwordInput}
                    maxLength={16}
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
                    >Giriş Yap</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.buttonOutline]}
                    onPress={handleSignUp}
                >
                    <Text
                        style={styles.buttonOutlineText}
                    >Kayıt Ol</Text>
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
