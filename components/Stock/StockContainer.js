import React from "react";
import { Text, View, StyleSheet } from "react-native";

const GetPercentageText = (percent, priceStyle) => {
  if (percent > 0) {
    return (
      <Text style={[styles.positivePercentText, priceStyle]}>{percent}</Text>
    );
  } else if (percent < 0) {
    return (
      <Text style={[styles.negativePercentText, priceStyle]}>{percent}</Text>
    );
  } else {
    return <Text>{percent}</Text>;
  }
};

const StockContainer = (prop) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={prop.mainTextStyle}>
          {prop.stock.text}({prop.stock.code})
        </Text>
      </View>
      <View style={styles.pricesContainer}>
        <View>
          <Text style={prop.pricesTextStyle}>{prop.stock.lastprice} ₺</Text>
        </View>
        <View>{GetPercentageText(prop.stock.rate, prop.pricesTextStyle)}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 5,
    paddingVertical: 5,
    paddingHorizontal: 3,
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
});

export default StockContainer;
