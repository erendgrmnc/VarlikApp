import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import UserStockScrollView from "./UserStock/UserStockScrollView";
import AddUserStockModal from "./UserStock/AddUserStock/AddUserStockModal";

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
        if (currentStock.stock.symbol == stock.stockCode) {
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
    uri: "https://varlikappapi.azurewebsites.net",
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


    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (prop.userToken) {
      axios.get(
        requestOptions.uri + "/api/userstock/getuserstocks",
        {
          headers: requestOptions.headers,
        }
      ).then(response => {
        setUserStocks(
          MapStockListWithCurrentValues(Object.values(response.data.userStocks))
        );
      })
    }
  }, [currentStockList])

  if (prop.userToken != null && prop.userToken != "") {
    if ((!isDataFetched || userStocks.length == 0) && !isDataFetched) {
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

  useEffect(() => {
    if (prop.setIsReloadNeeded) {
      fetchData();
      prop.setIsReloadNeeded(false);
    }
  }, [prop.isReloadNeeded])

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
