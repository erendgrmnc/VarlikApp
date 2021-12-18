import React from "react";
import { Text, View, StyleSheet } from "react-native";

const GetPercentageText = (percent) => {
  if (percent > 0) {
    return <Text style={styles.positivePercentText}>{percent}</Text>;
  } else if (percent < 0) {
    return <Text style={styles.negativePercentText}>{percent}</Text>;
  } else {
    return <Text>{percent}</Text>;
  }
};

const StockContainer = (prop) => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.symbolContainer}>
          <Text style={styles.symbolText}>{prop.stock.symbol}</Text>
        </View>
        <View style={styles.pricesContainer}>
          <View>
            <Text style={styles.negativePercentText}>{prop.stock.satis}₺</Text>
            <Text style={styles.positivePercentText}>{prop.stock.alis}₺</Text>
          </View>
          <View>
            <Text
              style={
                parseInt(prop.stock.degisim) < 0
                  ? styles.negativePercentText
                  : styles.positivePercentText
              }
            >
              {parseInt(prop.stock.degisim) < 0 ? "" : "+"}
              {GetPercentageText(prop.stock.degisim)}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{ width: "100%", height: 1, backgroundColor: "#99A3A4" }} />
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingVertical: 6,
    paddingHorizontal: 15,
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
  symbolContainer: {
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
  },
  symbolText: {
    textAlignVertical: "center",
    fontWeight: "bold",
  },
});

export default StockContainer;
