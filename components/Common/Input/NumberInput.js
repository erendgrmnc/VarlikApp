import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

const NumberInput = (prop) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.numberInput}
                keyboardType='numeric'
                onChangeText={(text) => prop.setState(text)}
                value={prop.state}
                maxLength={10}  //setting limit of input
                placeholder={prop.placeholder}
            />
        </View>
    )
}

export default NumberInput

const styles = StyleSheet.create({
    numberInput: {
        width: '100%',
        color: 'black',
        marginVertical: 8,
        borderWidth: 2,
        padding: 10
    }
})
