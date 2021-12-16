import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import StockDropDownPicker from "./StockDropDownPicker";
import NumberInput from "../../../Common/Input/NumberInput";
import axios from "axios";
const AddUserStockModal = (prop) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [stockDropDownValue, setStockDropDownValue] = useState(null);
  const [buyPrice, setBuyPrice] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isModelReady, setModelReady] = useState(false);
  const [postModel, setPostModel] = useState({
    StockBuyPrice: 0,
    StockAmount: 0,
    StockCode: "",
  });

  const requestOptions = {
    method: "POST",
    uri: "https://varlikappapi20211125195005.azurewebsites.net",
    qs: {},
    headers: {
      Authorization: "Bearer " + prop.userToken,
    },
  };

  const postUserStock = async (request) => {
    try {
      console.log(request);
      const response = await axios
        .post(requestOptions.uri + "/api/userstock/adduserstock", request, {
          headers: requestOptions.headers,
        })
        .then(() => {
          AlertUser(
            "Hisse Senedi Başarıyla Eklendi !",
            "Hisse senedi başarıyla hesap cüzdanınıza eklendi !"
          );
        });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  function AlertUser(header, message) {
    Alert.alert(header, message, [
      {
        text: "Tamam",
        onPress: () => {
          console.log("Ok pressed");
        },
        style: "cancel",
      },
    ]);
  }

  function addUserStockButtonOnClick() {
    if (buyPrice <= 0 || buyPrice == "" || buyPrice == null) {
      AlertUser(
        "Satın Alma Fiyatı Geçerli Değil",
        "Alış fiyatı sıfırdan küçük veya sıfıra eşit olamaz."
      );
    } else if (buyAmount <= 0 || buyAmount == "" || buyAmount == null) {
      AlertUser(
        "Satın Alma Tutarı Geçersiz",
        "Satın alma tutarı sıfırdan küçük veya sıfıra eşit olamaz."
      );
    } else if (stockDropDownValue == "" || stockDropDownValue == null) {
      AlertUser("Hisse Senedi Seçilmedi", "Lütfen eklemek için bir hisse senedi seçin.");
    } else {
      console.log(stockDropDownValue + " - " + buyAmount + " - " + buyPrice);
      setPostModel({
        ...postModel,
        StockAmount: buyAmount,
        StockBuyPrice: buyPrice,
        StockCode: stockDropDownValue,
      });
      setModelReady(true);
    }
  }

  useEffect(() => {
    if (isModelReady) {
      postUserStock(postModel);
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
            <Text style={styles.modalText}>Hisse Senedi Ekle</Text>
            <View style={styles.inputContainer}>
              <StockDropDownPicker
                value={stockDropDownValue}
                setValue={setStockDropDownValue}
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
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={addUserStockButtonOnClick}
              >
                <Text style={styles.textStyle}>Ekle</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Kapat</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ alignItems: "center" }}>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Hisse Senedi Ekle</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AddUserStockModal;

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
    elevation: 2,
    width: "40%",
  },
  buttonOpen: {
    backgroundColor: "#239B56",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    flexDirection: "row",
    zIndex: -1,
  },
  inputContainer: {
    marginBottom: 20,
  },
});
