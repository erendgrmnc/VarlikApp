import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, Pressable, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
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

const Dataline = ({ text, data, style }) => (
  <View
    style={{
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 30,
      marginTop: 10,
    }}
  >
    <Text style={{ fontWeight: "600", fontSize: 15, color: "#F0F3F4" }}>
      {text}
    </Text>
    <Text
      style={[{ fontWeight: "400", fontSize: 15, color: "#F0F3F4" }, style]}
    >
      {data}
    </Text>
  </View>
);

const UserStockModal = (prop) => {

  const [isModelReady, setModelReady] = useState(false);
  const [postModel, setPostModel] = useState({
    UserStockID: 0
  });

  const requestOptions = {
    method: "POST",
    uri: "https://varlikappapi.azurewebsites.net/api/userstock/deleteuserstock",
    qs: {},
    headers: {
      Authorization: "Bearer " + prop.userToken,
    },
  };

  const deleteUserStock = async (request) => {
    try {
      await axios
        .post(requestOptions.uri, request, {
          headers: requestOptions.headers,
        }).then(response => {
          if (response.data.isSuccess) {
            AlertUser(
              "Hisse Başarıyla Silindi !",
              "Hisse Hesap Cüzdanınızdan Başarıyla Silindi !"
            );
          }

        });
    } catch (error) {
      console.log(error);
    }
  }
  function deleteButtonOnClick() {

    setPostModel({
      ...postModel,
      UserStockID: prop.stock.userStockID
    });
    setModelReady(true);

  }

  useEffect(() => {
    if (isModelReady) {
      deleteUserStock(postModel);
      setModelReady(false);
      prop.setIsReloadNeeded(true);
    }
  }, [postModel]);

  const [profitLoss, setProfitLoss] = useState(
    parseFloat(prop.currentStock.alis) >=
    parseFloat(prop.stock.stockBuyPrice)
  );

  const textLength = 15;

  return (
    <Modal visible={prop.modalVisible} transparent animationType="slide">
      <View
        style={{
          paddingTop: 30,
          flex: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 500,
          backgroundColor: "#808B96",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.36,
          shadowRadius: 6.68,

          elevation: 11,
        }}
      >
        <View style={styles.headerContainer}></View>
        <View
          style={{
            paddingVertical: 10,
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#D5DBDB",
              borderRadius: 7,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.36,
              shadowRadius: 6.68,

              elevation: 11,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 23,
                padding: 15,
                paddingHorizontal: 30,
              }}
            >
              {prop.stock.stockCode.substring(0, textLength) +
                (prop.stock.stockCode.length > textLength ? "..." : "")}{" "}
              ({prop.stock.stockCode})
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 20,
            marginTop: 30,
          }}
        >
          <Dataline text="Şimdiki Fiyat:" data={prop.currentStock.alis + "₺"}></Dataline>
          <Dataline
            text="Satın Alınan Fiyat:"
            data={prop.stock.stockBuyPrice + "₺"}
          ></Dataline>

          <Dataline text="Miktar:" data={prop.stock.stockAmount}></Dataline>

          <Dataline
            text="Kar/Zarar Yüzdesi:"
            style={profitLoss ? styles.profitText : styles.lossText}
            data={
              (profitLoss ? "+" : "") +
              (
                ((parseFloat(prop.currentStock.alis) - parseFloat(prop.stock.stockBuyPrice)) * 100) /
                parseFloat(prop.stock.stockBuyPrice)
              ).toFixed(3) +
              "%"
            }
          ></Dataline>

          <Dataline
            text="Kar/Zarar Miktarı:"
            style={profitLoss ? styles.profitText : styles.lossText}
            data={
              (profitLoss ? "+" : "") +
              ((parseFloat(prop.currentStock.alis) -
                parseFloat(prop.stock.stockBuyPrice)) *
                parseFloat(prop.stock.stockAmount)).toFixed(2) +
              "₺"
            }
          ></Dataline>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose, { marginBottom: 5, backgroundColor: 'red' }]}
            onPress={deleteButtonOnClick}
          >
            <Text style={styles.closeButtonText}>Sil</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => prop.setModalVisible(!prop.modalVisible)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserStockModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "black",
    height: 100,
  },
  bottomContainer: {
    position: "absolute",
    flex: 1,
    bottom: 0,
    width: "100%",
    padding: 25,
  },
  buttonClose: {
    flex: 1,
    width: "100%",
    backgroundColor: "#ccc",
    height: "100%",
    textAlign: "center",
    padding: 10,
    borderRadius: 7,
  },
  closeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 17,
  },
  profitText: {
    color: "#58D68D",
  },
  lossText: {
    color: "#C0392B",
  },
});
