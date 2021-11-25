import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth, getUserToken } from '../../firebase';
import axios from 'axios';
import UserStockScrollView from './UserStock/UserStockScrollView';

const requestOptions = {
    method: 'GET',
    uri: 'https://localhost:44306',
    qs: {
    },
    headers: {
        'Authorization': getUserToken()
    }
};


const UserCoins = () => {

    const [userCoins, setuserCoins] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(requestOptions.uri + 'api/usercoins/getusercoins', {
                headers: requestOptions.headers
            });

            setuserCoins(response.userCoins);

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
        <View>
            <UserStockScrollView userStocks={userCoins} />
        </View>
    )
}

export default UserCoins

const styles = StyleSheet.create({})
