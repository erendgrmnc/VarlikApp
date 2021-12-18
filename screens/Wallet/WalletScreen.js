import React, { useState } from "react";
import { StyleSheet, Text, View, Picker, TouchableOpacity } from "react-native";
import { signOutUser, deleteUser } from "../../firebase";
import axios from "axios";
import UserCoins from "../../components/Wallet/UserCoins";
import UserStocks from "../../components/Wallet/UserStocks";
import TypePicker from "../../components/Wallet/TypePicker";

const WalletScreen = (prop) => {
  const [selectedValue, setSelectedValue] = useState("java");
  const [dropValue, setDropValue] = useState(null);

  const deleteUserFunc = () => {
    deleteUser();
  }

  async function handleLogOut() {
    try {
      await signOutUser().then(() => {
        Alert.alert(
          "Başarıyla Çıkış Yapıldı",
          ":(",
          [
            {
              text: "Tamam", onPress: () => {
              }
            }
          ]
        );
      });
    }
    catch (exception) {
      Alert.alert(
        "Hata",
        "Çıkış Yapmas işlemi sırasında bir hata meydana geldi!\n" + exception,
        [
          {
            text: "Tamam",
            onPress: () => {
              ClearInputs();
            },
            style: "cancel"
          }
        ]

      )
    }
  }

  if (dropValue == "stcks" || dropValue == null) {
    return (
      <View style={styles.container}>
        <TypePicker value={dropValue} setValue={setDropValue} />
        <View style={{ flex: 1, width: "100%" }}>
          <UserStocks userToken={prop.userToken} />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "lightgray", maxHeight: 70 }}>
            <TouchableOpacity
              style={[styles.button, styles.deleteUserButton]}
              onPress={deleteUserFunc}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
              >Hesabımı Sil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={handleLogOut}
            >
              <Text
                style={styles.buttonText}
              >Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else if (dropValue == "crypto") {
    return (
      <View style={styles.container}>
        <TypePicker value={dropValue} setValue={setDropValue} />
        <View style={{ flex: 1, width: "100%" }}>
          <UserCoins userToken={prop.userToken} />
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly", backgroundColor: "lightgray", maxHeight: 70 }}>
            <TouchableOpacity
              style={[styles.button, styles.deleteUserButton]}
              onPress={deleteUserFunc}
            >
              <Text
                style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
              >Hesabımı Sil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonOutline]}
              onPress={handleLogOut}
            >
              <Text
                style={styles.buttonText}
              >Çıkış Yap</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <TypePicker value={dropValue} setValue={setDropValue} />
        <View>
          <Text>zort</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    backgroundColor: '#0782F9',
    height: 50,
    width: 160,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginRight: 5,
    justifyContent: "center",
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 15,
    marginRight: 15,
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  deleteUserButton: {
    backgroundColor: "red",
    color: "white",
    textAlignVertical: "center",
  }
});

export default WalletScreen;
