import React, { useState, useEffect } from 'react';

import { Text, StyleSheet, View, ScrollView } from 'react-native';
import CoinScrollView from '../components/CryptoCoin/CoinScrollView'
import axios from 'axios';


const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
        'start': '1',
        'limit': '100',
        'convert': 'USD'
    },
    headers: {
        'X-CMC_PRO_API_KEY': 'd4b395ea-56aa-48d4-8111-7593747b34f7'
    },
    json: true,
    gzip: true
};

let queryString = '?start=' + requestOptions.qs.start + '&limit=' + requestOptions.qs.limit + '&convert=' + requestOptions.qs.convert;

function MapCoinList(coinList) {
    let returnList = [];

    coinList.forEach((coin, index) => {
        returnList.push({ coin: coin, key: index });
    });
    return returnList;
}

const CoinListScreen = (props) => {

    const [coins, setCoins] = useState({
        list: []
    });


    const fetchData = async () => {
        try {
            const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest' + queryString, {
                headers: requestOptions.headers
            });
            setCoins(prevState => {
                //console.log(Object.values(response.data));
                return { ...prevState, list: MapCoinList(Object.values(response.data.data)) }
            });
            console.log(coins.list[0]);
        }
        catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        setTimeout(() => {
            fetchData()
        })
    }, [])




    if (coins != undefined && coins.list != undefined && coins.list != null) {
        return (
            <View style={styles.container}>
                <CoinScrollView coinList={coins.list} />
            </View>
        );
    }

    else {
        return (
            <View style={styles.container}>
                <Text>Yükleniyor</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    },
    text: {
        color: 'red',
        textAlign: 'center'
    }
})

export default CoinListScreen;