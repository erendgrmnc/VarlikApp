import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import UserStockContainer from './UserStockContainer'

const UserStockScrollView = () => {
    const listStocks = prop.userStocks.map((stockObj, index) => {
        return (
            <View key={index}>
                <UserStockContainer stock={stockObj.stock} />
            </View>
        )
    });
    return (

        <ScrollView>
            {listStocks}
        </ScrollView>
    )
}

export default UserStockScrollView

const styles = StyleSheet.create({})
