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
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import OutletsScreenCard from "./OutletsScreenCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../Services/API/CallingApi";
import { endPoint } from "../Services/API/ApiConstants";

const OutletsScreen = ({ navigation }) => {
  const [myList, setMyList] = useState();
  const [list, setList] = useState([]);
  const [pagee, setPagee] = useState(1);

  useEffect(() => {
    handleSubmit();
    setPagee(pagee + 1);
  }, []);

  const handleSubmit = async (data) => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;
    var myJson = {
      page: pagee,
    };
    const result = await api.getOutletsList(
      token,
      endPoint.outlets_List,
      myJson
    );
    console.log(result, "oooooooooooooooooooooo");
    setMyList(result);
    setList(result.data);
  };

  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.outletsCardPaddingView}>
        {/* <OutletsScreenCard /> */}
        {!myList ? (
          <View>
            <ActivityIndicator color={COLORS.button} size="large" />
          </View>
        ) : (
          <FlatList
            data={list}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            onEndReached={handleSubmit}
            onEndReachedThreshold={0.7}
            renderItem={({ item }) => (
              <OutletsScreenCard
                image={item.outlet_logo}
                name={item.outlet_name}
                email={item.email}
                countryCode={item.mobile_country_code}
                number={item.mobile_number}
                country={item.country}
                city={item.city}
                area={item.area}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default OutletsScreen;
