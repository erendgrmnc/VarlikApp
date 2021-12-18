import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { Directions } from "react-native-gesture-handler";
const TypePicker = (prop) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Kripto Para', value: 'crypto' },
    { label: 'Hisse Senedi', value: 'stcks' }
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
      onChangeItem={item => prop.setIsReloadNeeded(true)}
      dropDownDirection={Directions.DOWN}
      placeholder={"Hisse Senedi"}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    zIndex: 10,
    elevation: 10,
  },
});
export default TypePicker;
