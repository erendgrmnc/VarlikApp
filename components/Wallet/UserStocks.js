import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import UserStockScrollView from "./UserStock/UserStockScrollView";
import AddUserStockModal from "./UserStock/AddUserStock/AddUserStockModal";
import { cos } from "react-native-reanimated";

let isDataFetched = false;

const UserStocks = (prop) => {
  const [isNeedReload, setIsNeedReload] = useState(false);
  const [userStocks, setUserStocks] = useState([]);
  const [currentStockList, setCurrentStockList] = useState([]);

  function MapStockList(stocks, symbols) {
    var stockList = [];
    stocks.forEach((stock, index) => {
      stockList.push({ stock: stock, key: index });
      stockList[index].stock.symbol = symbols[index];
    });

    // console.log(stockList[0]);
    return stockList;
  }
  function MapStockListWithCurrentValues(stocks) {
    var returnList = [];
    stocks.forEach((stock, index) => {
      var currentStockObj = {};
      let isStockMatched = false;
      currentStockList.forEach((currentStock) => {
        if (currentStock.stock.code == stock.symbol) {
          currentStockObj = currentStock.stock;
          isStockMatched = true;
        }
      });
      if (isStockMatched) {
        returnList.push({
          stock: stock,
          key: index,
          currentStock: currentStockObj,
        });
      }
    });
    return returnList;
  }

  const requestOptions = {
    method: "GET",
    uri: "https://192.168.1.36:5001",
    qs: {},
    headers: {
      Authorization: "Bearer " + prop.userToken,
    },
  };

  const currentStocksRequestOptions = {
    method: "GET",
    uri: "https://api.genelpara.com/embed/borsa.json",
    qs: {},
    headers: {},
  };

  const fetchData = async () => {
    try {
      const currentStocksResponse = await axios.get(
        currentStocksRequestOptions.uri,
        {
          headers: currentStocksRequestOptions.headers,
        }
      );

      // console.log(stockSymbols);
      setCurrentStockList(
        MapStockList(
          Object.values(currentStocksResponse.data),
          Object.keys(currentStocksResponse.data)
        )
      );

      const response = await axios.get(
        requestOptions.uri + "/api/userstock/getuserstocks",
        {
          headers: requestOptions.headers,
        }
      );
      setUserStocks(
        MapStockListWithCurrentValues(Object.values(response.data.userStocks))
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (prop.userToken != null && prop.userToken != "") {
    if (!isDataFetched || userStocks.length == 0) {
      isDataFetched = true;
      fetchData();
    }
  }

  useEffect(() => {
    if (isNeedReload) {
      fetchData();
      setIsNeedReload(false);
    }
  }, [isNeedReload]);

  if (prop.userToken != null && prop.userToken != "") {
    if (userStocks.length != 0) {
      return (
        <View style={styles.container}>
          <AddUserStockModal
            userToken={prop.userToken}
            setIsNeedReload={setIsNeedReload}
          />
          <UserStockScrollView userStocks={userStocks} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <AddUserStockModal
            userToken={prop.userToken}
            setIsNeedReload={setIsNeedReload}
          />
        </View>
      );
    }
  } else {
    return (
      <View>
        <Text>Yükleniyor</Text>
      </View>
    );
  }
};

export default UserStocks;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
