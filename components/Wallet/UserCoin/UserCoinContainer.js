import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import UserCoinModal from "./UserCoinModal";

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
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {prop.coin.coinCode}
            </Text>
          </View>
          <View style={styles.pricesContainer}>
            <View>
              <Text>Alış Fiyatı: {prop.coin.coinBuyPrice} $</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text>Adet: </Text>
              <Text>{prop.coin.coinBuyAmount}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ width: "100%", height: 2, backgroundColor: "#99A3A4" }} />
      <UserCoinModal
        userToken={prop.userToken}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        coin={prop.coin}
        currentCoin={prop.currentCoin}
        setIsReloadNeeded={prop.setIsReloadNeeded}
      />
    </View>
  );
};

export default UserCoinContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 5,
    justifyContent: "space-between",
    alignItems: "center",
    alignContent: "space-between",
  },
  positivePercentText: {
    color: "green",
  },
  negativePercentText: {
    color: "red",
  },
  pricesContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  rowContainer: {
    flexDirection: "row",
  },
});
