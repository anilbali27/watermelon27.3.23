// /** @format */

// import React from "react-native";
// import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";
// import { FontAwesome } from "@expo/vector-icons";

// import GlobalStyles from "../../../assets/css/styles";
// import Star from "../../../assets/images/icons/Star";
// import SvgUri from "react-native-svg-uri-updated";

// const SubCatalogueCard = (props) => {
//   const in_stock = props.in_stock;

//   return (
//     <View
//       style={[
//         GlobalStyles.catalogueCol,
//         GlobalStyles.flexRow,
//         GlobalStyles.justifyBetween,
//         GlobalStyles.whiteBg,
//       ]}
//     >
//       <View style={[GlobalStyles.catalogueLeft, GlobalStyles.flexRow]}>
//         <Image
//           style={[
//             GlobalStyles.catalogueImg,
//             GlobalStyles.resizeContain,
//             GlobalStyles.mr8,
//           ]}
//           source={require("../../../assets/images/icons/MaskGroup.png")}
//           //source={props.product_image}
//         />
//         <View style={{ width: "60%" }}>
//           <Text
//             style={[
//               GlobalStyles.font12,
//               GlobalStyles.textBlack,
//               GlobalStyles.fontSemi,
//               GlobalStyles.mb2,
//             ]}
//           >
//             {props.category_name}
//           </Text>

//           <Text
//             style={[
//               GlobalStyles.font10,
//               GlobalStyles.textBlack,
//               GlobalStyles.mb7,
//             ]}
//           >
//             Product Code : {props.product_code}
//           </Text>
//           <Text
//             style={[
//               GlobalStyles.font10,
//               GlobalStyles.textBlack,
//               GlobalStyles.mb7,
//             ]}
//           >
//             No.of SKU's : {props.sku_name}
//           </Text>
//         </View>
//       </View>
//       <View
//         style={[
//           GlobalStyles.cataloguergt,
//           GlobalStyles.flexColumn,
//           GlobalStyles.justifyBetween,
//           GlobalStyles.alignEnd,
//         ]}
//       >
//         {in_stock == 0 ? (
//           <View style={[GlobalStyles.stockView, GlobalStyles.redBg]}>
//             <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
//               Out Stock
//             </Text>
//           </View>
//         ) : (
//           <View style={GlobalStyles.stockView}>
//             <Text style={[GlobalStyles.font10, GlobalStyles.textWhite]}>
//               In stock
//             </Text>
//           </View>
//         )}

//         <View
//           style={[
//             GlobalStyles.flexRow,
//             GlobalStyles.alignCenter,
//             GlobalStyles.padR6,
//           ]}
//         >
//           {/* <TouchableOpacity style={[GlobalStyles.marlft13]}>
//                 <SvgUri source={require('../../../assets/images/dashboard/trash_icon.svg')} />
//             </TouchableOpacity> */}
//         </View>
//       </View>
//     </View>
//   );
// };

// export default SubCatalogueCard;

/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import moment from "moment";
import { COLORS } from "../../constant/Colors";
import Feather from "react-native-vector-icons/Feather";
import Icon from "react-native-vector-icons/AntDesign";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const BuyersCard = (props) => {
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
    <View style={GlobalStyles.paymentCardContainer}>
      <View style={GlobalStyles.paddingViewSubCatalogue}>
        <View
          style={[
            GlobalStyles.changeFlexDirection,
            GlobalStyles.justifyContent,
          ]}
        >
          <View style={{ flex: 1, justifyContent: "flex-start" }}>
            <Image
              style={GlobalStyles.allOrdersImage}
              source={require("../../../assets/images/icons/MaskGroup.png")}
              // source={props.image}
            />

            {/* <Image
              source={{
                uri: `https://stagingapi.watermelon.market/upload/upload_photo/${images}`,
              }}
              style={GlobalStyles.allOrdersImage}
            ></Image> */}
          </View>
          <View style={{ flex: 4 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ width: "75%" }}>
                  <Text style={GlobalStyles.orderCardHeading}>
                    Cofina Dubai
                  </Text>
                </View>
                <View>
                  {moneyStatus == 10 ? (
                    <View style={GlobalStyles.outletActiveView}>
                      <Text style={GlobalStyles.paidText}>No Stock</Text>
                    </View>
                  ) : (
                    <View style={GlobalStyles.outletActiveView}>
                      <Text style={GlobalStyles.paidText}>In Stock</Text>
                    </View>
                  )}
                </View>
              </View>
              <View style={GlobalStyles.outletEmailView}>
                <Text style={GlobalStyles.outletEmailText}>
                  Product Code : abcd0123456
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 24,
                  paddingTop: 5,
                }}
              >
                <Text style={[GlobalStyles.subText, GlobalStyles.colorTwo]}>
                  No. of SKU's : 5
                </Text>

                <View style={GlobalStyles.flexRow}>
                  <View>
                    <MaterialIcons
                      name="edit"
                      size={15}
                      color={COLORS.button}
                    />
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

export default BuyersCard;
