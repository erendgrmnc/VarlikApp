import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AddUserCoinModal from "./UserCoin/AddUserCoin/AddUserCoinModal";
import UserCoinScrollView from "./UserCoin/UserCoinScrollView";

function MapCoinList(coins) {
  var coinList = [];
  coins.forEach((coin, index) => {
    coinList.push({ coin: coin, key: index });
  });
  return coinList;
}

let isDataFetched = false;

const UserCoins = (prop) => {
  const requestOptions = {
    method: "GET",
    uri: "https://varlikappapi.azurewebsites.net",
    qs: {},
    headers: {
      Authorization: "Bearer " + prop.userToken,
    },
  };

  const currentRequestOptions = {
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
    currentRequestOptions.qs.start +
    "&limit=" +
    currentRequestOptions.qs.limit +
    "&convert=" +
    currentRequestOptions.qs.convert;

  const [isReloadNeeded, setIsReloadNeeded] = useState(false);
  const [userCoins, setuserCoins] = useState([]);
  const [currentCoinList, setCurrentCoinList] = useState([]);

  function MapCoinListWithCurrentValues(coins) {
    var returnList = [];
    coins.forEach((coin, index) => {
      var currentCoinObj = {};
      let isCoinMatched = false;
      currentCoinList.forEach((currentCoin) => {
        if (currentCoin.coin.symbol == coin.coinCode) {
          currentCoinObj = currentCoin.coin;
          isCoinMatched = true;
        }
      });
      if (isCoinMatched) {
        returnList.push({
          coin: coin,
          key: index,
          currentCoin: currentCoinObj,
        });
      }
    });
    return returnList;
  }

  const fetchData = async () => {
    try {
      const currentResponse = await axios.get(
        currentRequestOptions.uri + queryString,
        {
          headers: currentRequestOptions.headers,
        }
      );
      setCurrentCoinList(MapCoinList(Object.values(currentResponse.data.data)));
      isDataFetched = true;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (prop.userToken) {
      axios.get(
        requestOptions.uri + "/api/usercoin/getusercoins",
        {
          headers: requestOptions.headers,
        }
      ).then(response => {
        setuserCoins(
          MapCoinListWithCurrentValues(Object.values(response.data.userCoins))
        );
      })
    }
  }, [currentCoinList])

  if (prop.userToken != null && prop.userToken != "") {
    if ((!isDataFetched || userCoins.length != 0) && !isDataFetched) {
      fetchData();
      isDataFetched = true;
    }
  }
  useEffect(() => {
    if (isReloadNeeded) {
      fetchData();
      setIsReloadNeeded(false);
    }
  }, [isReloadNeeded]);

  useEffect(() => {
    if (prop.setIsReloadNeeded) {
      fetchData();
      prop.setIsReloadNeeded(false);
    }
  }, [prop.isReloadNeeded])

  if (prop.userToken != null && prop.userToken != "") {
    if (userCoins.length != 0) {
      return (
        <View style={styles.container}>
          <AddUserCoinModal
            userToken={prop.userToken}
            isReloadNeeded={isReloadNeeded}
            setIsNeedReloaded={setIsReloadNeeded}
          />
          <UserCoinScrollView userToken={prop.userToken} setIsReloadNeeded={prop.setIsReloadNeeded} userCoins={userCoins} />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <AddUserCoinModal
            userToken={prop.userToken}
            isReloadNeeded={isReloadNeeded}
            setIsNeedReloaded={setIsReloadNeeded}
          />
        </View>
      );
    }
  } else {
    return (
      <View>
        <Text>Y??kleniyor...</Text>
      </View>
    );
  }
};

export default UserCoins;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
