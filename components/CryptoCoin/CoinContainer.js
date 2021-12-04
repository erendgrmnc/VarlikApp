import React from 'react';
import { View, StyleSheet, Text } from 'react-native';


const CoinContainer = (prop) => {

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

    const TrimPrice = (price) => {

        return (String(price).substring(0, String(price).indexOf('.') + 4));
    }


    return (
        <View style={styles.mainContainer}>
            <View>
                <Text>{prop.coin.name}({prop.coin.symbol})</Text>
            </View>
            <View style={styles.pricesContainer}>
                <View>
                    <Text>
                        {prop.coin.quote.USD.price} $
                    </Text>
                </View>
                <View>
                    {GetPercentageText(prop.coin.quote.USD.percent_change_24h)}
                </View>
            </View>
        </View>
    );
}

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
    }
});

export default CoinContainer;
