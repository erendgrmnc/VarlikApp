import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker'
import { Directions } from 'react-native-gesture-handler';
const TypePicker = (prop) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        { label: 'Crypto Coins', value: 'crypto' },
        { label: 'Stocks', value: 'stcks' }
    ]);
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
            placeholder={prop.value}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    }
})
export default TypePicker;