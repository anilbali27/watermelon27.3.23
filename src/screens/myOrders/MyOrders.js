/** @format */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
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
  Animated,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Appbar, Searchbar } from "react-native-paper";
// import { useFocusEffect } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import Animated from "react-native-reanimated";
// import BottomSheet from "reanimated-bottom-sheet";

import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Font";
import GlobalStyles from "../../../assets/css/styles";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import AllOrdersCard from "./AllOrdersCard";
import PendingAcceptanceCard from "./PendingAcceptanceCard";
import Bell from "../../../assets/images/icons/Bell";
import { endPoint } from "../Services/API/ApiConstants";
import api from "../Services/API/CallingApi";
import SettingIcon from "../../../assets/images/icons/Setting";
import SearchIcon from "../../../assets/images/icons/Search";
import CrossMark from "../../../assets/images/icons/CrossMark";
import DropDown from "../../../assets/images/icons/DropDown";
import UpArrow from "../../../assets/images/UpArrow";
import ArrowRight from "../../../assets/images/icons/ArrowRight";
import { FA5Style } from "react-native-vector-icons/FontAwesome5";

const MyorderScreen = ({ navigation }) => {
  const refRBSheet = useRef();
  const height = React.useRef(null);

  const [animationValue] = useState(() => new Animated.Value(0));

  const maxHeight = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 600], // <-- value that larger than your content's height
  });

  const [allOrders, setAllOrders] = useState(true);
  const [pendingAcceptance, setPendingAcceptance] = useState(false);
  const [list, setList] = useState([]);

  const [filterdData, setfilterData] = useState([]);
  const [masterData, setmasterData] = useState([]);
  const [search, setSearch] = useState("");
  const [myList, setMyList] = useState();
  const [suppliers, setSuppliers] = useState(false);
  const [outlets, setOutlets] = useState(false);
  const [status, setStatus] = useState(false);
  const [page, setPage] = useState(2);
  const [statuss, setStatuss] = useState();

  console.log(statuss, "222222222222222222222222222222999");

  const emailStatus = list?.status;

  const [sheetHeight, setSheetHeight] = useState(500);

  const bottomSheetModalRef = useRef(null);

  // const snapPoints = useMemo(() => ["25%", "50%"], []);
  const snapPoints = ["48%", "80%"];

  const handlePresentModal = () => {
    bottomSheetModalRef.current.open();
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (outlets == true || suppliers == true) {
      setSheetHeight(700);
    } else {
      setSheetHeight(500);
    }
  }, [outlets, suppliers]);

  //call back
  const handleSheetChange = useCallback((index) => {
    console.log(index);
  }, []);

  /*filter supplier names*/
  const names = [
    "HK Enteprisers(Dry)",
    "Royal Techno Foodstuff LLC",
    "Bryght Supplies",
    "Premium First Choice Foods",
  ];

  const outletNames = [
    "Al1",
    "Global Beverages",
    "FResh Bulk",
    "Chief Middle East(CME)",
  ];

  const statussList = ["active", "inactive", "all"];

  const handlePress = (name) => {
    console.log(name, "anil");
  };

  useEffect(() => {
    console.log(suppliers, outlets, status, "0000000000000000000000");
    if (suppliers === true || outlets === true || status === true) {
      animationValue.setValue(1);
    } else {
      animationValue.setValue(0);
    }
  }, [suppliers, outlets, status]);

  const nameList = names.map((namee, index) => (
    <View>
      <TouchableOpacity onPress={() => handlePress(namee)}>
        <Text key={index} style={GlobalStyles.textBackground}>
          {namee}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  const statusList = statussList.map((statussList, index) => (
    <View>
      <TouchableOpacity onPress={() => handlePress(statussList)}>
        <Text key={index} style={GlobalStyles.textBackground}>
          {statussList}
        </Text>
      </TouchableOpacity>
    </View>
  ));

  /*pignation*/
  const [data, setData] = useState([]);

  const Loader = () => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );

  useEffect(() => {
    handleSubmit();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      //Below alert will fire every time when profile screen is focused
      setAllOrders(true);
      setPendingAcceptance(false);

      // alert("Hi from profile");
    }, [])
  );

  // useFocusEffect(() => {
  //   window.location.reload();
  // });

  const handleSubmit = async (data) => {
    // setPage(page + 1);
    console.log(page, "pageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    const jsonValue = await AsyncStorage.getItem("UserToken");
    console.log(jsonValue, "ttttttttttttttttttttttt");
    let token = jsonValue;
    var myJson = {
      page: 1,
    };
    const result = await api.getorderslist(token, endPoint.Order_List, myJson);
    console.log("runninggggggggg");
    setMyList(result);
    setList(result.data?.orders);
    setfilterData(result.data?.orders);
    setmasterData(result.data?.orders);
    setStatuss(result.data?.orders?.status);
  };

  const title = list?.supplier_info?.supplier_name;

  const onPressofOrders = () => {
    setPendingAcceptance(false);
    setAllOrders(true);
  };

  const onPressofAcceptance = () => {
    setAllOrders(false);
    setPendingAcceptance(true);
  };

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemData = item.supplier_info?.supplier_name
          ? item.supplier_info?.supplier_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterData(newData);
      setSearch(text);
    } else {
      setfilterData(masterData);
      setSearch(text);
    }
  };

  /*filter*/

  // const onTextLayout = (event) => {
  //   const { height } = event.nativeEvent.layout;
  //   setSheetHeight(height);
  // };

  //TO Give padding between the flatlist
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };

  return (
    <BottomSheetModalProvider>
      <View style={GlobalStyles.orderContainer}>
        <View style={GlobalStyles.headerContainer}>
          <View style={GlobalStyles.headerAligment}>
            <View style={[GlobalStyles.headerDirection]}>
              <View style={GlobalStyles.changeFlexDirection}>
                <View style={{ justifyContent: "center" }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  >
                    <MenuIcon />
                  </TouchableOpacity>

                  {/* <Pressable onPress={() => {}}>
                  <MenuIcon />
                </Pressable> */}
                </View>
                <Text style={GlobalStyles.menuText}>My Orders</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("NotificationScreen")}
              >
                <View style={{ alignContent: "flex-end" }}>
                  <Bell />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={GlobalStyles.orderTabDirection}>
            <Pressable onPress={() => onPressofOrders()}>
              {allOrders ? (
                <View style={GlobalStyles.allOrderView}>
                  <Text style={GlobalStyles.allOrderOnpressText}>
                    ALL ORDERSs
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={GlobalStyles.allOrderText}>ALL ORDERsS</Text>
                </View>
              )}
            </Pressable>

            <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofAcceptance()}>
                {pendingAcceptance ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      PENDING ACCEPTANCE
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>
                      PENDING ACCEPTANCE
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </View>

        {allOrders ? (
          <View
            style={{
              width: "100%",
            }}
          >
            <View style={GlobalStyles.searchBarPaddingView}>
              <View style={GlobalStyles.searchBarView}>
                <View style={GlobalStyles.searchIconView}>
                  <SearchIcon />
                  <View style={GlobalStyles.searchPlaceHolderView}>
                    <TextInput
                      onChangeText={(text) => searchFilterFunction(text)}
                      value={search}
                      placeholder="Search"
                      placeholderTextColor={COLORS.introText}
                    />
                  </View>
                </View>
                <View>
                  <Pressable
                    onPress={() => {
                      refRBSheet.current.open();
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
              {!myList ? (
                <View>
                  <ActivityIndicator color={COLORS.button} size="large" />
                </View>
              ) : (
                <FlatList
                  data={filterdData}
                  keyExtractor={(item) => item._id}
                  ItemSeparatorComponent={ItemSepartorView}
                  showsVerticalScrollIndicator={false}
                  onEndReached={handleSubmit}
                  onEndReachedThreshold={0.7}
                  renderItem={({ item }) => (
                    <Pressable
                      style={{ flex: 1 }}
                      onPress={() =>
                        navigation.navigate("DetailedOrderPage", {
                          id: item?._id,
                          status: item?.status,
                          orderNumber: item?.unique_name,
                          titleOne: item?.supplier_info?.supplier_name,
                          outlet: item?.outlet_info.name,
                          emailStatus: item?.status_name,
                          deliveryaddress: item?.delivery_address,
                          billingAddress: item.billing_address,
                          payments: item?.payments,
                          deliveryData: item.delivery_requested.delivery_date,
                          totalPayableAmount: item.total_payable_amount,
                          orderDateTime: item.Order_date_time,
                          estimatedSubtotal: item.total_cost_amount,
                          estimatedDeliveryFee: item.delivery_fee,
                          vatAmount: item.vat_amount,
                          moneyStatus: item?.paid_status,
                          items: item?.products_info.length,
                          productInfo: item?.products_info,
                          invoice: item?.invoice_status.invoice_link,
                          image: item?.products_info?.product_image,
                        })
                      }
                    >
                      <AllOrdersCard
                        title={item?.supplier_info?.supplier_name}
                        // title={title}
                        outlet={item?.outlet_info.name}
                        amount={item?.total_payable_amount}
                        timing={item?.Order_date_time}
                        // status={item?.paid_status_name}
                        moneyStatus={item?.paid_status}
                        emailStatus={item?.status_name}
                        image={item?.supplier_info?.supplier_profile}
                        rating={item?.products_info[0]?.r_qty}
                      />
                    </Pressable>
                  )}
                  // onRefresh={handleRefresh}
                  // refreshing={isRefreshing}
                />
              )}
            </View>
          </View>
        ) : null}
        {pendingAcceptance ? (
          <View
            style={{
              width: "100%",
            }}
          >
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
            <View style={GlobalStyles.PendingAcceptanceCardPadding}>
              {/* <PendingAcceptanceCard /> */}

              <FlatList
                data={list}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={ItemSepartorView}
                showsVerticalScrollIndicator={false}
                onEndReached={handleSubmit}
                onEndReachedThreshold={20}
                renderItem={({ item }) => (
                  <View>
                    {item?.status == 50 ? (
                      <PendingAcceptanceCard
                        title={item?.supplier_info?.supplier_name}
                        outlet={item?.outlet_info.name}
                        amount={item?.total_payable_amount}
                        timing={item?.Order_date_time}
                        emailStatus={item?.status_name}
                        image={item?.supplier_info?.supplier_profile}
                        rating={item?.products_info[0]?.r_qty}
                        status={item?.status}
                      />
                    ) : null}
                  </View>
                )}
              />
            </View>
          </View>
        ) : null}

        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          animationType={"none"}
          // height={sheetHeight}
          height={maxHeight}
          // height={outlets ? 700 : 500}
          customStyles={{
            // wrapper: {
            //   backgroundColor: "transparent",
            // },
            draggableIcon: {
              backgroundColor: "#1F9CEF",
            },
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                justifyContent: "flex-start",
                height: maxHeight.outputRange == 500 ? 500 : 390,
              }}
            >
              <View style={GlobalStyles.filterContainer}>
                <View
                  style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}
                >
                  <View>
                    <Text style={GlobalStyles.filterHeadingText}>
                      Sort & Filter
                    </Text>
                  </View>
                  <View>
                    <CrossMark />
                  </View>
                </View>
              </View>
              <View style={GlobalStyles.HorizantalLine} />

              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setSuppliers(!suppliers);
                    setOutlets(false);
                    setStatus(false);
                  }}
                >
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}
                  >
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Buyers
                      </Text>
                    </View>
                    <View>{suppliers ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {suppliers ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {nameList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setOutlets(!outlets);
                    setSuppliers(false);
                    setStatus(false);

                    //  setSheetHeight(700);
                  }}
                >
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}
                  >
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Outlets
                      </Text>
                    </View>
                    <View>{outlets ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {outlets ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {nameList}
                    </Text>
                  </View>
                ) : null}
              </View>
              <View style={GlobalStyles.HorizantalLine} />
              <View style={GlobalStyles.filterSubHeadingView}>
                <Pressable
                  onPress={() => {
                    setStatus(!status);
                    setOutlets(false);
                    setSuppliers(false);
                  }}
                >
                  <View
                    style={[GlobalStyles.justifyBetween, GlobalStyles.flexRow]}
                  >
                    <View>
                      <Text style={[GlobalStyles.filterSubHeadingText]}>
                        Status
                      </Text>
                    </View>
                    <View>{status ? <UpArrow /> : <DropDown />}</View>
                  </View>
                </Pressable>
                {status ? (
                  <View
                    style={{
                      // backgroundColor: "red",
                      width: "100%",
                      paddingRight: 10,
                      paddingTop: 10,
                    }}
                  >
                    <Text style={{ paddingRight: 10, paddingTop: 10 }}>
                      {statusList}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
            <View
              style={{
                justifyContent: "flex-end",

                // marginTop: animationValue == 0 ? 0 : 135,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: "#EDF5FF",
                  paddingLeft: 20,
                  paddingRight: 20,
                  height: 92,
                  alignItems: "center",
                  // marginTop: 135,
                }}
              >
                <TouchableOpacity>
                  <View
                    style={{
                      width: 161,
                      height: 47,

                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>Clear All</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity>
                  <View
                    style={{
                      width: 161,
                      height: 47,
                      backgroundColor: "#1F9CEF",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ paddingRight: 5 }}>
                      <Text
                        style={{
                          fontSize: 16,
                          lineHeight: 20,
                          fontWeight: "bold",
                          color: "white",
                        }}
                      >
                        Show Results
                      </Text>
                    </View>
                    <ArrowRight />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    </BottomSheetModalProvider>
  );
};

export default MyorderScreen;
