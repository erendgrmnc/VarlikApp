import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';
import StockScrollView from '../components/Stock/StockScrollView';

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
        stockList.push({ stock: stock, key: index });
    });

    return stockList;
}



const BistListScreen = (prop) => {

    const [stocks, setStock] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get('https://api.collectapi.com/economy/hisseSenedi', {
                headers: requestOptions.headers
            });
            setStock(MapStockList(Object.values(response.data.result)));
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
        <View>
            <StockScrollView stockList={stocks} />
        </View>
    );
}

const styles = StyleSheet.create({

})

export default BistListScreen;