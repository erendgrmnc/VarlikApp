import React from 'react'
import { StyleSheet, Text, View, Modal, Pressable } from 'react-native'

const UserCoinModal = (prop) => {
    return (
        <Modal presentationStyle="pageSheet" visible={prop.modalVisible} style={styles.modalContainer}>
            <View style={styles.headerContainer}>

            </View>
            <View style={styles.bodyContainer}>
                <Text>{prop.currentCoin.name}</Text>
                <Text>{prop.coin.coinCode}</Text>
            </View>

            <View style={styles.bottomContainer}>
                <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => prop.setModalVisible(!prop.modalVisible)}
                >
                    <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    )
}

export default UserCoinModal

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: 'black'
    },
    bottomContainer: {
        position: 'absolute',
        flex: 1,
        bottom: 0,
        width: '100%',
        padding: 25

    },
    buttonClose: {
        flex: 1,
        width: '100%',
        backgroundColor: '#ccc',
        height: '100%',
        textAlign: 'center',
        padding: 20,
        borderRadius: 20

    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24
    }
})
