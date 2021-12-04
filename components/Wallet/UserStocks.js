import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios'
import UserStockScrollView from './UserStock/UserStockScrollView'
import AddUserStockModal from './UserStock/AddUserStock/AddUserStockModal'
import { cos } from 'react-native-reanimated'


function MapStockList(stocks) {
    var stockList = [];
    stocks.forEach((stock, index) => {
        stockList.push({ stock: stock, key: index });
    });
    return stockList;
}

let isDataFetched = false;

const UserStocks = (prop) => {
    const [isNeedReload, setIsNeedReload] = useState(false);
    const [userStocks, setUserStocks] = useState([]);
    const [currentStockList, setCurrentStockList] = useState([]);

    function MapStockListWithCurrentValues(stocks) {
        var returnList = [];
        stocks.forEach((stock, index) => {
            var currentStockObj = {};
            let isStockMatched = false;
            currentStockList.forEach(currentStock => {
                if (currentStock.stock.code == stock.stockCode) {
                    currentStockObj = currentStock.stock;
                    isStockMatched = true;
                }
            });
            if (isStockMatched) {
                returnList.push({ stock: stock, key: index, currentStock: currentStockObj });
            }
        });
        return returnList;
    }

    const requestOptions = {
        method: 'GET',
        uri: 'https://varlikappapi20211125195005.azurewebsites.net',
        qs: {
        },
        headers: {
            'Authorization': 'Bearer ' + prop.userToken
        }
    };

    const currentStocksRequestOptions = {
        method: 'GET',
        uri: 'https://api.collectapi.com/economy/hisseSenedi',
        qs: {
        },
        headers: {
            'authorization': 'apikey 3j8qfyerTKck605SawH3GY:5TEixjJ9qMFJMwms4FaXhN',
            'content-type': 'application/json'
        }
    };

    const fetchData = async () => {
        try {
            const currentStocksResponse = await axios.get(currentStocksRequestOptions.uri, {
                headers: currentStocksRequestOptions.headers
            });

            setCurrentStockList(MapStockList(Object.values(currentStocksResponse.data.result)));

            const response = await axios.get(requestOptions.uri + '/api/userstock/getuserstocks', {
                headers: requestOptions.headers
            });
            setUserStocks(MapStockListWithCurrentValues(Object.values(response.data.userStocks)));
        } catch (error) {
            console.log(error);
        }
    }

    if (prop.userToken != null && prop.userToken != '') {
        if (!isDataFetched || userStocks.length == 0) {
            isDataFetched = true;
            fetchData();
        }
    }

    useEffect(() => {
        if (isNeedReload) {
            fetchData();
            setIsNeedReload(false);
        }
    }, [isNeedReload])

    if (prop.userToken != null && prop.userToken != '') {
        if (userStocks.length != 0) {
            return (
                <View style={styles.container}>
                    <AddUserStockModal userToken={prop.userToken} setIsNeedReload={setIsNeedReload} />
                    <UserStockScrollView userStocks={userStocks} />
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <AddUserStockModal userToken={prop.userToken} setIsNeedReload={setIsNeedReload} />
                </View>
            )
        }

    }
    else {
        return (
            <View>
                <Text>Yükleniyor</Text>
            </View>
        )
    }

}

export default UserStocks

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }

})
