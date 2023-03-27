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
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalStyles from "../../../assets/css/styles";
import BackArrow from "../../../assets/images/icons/BackArrow";
import SearchIcon from "../../../assets/images/icons/Search";
import SettingIcon from "../../../assets/images/icons/Setting";
import SvgUri from "react-native-svg-uri-updated";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import MyOffersCard from "./MyOffersCard";

const MyOffersScreen = ({ navigation }) => {
  const [reviewData, setreviewData] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [search, setSearch] = useState("");

  console.log(filterdData, "filterdData");
  useEffect(() => {
    getReviews();
  }, []);
  //getreviews
  const getReviews = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;

    const result = await api.getReviews(token, endPoint.get_reviews);
    console.log(result, "hj8u788");

    if (result) {
      setreviewData(result.data);
      setfilterdData(result.data);
    } else {
      setreviewData([]);
      setfilterdData([]);
    }
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = reviewData.filter((item) => {
        const itemData = item.status_name
          ? item.unique_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setreviewData(newData);
      setSearch(text);
    } else {
      setreviewData(reviewData);
      setSearch(text);
    }
  };
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
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
          <Text style={GlobalStyles.promotionsHeaderText}>MyOffers</Text>
        </View>
      </View>

      <View
        style={{
          height: 38,
          width: "100%",
          paddingLeft: 19,
          paddingRight: 18,
          marginTop: 19,
        }}
      >
        <View>
          <Searchbar
            style={[GlobalStyles.searchBarStyle]}
            inputStyle={[
              GlobalStyles.font12,
              GlobalStyles.textBlack,
              GlobalStyles.searchinput,
            ]}
            placeholderTextColor={"#0F141A"}
            placeholder="Search"
            value={search}
            icon={{ display: "none" }}
            onChangeText={(text) => searchFilterFunction(text)}
          />
          <SvgUri
            source={require("../../../assets/images/dashboard/input_search_icon.svg")}
            style={[GlobalStyles.searchIcon]}
          />
          <TouchableOpacity
            style={[
              GlobalStyles.filterBlk,
              GlobalStyles.flexRow,
              GlobalStyles.alignCenter,
              GlobalStyles.justifyCenter,
            ]}
          >
            <SvgUri
              source={require("../../../assets/images/dashboard/filter_icon.svg")}
            />
          </TouchableOpacity>
          <View></View>
        </View>
      </View>

      <View style={[GlobalStyles.padVer30, GlobalStyles.padb100]}>
        {!reviewData ? (
          <View>
            <ActivityIndicator color={"#1F9CEF"} size="large" />
          </View>
        ) : (
          <FlatList
            data={filterdData}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={ItemSepartorView}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={{ flex: 1 }}
                onPress={() =>
                  navigation.navigate("", {
                    id: item?._id,

                    product_code: item?.product_code,
                    review: item?.review,
                    supplier_name: item?.supplier_name,
                    rating: item?.rating,
                  })
                }
              >
                <MyOffersCard
                  id={item?._id}
                  product_code={item?.product_code}
                  review={item?.review}
                  supplier_name={item?.supplier_name}
                  rating={item?.rating}
                  updated_at={item?.updated_at}
                />
              </Pressable>
            )}
          />
        )}
      </View>
      <View style={GlobalStyles.addButton1}>
        <Pressable onPress={() => navigation.navigate("AddReview")}>
          <Text style={GlobalStyles.stictyText1}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MyOffersScreen;
