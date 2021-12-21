import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import UserStockContainer from './UserStockContainer'

const UserStockScrollView = (prop) => {
    const listStocks = prop.userStocks.map((stockObj, index) => {
        return (
            <View key={index}>
                <UserStockContainer userToken={prop.userToken} setIsReloadNeeded={prop.setIsReloadNeeded} stock={stockObj.stock} currentStock={stockObj.currentStock} />
            </View>
        )
    });
    return (

        <ScrollView
            nestedScrollEnabled={true}
        >
            {listStocks}
        </ScrollView>
    )
}

export default UserStockScrollView

const styles = StyleSheet.create({})
