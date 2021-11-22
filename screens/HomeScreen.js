import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';



const MainScreen = (props) => {
    const [count, setCount] = useState({
        val: 0
    });

    const increaseCount = () => {

        setCount(prevState => {
            return { ...prevState, val: count.val + 1 }
        })

    }

    return (

        <View style={styles.mainContainer}>
            <Text style={styles.mainScreenHeader}>{count.val}</Text>
            <Button onPress={increaseCount} title='+'></Button>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center'

    },
    mainScreenHeader: {
        color: 'black',
        textAlign: 'center'
    }

});


export default MainScreen;