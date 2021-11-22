import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import StockContainer from './StockContainer';


const StockScrollView = (prop) => {
    const listStocks = prop.stockList.map((stockObj, index) => {
        return (
            <View key={index}>
                <StockContainer stock={stockObj.stock} />
            </View>
        )
    })

    return (
        <ScrollView>
            {listStocks}
        </ScrollView>
    );
}

const styles = StyleSheet.create({

});

export default StockScrollView;