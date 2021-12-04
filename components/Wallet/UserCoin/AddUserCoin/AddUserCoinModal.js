import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Alert } from 'react-native'
import CoinDropDownPicker from './CoinDropDownPicker';
import NumberInput from '../../../Common/Input/NumberInput';
import axios from 'axios';

const AddUserCoinModal = (prop) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [coinDropDownValue, setCoinDropDownValue] = useState(null);
    const [buyPrice, setBuyPrice] = useState('');
    const [buyAmount, setBuyAmount] = useState('');
    const [isModelReady, setModelReady] = useState(false);
    const [postModel, setPostModel] = useState({
        CoinBuyPrice: 0,
        CoinBuyAmount: 0,
        CoinCode: ''

    });

    const requestOptions = {
        method: 'POST',
        uri: 'https://varlikappapi20211125195005.azurewebsites.net',
        qs: {
        },
        headers: {
            'Authorization': 'Bearer ' + prop.userToken
        }
    };

    const postUserCoin = async (request) => {
        try {
            const response = await axios.post(requestOptions.uri + '/api/usercoin/addusercoin', request, {
                headers: requestOptions.headers
            }).then(() => {
                AlertUser('Coin Added Successfuly !', 'Coind added to your account wallet successfuly !');
            });
        } catch (error) {
            console.log(error);
        }
    }

    function AlertUser(header, message) {
        Alert.alert(
            header,
            message,
            [
                {
                    text: 'Okay',
                    onPress: () => {
                        console.log("Ok pressed");
                    },
                    style: 'cancel'
                }
            ]
        );
    }

    function addUserCoinButtonOnClick() {

        if (buyPrice <= 0 || buyPrice == '' || buyPrice == null) {
            AlertUser('Buy Price Not Valid', 'Buy price can\'t be less than or equal to zero.');
        }
        else if (buyAmount <= 0 || buyAmount == '' || buyAmount == null) {
            AlertUser('Buy Amount Not Valid', 'Buy amount can\'t be less than or equal to zero.');
        }
        else if (coinDropDownValue == '' || coinDropDownValue == null) {
            AlertUser('Coin Is Not Selected', 'Please select a coin to add.');
        }
        else {
            console.log(coinDropDownValue + ' - ' + buyAmount + ' - ' + buyPrice);
            setPostModel({ ...postModel, CoinBuyAmount: buyAmount, CoinBuyPrice: buyPrice, CoinCode: coinDropDownValue });
            setModelReady(true);


        }
    }

    useEffect(() => {
        if (isModelReady) {
            postUserCoin(postModel);
            setModelReady(false);
            prop.setIsNeedReload(true);
        }
    }, [postModel]);

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Coin</Text>
                        <View style={styles.inputContainer}>
                            <CoinDropDownPicker value={coinDropDownValue} setValue={setCoinDropDownValue} />
                            <NumberInput state={buyAmount} setState={setBuyAmount} placeholder='Amount' />
                            <NumberInput state={buyPrice} setState={setBuyPrice} placeholder='Price' />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={addUserCoinButtonOnClick}
                            >
                                <Text style={styles.textStyle}>Add</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Add Stock</Text>
            </Pressable>
        </View>
    )
}

export default AddUserCoinModal

const styles = StyleSheet.create({
    container: {
        marginVertical: 15
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 35,
        paddingVertical: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%'
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: '40%'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    buttonContainer: {
        width: '80%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        zIndex: -1
    },
    inputContainer: {
        marginBottom: 20
    }
})
