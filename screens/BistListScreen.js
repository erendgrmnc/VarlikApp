import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import StockScrollView from "../components/Stock/StockScrollView";

const requestOptions = {
  method: "GET",
  uri: "https://api.collectapi.com/economy/hisseSenedi",
  qs: {},
  headers: {
    authorization: "apikey 3j8qfyerTKck605SawH3GY:5TEixjJ9qMFJMwms4FaXhN",
    "content-type": "application/json",
  },
};
function MapStockList(stocks, symbols) {
  var stockList = [];
  stocks.forEach((stock, index) => {
    stockList.push({ stock: stock, key: index });
    stockList[index].stock.symbol = symbols[index];
  });


  return stockList;
}

const BistListScreen = (prop) => {
  const [stocks, setStock] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [filteredStocks, setFilteredStocks] = useState();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.genelpara.com/embed/borsa.json",
        {
          headers: requestOptions.headers,
        }
      );
      setStock(
        MapStockList(Object.values(response.data), Object.keys(response.data))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    });
  }, []);

  useEffect(() => {
    if (searchStr != null || searchStr != "") {
      const tempList = [];
      setFilteredStocks(
        stocks.filter((item) =>
          String(item.stock.symbol)
            .toLowerCase()
            .includes(searchStr.toLowerCase())
        )
      );
    }
  }, [searchStr]);

  return (
    <View>
      <View
        style={{
          width: "100%",
          backgroundColor: "black",
          marginVertical: 10,
          borderColor: "black",
          borderWidth: 5,
        }}
      >
        <TextInput
          style={{
            width: "100%",
            height: 28,
            borderWidth: 2,
            borderRadius: 7,
            borderColor: "white",
            backgroundColor: "white",
            paddingHorizontal: 10,
          }}
          placeholder={"Ara..."}
          onChangeText={(e) => setSearchStr(e)}
          value={searchStr}
        ></TextInput>
      </View>
      <StockScrollView
        stockList={
          searchStr == null || searchStr == "" ? stocks : filteredStocks
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BistListScreen;
