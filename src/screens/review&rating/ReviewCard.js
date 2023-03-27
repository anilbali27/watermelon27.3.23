/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";

const ReviewCard = (props) => {
  const rating = props.rating;

  return (
   
    <View
      style={[
        GlobalStyles.catalogueCol,
        GlobalStyles.flexRow,
        GlobalStyles.justifyBetween,
        GlobalStyles.whiteBg,
      ]}
    >
      <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
       
        <View style={{ width: "60%" }}>
          <Text
            style={[
              GlobalStyles.font12,
              GlobalStyles.textBlack,
              GlobalStyles.fontSemi,
              GlobalStyles.mb2,
            ]}
          >
            {props.product_code}
          </Text>

          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}
          >
             {props.supplier_name}
          </Text>

          <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}
          >
                      {rating == 0 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>

                  <Star />
                </View>
              ) : null}
              {rating == 1 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>

                  <Star />
                </View>
              ) : null}
              {rating == 2 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>

                  <Star />
                </View>
              ) : null}
              {rating == 3 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star />
                  </View>
                  <Star />
                </View>
              ) : null}
              {rating == 4 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <Star />
                </View>
              ) : null}
              {rating == 5 ? (
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.ratingView,
                  ]}
                >
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <View style={GlobalStyles.ratingPadding}>
                    <Star color={COLORS.gold} />
                  </View>
                  <Star color={COLORS.gold} />
                </View>
              ) : null}
            {props.review}
          </Text>
        </View>
      </View>
      <View
        style={[
          GlobalStyles.cataloguergt,
          GlobalStyles.flexColumn,
          GlobalStyles.justifyBetween,
          GlobalStyles.alignEnd,
        ]}
      >
         <Text
            style={[
              GlobalStyles.font10,
              GlobalStyles.textBlack,
              GlobalStyles.mb7,
            ]}
          >
       {props.updated_at.slice(0,10)}
          </Text>
        <View
          style={[
            GlobalStyles.flexRow,
            GlobalStyles.alignCenter,
            GlobalStyles.padR6,
          ]}
        >
          {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
                <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
            </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default ReviewCard;
