/** @format */

// /** @format */

// import React from "react-native";
// import { View, Text, Image } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";
// import { AntDesign } from "@expo/vector-icons";

// import GlobalStyles from "../../../assets/css/styles";

// const PromotionCard = () => {
//   return (
//     <View style={GlobalStyles.allOrderCardcardView}>
//       <View style={GlobalStyles.allOrderCardInnerDimension}>
//         <View
//           style={[
//             GlobalStyles.changeFlexDirection,
//             GlobalStyles.justifyContent,
//           ]}>
//           <View>
//             <Image
//               style={{ width: 42, height: 42 }}
//               source={require("../../../assets/images/icons/MaskGroup.png")}
//             />
//           </View>
//           <View style={{ paddingLeft: 13 }}>
//             <Text style={GlobalStyles.cardText}>Uni Food - Dubai, UAE</Text>
//             <Text
//               style={[
//                 GlobalStyles.subText,
//                 GlobalStyles.colorOne,
//                 GlobalStyles.paddingFour,
//               ]}>
//               #261311
//             </Text>
//             <Text
//               style={[
//                 GlobalStyles.subText,
//                 GlobalStyles.paddingThree,
//                 GlobalStyles.colorTwo,
//               ]}>
//               Weight in kg : 10
//             </Text>
//             <Text
//               style={[
//                 GlobalStyles.subText,
//                 GlobalStyles.paddingThree,
//                 GlobalStyles.colorTwo,
//               ]}>
//               Category : Fresh Fruits
//             </Text>

//             <View style={{ flexDirection: "row", alignItems: "center" }}>
//               <Text
//                 style={[
//                   GlobalStyles.subText,
//                   GlobalStyles.paddingThree,
//                   GlobalStyles.colorTwo,
//                 ]}>
//                 Offer Price : AED 55.05
//               </Text>
//               <View style={{ paddingLeft: 137 }}>
//                 <MaterialIcons name='edit' size={12} color='#1F9CEF' />
//               </View>
//               <View style={{ paddingLeft: 12 }}>
//                 <AntDesign name='delete' size={12} color='#F21616' />
//               </View>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default PromotionCard;

/** @format */

import React from "react-native";
import { View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";

import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";

const PromotionCard = () => {
  return (
    <View style={GlobalStyles.allOrderCardcardView}>
      <View style={GlobalStyles.allOrderCardInnerDimension}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Image
              style={GlobalStyles.allOrdersImage}
              source={require("../../../assets/images/icons/MaskGroup.png")}
            />
          </View>
          <View style={{ flex: 5 }}>
            <View style={GlobalStyles.textView}>
              <Text style={GlobalStyles.orderCardHeading}>
                Uni Food - Dubai, UAE
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.colorOne,
                  GlobalStyles.paddingFour,
                ]}>
                #261311
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Weight in kg : 10
              </Text>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Category : Fresh Fruits
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginLeft: 10,
              }}>
              <Text
                style={[
                  GlobalStyles.subText,
                  GlobalStyles.paddingThree,
                  GlobalStyles.colorTwo,
                ]}>
                Offer Price : AED 55.05
              </Text>

              <View style={GlobalStyles.flexRow}>
                <View style={{ marginRight: 20 }}>
                  <MaterialIcons name='edit' size={15} color={COLORS.button} />
                </View>
                <AntDesign name='delete' size={15} color={COLORS.red} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PromotionCard;
