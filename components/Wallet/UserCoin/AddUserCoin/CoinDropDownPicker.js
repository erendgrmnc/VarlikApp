import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import { Directions } from 'react-native-gesture-handler';
import axios from 'axios';

const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start': '1',
        'limit': '10',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'd4b395ea-56aa-48d4-8111-7593747b34f7'
    }
};

function MapCoinList(coins) {
    var coinList = [];
    coins.forEach((coin, index) => {
        if (index != undefined) {
            coinList.push({ label: coin.name + '(' + coin.symbol + ')', value: coin.symbol, key: index });
        }
    });
    return coinList;
}

const CoinDropDownPicker = (prop) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: "Loading, Please Wait", value: '' }
    ])
    let queryString = '?start=' + requestOptions.qs.start + '&limit=' + requestOptions.qs.limit + '&convert=' + requestOptions.qs.convert;

    const fetchData = async () => {
        try {
            const response = await axios.get(requestOptions.uri + queryString, {
                headers: requestOptions.headers
            });
            setItems(MapCoinList(Object.values(response.data.data)))
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData();
        })
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
            onChangeItem={item => console.log(item.label, item.value)}
            dropDownDirection={Directions.DOWN}
        />
    )
}

export default CoinDropDownPicker

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 1000
    }
})
