import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Directions } from 'react-native-gesture-handler';
import axios from 'axios';

const requestOptions = {
    method: 'GET',
    uri: 'https://api.collectapi.com/economy/hisseSenedi',
    qs: {
    },
    headers: {
        'authorization': 'apikey 6nUsALAn7YcKAnekBSZfRX:0PYnZi1Sf7k2ibIS2PE7mI',
        'content-type': 'application/json'
    }
};

function MapStockList(stocks) {
    var stockList = [];
    stocks.forEach((stock, index) => {
        stockList.push({ label: stock.text + '(' + stock.code + ')', value: stock.code });
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
            const response = await axios.get('https://api.collectapi.com/economy/hisseSenedi', {
                headers: requestOptions.headers
            });
            setItems(MapStockList(Object.values(response.data.result)));
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        })
    }, [])

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
            onChangeItem={item => console.log(item.label, item.value)}
            dropDownDirection={Directions.DOWN}
        />
    )
}

export default StockDropDownPicker

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 1000
    }
})
