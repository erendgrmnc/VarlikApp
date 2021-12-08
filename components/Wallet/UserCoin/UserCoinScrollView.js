import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import UserCoinContainer from "./UserCoinContainer";

const UserCoinScrollView = (prop) => {
  const listCoins = prop.userCoins.map((coinObj, index) => {
    return (
      <View key={index}>
        <UserCoinContainer
          coin={coinObj.coin}
          currentCoin={coinObj.currentCoin}
        />
      </View>
    );
  });
  return <ScrollView nestedScrollEnabled={true}>{listCoins}</ScrollView>;
};

export default UserCoinScrollView;

const styles = StyleSheet.create({});
