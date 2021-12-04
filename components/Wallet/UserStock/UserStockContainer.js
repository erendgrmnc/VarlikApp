import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import UserStockModal from './UserStockModal';
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
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <TouchableOpacity
                onPress={() => {
                    setModalVisible(true);
                }}
            >
                <View style={styles.mainContainer}>
                    <View>
                        <Text>{prop.stock.stockCode}</Text>
                    </View>
                    <View style={styles.pricesContainer}>
                        <View>
                            <Text>
                                Alış Fiyatı: {prop.stock.stockBuyPrice} ₺
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text>Adet: </Text>
                            <Text>{prop.stock.stockAmount}</Text>
                        </View>


                    </View>
                </View>
            </TouchableOpacity>

            <UserStockModal modalVisible={modalVisible} setModalVisible={setModalVisible} stock={prop.stock} currentStock={prop.currentStock} />
        </View>

    )
}

export default UserStockContainer

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        paddingVertical: 5,
        paddingHorizontal: 3,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'space-between'
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
        flexDirection: 'row'
    }
})
