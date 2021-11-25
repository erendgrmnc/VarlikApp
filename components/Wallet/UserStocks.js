import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth, getUserToken } from '../../firebase'
import axios from 'axios'
import UserStockScrollView from './UserStock/UserStockScrollView'

const requestOptions = {
    method: 'GET',
    uri: 'https://localhost:44306',
    qs: {
    },
    headers: {
        'Authorization': getUserToken()
    }
};
function MapStockList(stocks) {
    var stockList = [];
    stocks.forEach((stock, index) => {
        stockList.push({ stock: stock, key: index });
    });

    return stockList;
}

const UserStocks = () => {

    const [userStocks, setUserStocks] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(requestOptions.uri + 'api/userstocks/getuserstocks', {
                headers: requestOptions.headers
            });
            setUserStocks(MapStockList(response.userStocks));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchData()
        })
    }, []);

    return (
        <View style={container}>
            <UserStockScrollView userStocks={userStocks} />
        </View>
    )
}

export default UserStocks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }

})
