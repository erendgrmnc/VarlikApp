import React, { useState, useEffect } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'

import CoinContainer from './CoinContainer';

const CoinScrollView = (prop) => {

    const listCoins = prop.coinList.map((object, index) => {
        return (
            <View key={index}>
                <CoinContainer coin={object.coin} />
            </View>
        )
    });

    return (
        <ScrollView style={styles.mainContainer}>
            {listCoins}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%'
    }
});

export default CoinScrollView;