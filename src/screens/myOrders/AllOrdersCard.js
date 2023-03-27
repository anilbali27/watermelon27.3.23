/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const AllOrdersCard = (props) => {
  const date = moment(props.timing).format("MMM DD");
  console.log(date, "ooooo9");

  const moneyStatus = props.moneyStatus;

  const rating = props.rating;

  const images = props.image;
  console.log(images, "88888888");

  // // const date = new Date(1666632563517);
  // console.log(date.getMonth() + "/" + date.getDate());
  // // const month = date.toDateString();
  // // console.log(month, "oooooooooo");

  return (
    <View style={GlobalStyles.allOrderCardcardView}>
      <View style={GlobalStyles.allOrderCardInnerDimension}>
        <View
          style={[
            GlobalStyles.changeFlexDirection,
            GlobalStyles.justifyContent,
          ]}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            {/* <Image
              style={GlobalStyles.allOrdersImage}
              source={require("../../../assets/images/icons/MaskGroup.png")}
              // source={props.image}
            /> */}

            <Image
              source={{
                uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
              }}
              style={GlobalStyles.allOrdersImage}
            ></Image>
          </View>
          <View style={{ flex: 3.5 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text style={GlobalStyles.orderCardHeading}>
                    {props.title}
                  </Text>
                </View>
                <View>
                  {moneyStatus == 10 ? (
                    <View style={GlobalStyles.orderPaid}>
                      <Text style={GlobalStyles.paidText}>UnPaid</Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.orderPaidStatus}>
                      <Text style={GlobalStyles.paidText}>Paid</Text>
                    </View>
                  )}
                </View>
              </View>

              <Text style={GlobalStyles.outletText}>
                Outlet : {props.outlet}
              </Text>

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
              <View
                style={[
                  GlobalStyles.changeFlexDirection,
                  GlobalStyles.paddingThree,
                ]}
              >
                <View style={GlobalStyles.acticeView}>
                  <FontAwesome name="circle" size={5} color={COLORS.green} />
                </View>
                <Text style={GlobalStyles.emailText}>{props.emailStatus}</Text>
                <View
                  style={[
                    GlobalStyles.changeFlexDirection,
                    GlobalStyles.orderActiveView,
                  ]}
                >
                  <View style={GlobalStyles.acticeView}>
                    <FontAwesome name="circle" size={5} color={COLORS.green} />
                  </View>
                  <Text style={GlobalStyles.emailText}>Order sent</Text>
                </View>
              </View>
            </View>

            <View style={GlobalStyles.bottomLineOrderCared}>
              <View style={GlobalStyles.justifyContentCenter}>
                <Text style={GlobalStyles.aedValueText}>
                  AED {props.amount}
                </Text>
              </View>

              <View style={GlobalStyles.justifyContentCenter}>
                <Text style={GlobalStyles.getTimeText}>Get it by {date}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AllOrdersCard;
