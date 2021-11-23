import { ImageBackground, StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function WelcomeScreen({ navigation }) {
    return (

        <View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Welcome to Firebase/Firestore Example</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign Up')} >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style={styles.inlineText}>Already have an account?</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Sign In')}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    )
}