import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import UserCoinModal from './UserCoinModal'

const UserCoinContainer = (prop) => {
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
                        <Text>{prop.coin.coinCode}</Text>
                    </View>
                    <View style={styles.pricesContainer}>
                        <View>
                            <Text>
                                Alış Fiyatı: {prop.coin.coinBuyPrice} ₺
                            </Text>
                        </View>
                        <View style={styles.rowContainer}>
                            <Text>Adet: </Text>
                            <Text>{prop.coin.coinAmount}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <UserCoinModal modalVisible={modalVisible} setModalVisible={setModalVisible} coin={prop.coin} currentCoin={prop.currentCoin} />
        </View>
    )
}

export default UserCoinContainer

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
