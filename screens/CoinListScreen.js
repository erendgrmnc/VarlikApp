import React, { useState, useEffect } from "react";

import { Text, StyleSheet, View, ScrollView, TextInput } from "react-native";
import CoinScrollView from "../components/CryptoCoin/CoinScrollView";
import axios from "axios";

const requestOptions = {
  method: "GET",
  uri: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
  qs: {
    start: "1",
    limit: "100",
    convert: "USD",
  },
  headers: {
    "X-CMC_PRO_API_KEY": "d4b395ea-56aa-48d4-8111-7593747b34f7",
  },
  json: true,
  gzip: true,
};

let queryString =
  "?start=" +
  requestOptions.qs.start +
  "&limit=" +
  requestOptions.qs.limit +
  "&convert=" +
  requestOptions.qs.convert;

function MapCoinList(coinList) {
  let returnList = [];

  coinList.forEach((coin, index) => {
    returnList.push({ coin: coin, key: index });
  });
  return returnList;
}

const CoinListScreen = (props) => {
  const [coins, setCoins] = useState({
    list: [],
  });

  const [filteredCoins, setFilteredCoins] = useState({
    list: [],
  });

  const [searchStr, setSearchStr] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest" +
          queryString,
        {
          headers: requestOptions.headers,
        }
      );
      setCoins((prevState) => {
        //console.log(Object.values(response.data));
        return {
          ...prevState,
          list: MapCoinList(Object.values(response.data.data)),
        };
      });
      console.log(coins.list[0].coin.id, "idddd");
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
      //   coins.list.map((item) => {
      //     console.log(item.id);
      //   });
      setFilteredCoins((prevState) => {
        return {
          list: coins.list.filter(
            (item) =>
              String(item.coin.symbol)
                .toLowerCase()
                .includes(searchStr.toLowerCase()) ||
              String(item.coin.name)
                .toLowerCase()
                .includes(searchStr.toLowerCase())
          ),
        };
      });
    }
  }, [searchStr]);

  if (coins != undefined && coins.list != undefined && coins.list != null) {
    return (
      <View style={styles.container}>
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
            }}
            onChangeText={(e) => setSearchStr(e)}
            value={searchStr}
          ></TextInput>
        </View>
        <CoinScrollView
          coinList={searchStr != "" ? filteredCoins.list : coins.list}
        />
        {console.log(filteredCoins.list)}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: "red",
    textAlign: "center",
  },
});

export default CoinListScreen;
