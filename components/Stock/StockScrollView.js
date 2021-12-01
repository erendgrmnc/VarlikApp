import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";
import StockContainer from "./StockContainer";

const StockScrollView = (prop) => {
  const listStocks = prop.stockList.map((stockObj, index) => {
    return (
      <View key={index}>
        <StockContainer
          mainTextStyle={prop.mainTextStyle}
          pricesTextStyle={prop.pricesTextStyle}
          stock={stockObj.stock}
        />
      </View>
    );
  });

  return <ScrollView style={prop.style}>{listStocks}</ScrollView>;
};

const styles = StyleSheet.create({
  mainTextStyle: {
    fontSize: 13,
  },
  pricesTextStyle: {
    fontSize: 12,
  },
});

export default StockScrollView;
