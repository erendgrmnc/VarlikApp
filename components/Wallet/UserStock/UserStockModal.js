import React from "react";
import { StyleSheet, Text, View, Modal, Pressable } from "react-native";

const customModal = () => {
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
        <Dataline text="Current Price:" data={prop.stock.alis + "$"}></Dataline>
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
          <Text style={styles.closeButtonText}>Kapat</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>;
};

const UserStockModal = (prop) => {
  return (
    <Modal
      presentationStyle="pageSheet"
      visible={prop.modalVisible}
      onRequestClose={() => this.setImageViewerVisible(false)}
      style={styles.modalContainer}
    >
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
        <View style={styles.bodyContainer}>
          <Text>{prop.currentStock.text}</Text>
          <Text>{prop.stock.stockCode}</Text>
        </View>

        <View style={styles.bottomContainer}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => prop.setModalVisible(!prop.modalVisible)}
          >
            <Text style={styles.closeButtonText}>Kapat</Text>
          </Pressable>
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
