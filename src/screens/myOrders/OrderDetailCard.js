/** @format */

import React, { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import { G } from "react-native-svg";

const OrderDetailCard = (props) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const images = props.image;

  console.log(props, "ffffffffffffffff");

  return (
    <View style={GlobalStyles.orderDetailCardGlobalView}>
      <View style={GlobalStyles.orderDetailCardInnerDimension}>
        <View style={{ width: "100%" }}>
          <View style={GlobalStyles.changeFlexDirection}>
            <View style={GlobalStyles.flexOne}>
              {/* <Image
                style={GlobalStyles.allOrdersImage}
                source={require("../../../assets/images/icons/MaskGroup.png")}
              /> */}
              <Image
                source={{
                  uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
                }}
                style={GlobalStyles.allOrdersImage}
              ></Image>
            </View>
            <View style={GlobalStyles.flexTwo}>
              <Text style={GlobalStyles.orderDetailCardHeading}>
                {props.title}
              </Text>
              <Text
                style={[
                  GlobalStyles.orderDetailPositionText,
                  GlobalStyles.paddingTwo,
                  GlobalStyles.colorOne,
                ]}
              >
                {props.displayskuName}
              </Text>
              <View style={GlobalStyles.orderCardflexView}>
                <View>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.paddingTwo,
                      GlobalStyles.colorOne,
                    ]}
                  >
                    Package {props.displayskuName}
                  </Text>
                </View>
                <View style={{ width: 70 }}>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.paddingTwo,
                      GlobalStyles.colorOne,
                    ]}
                  >
                    Received Qty {props.displayskuName}{" "}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.orderCardflexView}>
                <View>
                  <Text style={GlobalStyles.orderDetailAedText}>
                    AED {props.costPriceperUnit}
                  </Text>
                </View>
                <View style={GlobalStyles.addSubView}>
                  <View style={GlobalStyles.addSubViewOne}>
                    <Pressable onPress={handleDecrement}>
                      <View style={GlobalStyles.addSubViewTwo}>
                        <Text style={GlobalStyles.colorTwo}>-</Text>
                      </View>
                    </Pressable>
                    <View style={GlobalStyles.addSubViewTwo}>
                      <Text style={GlobalStyles.colorTwo}>{count}</Text>
                    </View>
                    <Pressable o onPress={handleIncrement}>
                      <View style={GlobalStyles.addSubViewFour}>
                        <Text style={GlobalStyles.colorTwo}>+</Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderDetailCard;
