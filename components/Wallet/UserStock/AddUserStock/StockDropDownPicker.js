import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Directions } from "react-native-gesture-handler";
import axios from "axios";

const requestOptions = {
  method: "GET",
  uri: "https://api.genelpara.com/embed/borsa.json",
  qs: {},
  headers: {},
};

function MapStockList(stocks) {
  var stockList = [];
  stocks.forEach((stock, index) => {
    stockList.push({
      label: stock,
      value: stock,
    });
  });

  return stockList;
}

const StockDropDownPicker = (prop) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Yükleniyor, Lütfen Bekleyin", value: '' }
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.genelpara.com/embed/borsa.json",
        {
          headers: requestOptions.headers,
        }
      );
      setItems(MapStockList(Object.keys(response.data)));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    });
  }, []);

  return (
    <DropDownPicker
      style={styles.container}
      open={open}
      value={prop.value}
      items={items}
      setOpen={setOpen}
      setValue={prop.setValue}
      setItems={setItems}
      defaultIndex={0}
      containerStyle={{ height: 40 }}
      onChangeItem={(item) => console.log(item.label, item.value)}
      dropDownDirection={Directions.DOWN}
    />
  );
};

export default StockDropDownPicker;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 1000,
  },
});
