import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  TouchableOpacity,
} from "react-native";
import CoinDropDownPicker from "./CoinDropDownPicker";
import NumberInput from "../../../Common/Input/NumberInput";
import axios from "axios";

const AddUserCoinModal = (prop) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [coinDropDownValue, setCoinDropDownValue] = useState(null);
  const [buyPrice, setBuyPrice] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isModelReady, setModelReady] = useState(false);
  const [postModel, setPostModel] = useState({
    CoinBuyPrice: 0,
    CoinBuyAmount: 0,
    CoinCode: "",
  });

  const requestOptions = {
    method: "POST",
    uri: "https://varlikappapi.azurewebsites.net",
    qs: {},
    headers: {
      Authorization: "Bearer " + prop.userToken,
    },
  };

  const postUserCoin = async (request) => {
    try {
      const response = await axios
        .post(requestOptions.uri + "/api/usercoin/addusercoin", request, {
          headers: requestOptions.headers,
        })
        .then(() => {
          AlertUser(
            "Kripto Para Başarıyla Eklendi !",
            "Kripto Para Hesap Cüzdanınıza Başarıyla Eklendi !"
          );
          setModalVisible(!modalVisible);
        });
    } catch (error) {
      console.log(error);
    }
  };

  function AlertUser(header, message) {
    Alert.alert(header, message, [
      {
        text: "Tamam",
        onPress: () => {
        },
        style: "cancel",
      },
    ]);
  }

  function addUserCoinButtonOnClick() {
    if (coinDropDownValue == "" || coinDropDownValue == null) {
      AlertUser(
        "Kripto para seçilmedi",
        "Lütfen eklemek için kripto para seçin."
      );
    } else if (buyAmount <= 0 || buyAmount == "" || buyAmount == null) {
      AlertUser(
        "Satın alma tutarı geçersiz",
        "Satın alma tutarı sıfırdan küçük veya sıfıra eşit olamaz."
      );
    } else if (buyPrice <= 0 || buyPrice == "" || buyPrice == null) {
      AlertUser(
        "Satın alma fiyatı geçerli değil",
        "Alış fiyatı sıfırdan küçük veya sıfıra eşit olamaz."
      );
    } else {
      setPostModel({
        ...postModel,
        CoinBuyAmount: buyAmount,
        CoinBuyPrice: buyPrice,
        CoinCode: coinDropDownValue,
      });
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
            <Text style={styles.modalText}>Kripto Para Ekle</Text>
            <View style={styles.inputContainer}>
              <CoinDropDownPicker
                value={coinDropDownValue}
                setValue={setCoinDropDownValue}
              />
              <NumberInput
                state={buyAmount}
                setState={setBuyAmount}
                placeholder="Miktar"
              />
              <NumberInput
                state={buyPrice}
                setState={setBuyPrice}
                placeholder="Fiyat"
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonAdd]}
                onPress={addUserCoinButtonOnClick}
              >
                <Text style={styles.textStyle}>Ekle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Kripto Para Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddUserCoinModal;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  button: {
    borderRadius: 7,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  buttonOpen: {
    width: "50%",
    backgroundColor: "#239B56",
    zIndex: -1,
    elevation: -1
  },
  buttonClose: {
    backgroundColor: "#FA694A",
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    marginTop: 5,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: -1,
    elevation: -2,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
