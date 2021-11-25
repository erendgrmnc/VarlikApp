import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
const GetPercentageText = (percent) => {
    if (percent > 0) {
        return (
            <Text style={styles.positivePercentText}>{percent}</Text>
        );
    }
    else if (percent < 0) {
        return (
            <Text style={styles.negativePercentText}>{percent}</Text>
        );
    }
    else {
        return (
            <Text>{percent}</Text>
        );
    }
}
const UserStockContainer = (prop) => {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text>{prop.stock.text}({prop.stock.stockCode})</Text>
            </View>
            <View style={styles.pricesContainer}>
                <View>
                    <Text>
                        Alış Fiyatı: {prop.stock.stockBuyPrice} ₺
                    </Text>
                </View>
                <View style={styles.rowContainer}>
                    <Text>Adet: </Text>
                    {GetPercentageText(prop.stock.stockBuyAmount)}
                </View>


            </View>
        </View>
    )
}

export default UserStockContainer

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 3


    },
    positivePercentText: {
        color: 'green'
    },
    negativePercentText: {
        color: 'red'
    },
    pricesContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    rowContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row'
    }
})
