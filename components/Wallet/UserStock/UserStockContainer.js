import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import UserStockModal from "./UserStockModal";
const GetPercentageText = (percent) => {
  if (percent > 0) {
    return <Text style={styles.positivePercentText}>{percent}</Text>;
  } else if (percent < 0) {
    return <Text style={styles.negativePercentText}>{percent}</Text>;
  } else {
    return <Text>{percent}</Text>;
  }
};
const UserStockContainer = (prop) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <View style={styles.mainContainer}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{prop.stock.stockCode}</Text>
            </View>
            <View style={styles.pricesContainer}>
              <View>
                <Text>Alış Fiyatı: {prop.stock.stockBuyPrice} ₺</Text>
              </View>
              <View style={styles.rowContainer}>
                <Text>Adet: </Text>
                <Text>{prop.stock.stockAmount}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <UserStockModal
          userToken={prop.userToken}
          setIsReloadNeeded={prop.setIsReloadNeeded}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          stock={prop.stock}
          currentStock={prop.currentStock}
        />
      </View>
      <View style={{ width: "100%", height: 2, backgroundColor: "#99A3A4" }} />
    </>
  );
};

export default UserStockContainer;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
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
