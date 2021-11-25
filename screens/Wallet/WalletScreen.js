import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../../firebase'
import axios from 'axios'
import UserCoins from '../../components/Wallet/UserCoins'
import UserStocks from '../../components/Wallet/UserStocks'

const WalletScreen = () => {

    return (
        <View>
            <Text>Wallet Screen</Text>
            <UserCoins />
        </View>
    )
}



const styles = StyleSheet.create({

});

export default WalletScreen
