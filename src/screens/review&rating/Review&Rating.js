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

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import ReviewCard from "./ReviewCard";

const ReviewRatingScreen = ({ navigation }) => {
  const[reviewData,setreviewData]=useState([]);
  const [filterdData, setfilterdData]=useState([]);
  console.log(filterdData,"filterdData")
  useEffect(() => {
    getReviews();
  }, []);
   //getreviews
   const getReviews = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
   
    const result = await api.getReviews(token, endPoint.get_reviews);
    console.log(result, "hjhjuy");

    if (result) {
      setreviewData(result.data);
      setfilterdData(result.data);
    } else {
      setreviewData([]);
      setfilterdData([]);
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
          <Text style={GlobalStyles.promotionsHeaderText}>Review & Rating</Text>
        </View>
      </View>
      <View>
      {!reviewData ? (
              <View>
                <ActivityIndicator color={"#1F9CEF"} size='large' />
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
                    }>
                    <ReviewCard
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

export default ReviewRatingScreen;
