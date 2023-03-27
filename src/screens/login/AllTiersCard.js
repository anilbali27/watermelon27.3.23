/** @format */

import React from "react-native";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";
import Editcatelogue from "./Editcatelogue";
import { COLORS } from "../../constant/Colors";

const AllTiersCard = (props) => {
  console.log(props, "props");
  const id = props._id;
  return (
    <View style={GlobalStyles.paymentCardContainer}>
      <View style={GlobalStyles.paymentCardPaddingView}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "75%" }}>
            <Text style={GlobalStyles.orderCardHeading}>Tier 31</Text>
          </View>

          <View style={GlobalStyles.pricingTierInstockview}>
            <Text style={GlobalStyles.pricingTierInstockText}>In Stock</Text>
          </View>
        </View>
        <View style={GlobalStyles.outletEmailView}>
          <Text style={GlobalStyles.outletEmailText}>
            Amount Type : abcd0123456
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 10,
            paddingTop: 5,
          }}
        >
          <Text style={[GlobalStyles.subText, GlobalStyles.colorTwo]}>
            No. of SKU's : 5
          </Text>

          <View style={GlobalStyles.flexRow}>
            <View>
              <MaterialIcons name="edit" size={15} color={COLORS.button} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AllTiersCard;
