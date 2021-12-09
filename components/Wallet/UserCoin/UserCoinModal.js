import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
} from "react-native";

const UserCoinModal = (prop) => {
  const [profitLoss, setProfitLoss] = useState(
    parseInt(prop.currentCoin.quote.USD.price) >
      parseInt(prop.coin.coinBuyPrice)
  );

  const textLength = 15;

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
              {prop.currentCoin.name.substring(0, textLength) +
                (prop.currentCoin.name.length > textLength ? "..." : "")}{" "}
              ({prop.coin.coinCode})
            </Text>
          </View>
        </View>

        <View
          style={{
            paddingVertical: 20,
            marginTop: 30,
          }}
        >
          <Dataline
            text="Current Price:"
            data={prop.currentCoin.quote.USD.price + "$"}
          ></Dataline>
          <Dataline
            text="Buying Price:"
            data={prop.coin.coinBuyPrice + "$"}
          ></Dataline>

          <Dataline text="Amount:" data={prop.coin.coinBuyAmount}></Dataline>

          <Dataline
            text="P/L Percentage:"
            style={profitLoss ? styles.profitText : styles.lossText}
            data={
              (profitLoss ? "+" : "-") +
              (
                (parseInt(prop.currentCoin.quote.USD.price) * 100) /
                parseInt(prop.coin.coinBuyPrice)
              ).toFixed(3) +
              "%"
            }
          ></Dataline>

          <Dataline
            text="P/L Amount:"
            style={profitLoss ? styles.profitText : styles.lossText}
            data={
              (profitLoss ? "+" : "") +
              (parseInt(prop.currentCoin.quote.USD.price) -
                parseInt(prop.coin.coinBuyPrice) *
                  parseInt(prop.coin.coinBuyAmount)) +
              "$"
            }
          ></Dataline>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={() => prop.setModalVisible(!prop.modalVisible)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserCoinModal;

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
