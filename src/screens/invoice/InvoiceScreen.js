// import React, { useState, useRef, useEffect } from "react";
// import {
//   Alert,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   Pressable,
//   FlatList,
//   ActivityIndicator,
//   TextInput,
// } from "react-native";
// import { Appbar, Searchbar } from "react-native-paper";
// import { COLORS } from "../../constant/Colors";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// import GlobalStyles from "../../../assets/css/styles";
// import BackArrow from "../../../assets/images/icons/BackArrow";
// import SearchIcon from "../../../assets/images/icons/Search";
// import SettingIcon from "../../../assets/images/icons/Setting";
// import SvgUri from "react-native-svg-uri-updated";

// import api from "../../screens/Services/API/CallingApi";
// import { endPoint } from "../../screens/Services/API/ApiConstants";
// import InvoiceCard from "./InvoiceCard";

// import DetailedAllinvoices from "./DetailedAllinvoice";

// const InvoiceScreen = ({ navigation }) => {
//   const [invoiceListData, setinvoiceListData] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     getInvoiceList();
//   }, []);

//   const getInvoiceList = async () => {
//     const jsonValue = await AsyncStorage.getItem("UserToken");
//     let token = jsonValue;

//     const result = await api.getReviews(token, endPoint.invoice_list);
//     console.log(
//       result.data?.invoices[0]?.products_info[0]?.product_image,
//       "hjhjuy"
//     );

//     if (result) {
//       setinvoiceListData(result.data.invoices, "gbhnjm");
//     } else {
//       setinvoiceListData([]);
//     }
//   };

//   const searchFilterFunction = (text) => {
//     if (text) {
//       const newData = invoiceListData.filter((item) => {
//         const itemData = item.status_name
//           ? item.unique_name.toUpperCase()
//           : "".toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setinvoiceListData(newData);
//       setSearch(text);
//     } else {
//       setinvoiceListData(invoiceListData);
//       setSearch(text);
//     }
//   };
//   const ItemSepartorView = () => {
//     return <View style={{ height: 0, width: "100%" }} />;
//   };
//   return (
//     <View style={GlobalStyles.orderContainer}>
//       <View style={GlobalStyles.promotionsHeaderContainer}>
//         {/* <View style={GlobalStyles.PromotionScreenIconView}>
//           <Pressable
//             onPress={() => {
//               //   navigation.navigate("DrawerNavigationRoutes");
//               navigation.goBack();
//             }}
//           >
//             <BackArrow />
//           </Pressable>
//           <Text style={GlobalStyles.promotionsHeaderText}>Invoices</Text>
//         </View> */}
//       </View>
//       <View
//         style={{
//           height: 38,
//           width: "100%",
//           paddingLeft: 19,
//           paddingRight: 18,
//           marginTop: 19,
//         }}
//       >
//         <View>
//           <Searchbar
//             style={[GlobalStyles.searchBarStyle]}
//             inputStyle={[
//               GlobalStyles.font12,
//               GlobalStyles.textBlack,
//               GlobalStyles.searchinput,
//             ]}
//             placeholderTextColor={"#0F141A"}
//             placeholder="Search"
//             value={search}
//             icon={{ display: "none" }}
//             onChangeText={(text) => searchFilterFunction(text)}
//           />
//           <SvgUri
//             source={require("../../../assets/images/dashboard/input_search_icon.svg")}
//             style={[GlobalStyles.searchIcon]}
//           />
//           <TouchableOpacity
//             style={[
//               GlobalStyles.filterBlk,
//               GlobalStyles.flexRow,
//               GlobalStyles.alignCenter,
//               GlobalStyles.justifyCenter,
//             ]}
//           >
//             <SvgUri
//               source={require("../../../assets/images/dashboard/filter_icon.svg")}
//             />
//           </TouchableOpacity>
//           <View></View>
//         </View>
//       </View>
//       <View style={[GlobalStyles.padVer30, GlobalStyles.padb80]}>
//         {!invoiceListData ? (
//           <View>
//             <ActivityIndicator color={"#1F9CEF"} size="large" />
//           </View>
//         ) : (
//           <FlatList
//             data={invoiceListData}
//             keyExtractor={(item) => item._id}
//             ItemSeparatorComponent={ItemSepartorView}
//             showsVerticalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <Pressable
//                 style={{ flex: 1 }}
//                 // onPress={() =>
//                 //   navigation.navigate("DetailedAllinvoices", {
//                 //   _id:item?._id,
//                 //   unique_name:item?.unique_name,
//                 //   review:item?.review,
//                 //   supplier_address:item?.supplier_address,
//                 //   status_name:item?.status_name
//                 //   })
//                 onPress={() =>
//                   navigation.navigate("DetailedAllinvoices", {
//                     unique_name: item?.unique_name,
//                     id: item?._id,
//                     invoice: item?.link,
//                     image: item?.products_info[0]?.product_image,
//                   })
//                 }
//               >
//                 <InvoiceCard
//                   id={item?._id}
//                   unique_name={item?.unique_name}
//                   review={item?.review}
//                   supplier_address={item?.supplier_info?.supplier_address}
//                   status_name={item?.status_name}
//                   due_date={item?.due_date}
//                 />
//               </Pressable>
//             )}
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// export default InvoiceScreen;

/** @format */

// /** @format */

// import React, { useState, useRef, useEffect } from "react";
// import {
//   Alert,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   SafeAreaView,
//   StatusBar,
//   Pressable,
// } from "react-native";
// import { Appbar, Searchbar } from "react-native-paper";

// import PromotionCard from "./PromotionCard";
// import GlobalStyles from "../../../assets/css/styles";
// // import BackArrowIcon from "../../../assets/images/icons/BackArrowIcon";
// import { useFonts } from "expo-font";
// import * as Font from "expo-font";
// import BackArrow from "../../../assets/images/icons/BackArrow";

// const PromotionScreen = ({ navigation }) => {
//   // useEffect(() => {
//   //     Font.loadAsync({ Medium: require("../../../assets/fonts/Inter-Medium.ttf"),
//   //    Bold : require("../../../assets/fonts/Inter-ExtraBold.ttf")

//   //     }) }, [])

//   // const [loaded] = useFonts({ HelveticaNeueLTStdMd: require("./assets/fonts/HelveticaNeueLTStd-Md.otf"), });
//   //  if (!loaded) { return null; }

//   const [searchQuery, setSearchQuery] = React.useState("");

//   const onChangeSearch = (query) => setSearchQuery(query);

//   return (
//     <View style={GlobalStyles.orderContainer}>
//       <View style={GlobalStyles.promotionsHeaderContainer}>
//         <View
//           style={{
//             flexDirection: "row",
//             paddingTop: 41,
//             paddingLeft: 22,
//             alignItems: "center",
//           }}>
//           {/* <BackArrowIcon /> */}
//           <Pressable
//             onPress={() => {
//               //   navigation.navigate("DrawerNavigationRoutes");
//               navigation.goBack();
//             }}>
//             <BackArrow />
//           </Pressable>
//           <Text style={GlobalStyles.promotionsHeaderText}>Promotions</Text>
//         </View>
//       </View>
//       <View
//         style={{
//           height: 38,
//           width: "100%",
//           paddingLeft: 19,
//           paddingRight: 18,
//           marginTop: 25,
//         }}>
//         <Searchbar
//           // icon={() => <SearchIcon />}
//           inputStyle={GlobalStyles.searchInput}
//           style={GlobalStyles.searchContainer}
//           placeholderTextColor={"#0F141A"}
//           placeholder='Search'
//           onChangeText={() => {}}
//           //   value={searchQuery}
//         />
//       </View>
//       <View
//         style={{
//           paddingLeft: 19,
//           paddingRight: 18,
//           alignContent: "center",
//           marginTop: 19,
//           backgroundColor: "red",
//         }}>
//         <View>
//           <PromotionCard />
//         </View>
//       </View>
//       <View style={GlobalStyles.addButton}>
//         <Text style={GlobalStyles.stictyText}>+</Text>
//       </View>
//     </View>
//   );
// };

// export default PromotionScreen;

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
import InvoiceCard from "./InvoiceCard";

const InvoiceScreen = ({ navigation }) => {
  return (
    <View style={GlobalStyles.orderContainer}>
      <View style={GlobalStyles.searchBarPaddingView}>
        <View style={GlobalStyles.searchBarView}>
          <View style={GlobalStyles.searchIconView}>
            <SearchIcon />
            <View style={GlobalStyles.searchPlaceHolderView}>
              <TextInput
                onChangeText={() => {}}
                // value={number}
                placeholder="Search"
                placeholderTextColor={COLORS.introText}
              />
            </View>
          </View>
          <View>
            <Pressable
              onPress={() => {
                console.log("pressed");
              }}
            >
              <View style={GlobalStyles.searchfilterView}>
                <SettingIcon />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <View style={GlobalStyles.promotoinsCardPaddingView}>
        <InvoiceCard />
      </View>

      <View style={GlobalStyles.addButton}>
        <Pressable
          onPress={() => {
            console.log("add promotions");
          }}
        >
          <Text style={GlobalStyles.stictyText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default InvoiceScreen;
