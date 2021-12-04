import React, { useState } from 'react'
import { StyleSheet, Text, View, Picker } from 'react-native'
import { auth } from '../../firebase'
import axios from 'axios'
import UserCoins from '../../components/Wallet/UserCoins'
import UserStocks from '../../components/Wallet/UserStocks'
import TypePicker from '../../components/Wallet/TypePicker'

const WalletScreen = (prop) => {
    const [selectedValue, setSelectedValue] = useState("java");
    const [dropValue, setDropValue] = useState(null);

    if (dropValue == 'stcks' || dropValue == null) {
        return (
            <View style={styles.container}>
                <TypePicker value={dropValue} setValue={setDropValue} />
                <View>
                    <UserStocks userToken={prop.userToken} />
                </View>
            </View>
        )
    }
    else if (dropValue == 'crypto') {
        return (
            <View style={styles.container}>
                <TypePicker value={dropValue} setValue={setDropValue} />
                <View>
                    <UserCoins userToken={prop.userToken} />
                </View>
            </View>
        );

    }
    else {
        return (
            <View style={styles.container}>
                <TypePicker value={dropValue} setValue={setDropValue} />
                <View>
                    <Text>zort</Text>
                </View>
            </View>
        );

    }

}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'column'
    }
});

export default WalletScreen
