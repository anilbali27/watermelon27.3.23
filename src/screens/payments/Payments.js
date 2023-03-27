/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Pressable,
  FlatList,
  ActivityIndicator,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { COLORS } from "../../constant/Colors";
import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import PaymentCard from "./PaymentCard";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const PaymentScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    handleSubmit();
  }, []);

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.invoice_unique_name
          ? item.invoice_unique_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  const handleSubmit = async (data) => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;
    const result = await api.getPayments(endPoint.get_payments, token);
    console.log(result, "oooooooooooooooooooooo");
    setMyList(result);
    setList(result.data?.payments);
    setfilterData(result.data?.payments);
    setmasterData(result.data?.payments);
  };

  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.paymentHeaderView}>
        <View style={GlobalStyles.paymentHeaderPaddingView}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.toggleDrawer();
                }}
              >
                <MenuIcon />
              </TouchableOpacity>

              {/* <Pressable onPress={() => {}}>
                  <MenuIcon />
                </Pressable> */}
            </View>
            <Text style={GlobalStyles.menuText}>Payments</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationScreen")}
          >
            <View style={{ alignContent: "flex-end" }}>
              <Bell />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={GlobalStyles.searchBarPaddingView}>
        <View style={GlobalStyles.searchBarView}>
          <View style={GlobalStyles.searchIconView}>
            <SearchIcon />
            <View style={GlobalStyles.searchPlaceHolderView}>
              <TextInput
                onChangeText={(text) => searchFilterFunction(text)}
                value={search}
                placeholder="Search"
                placeholderTextColor={COLORS.introText}
              />
            </View>
          </View>
          <View>
            {/* <Pressable onPress={() => setModalVisible(true)}> */}
            <View style={GlobalStyles.searchfilterView}>
              <SettingIcon />
            </View>
            {/* </Pressable> */}
          </View>
        </View>
      </View>
      <View style={GlobalStyles.PaymentsPadding}>
        {/* <PaymentCard /> */}
        {!myList ? (
          <View>
            <ActivityIndicator color={COLORS.button} size="large" />
          </View>
        ) : (
          <FlatList
            data={filterdData}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <PaymentCard
                type={item.type}
                invoiceUniqueName={item.invoice_unique_name}
                amount={item.amount}
                buyer={item.buyer_company_name}
                outlet={item.outlet_info.name}
                date={item.date}
              />
            )}
          />
        )}
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View >
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal> */}
    </View>
  );
};

export default PaymentScreen;

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 22,
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "center",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2,
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#2196F3",
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: "center",
//   },
// });
