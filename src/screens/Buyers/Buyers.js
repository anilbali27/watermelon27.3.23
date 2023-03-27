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
import BuyersCard from "./BuyersCard";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const BuyersScreen = ({ navigation }) => {
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
      <View style={GlobalStyles.promotionsHeaderContainer}>
        <View style={GlobalStyles.PromotionScreenIconView}>
          <Pressable
            onPress={() => {
              //   navigation.navigate("DrawerNavigationRoutes");
              navigation.goBack();
            }}
          >
            <BackArrow />
          </Pressable>
          <Text style={GlobalStyles.promotionsHeaderText}>Buyers</Text>
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
        <BuyersCard />
        {/* {!myList ? (
          <View>
            <ActivityIndicator color={COLORS.button} size="large" />
          </View>
        ) : (
          <FlatList
            data={filterdData}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <BuyersCard
                type={item.type}
                invoiceUniqueName={item.invoice_unique_name}
                amount={item.amount}
                buyer={item.buyer_company_name}
                outlet={item.outlet_info.name}
                date={item.date}
              />
            )}
          />
        )} */}
      </View>
    </View>
  );
};

export default BuyersScreen;
