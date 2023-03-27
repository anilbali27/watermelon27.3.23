/** @format */

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  Pressable,
  ScrollView,
  Button,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Linking,
} from "react-native";
import moment from "moment";
// import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlobalStyles from "../../../assets/css/styles";
import CrossMark from "../../../assets/images/icons/CrossMark";
import AllOrdersCard from "./AllOrdersCard";
import RequiredIcon from "../../../assets/images/icons/Required";
import { Ionicons } from "@expo/vector-icons";
import OrderDetailCard from "./OrderDetailCard";
import { G } from "react-native-svg";
import { log } from "react-native-reanimated";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
const DetailedOrderPage = ({ route, navigation }) => {
  const {
    id,
    status,
    orderNumber,
    titleOne,
    outlet,
    emailStatus,
    deliveryaddress,
    billingAddress,
    payments,
    deliveryData,
    totalPayableAmount,
    orderDateTime,
    estimatedSubtotal,
    estimatedDeliveryFee,
    vatAmount,
    moneyStatus,
    items,
    productInfo,
    invoice,
    image,
  } = route.params;
  console.log(invoice, "invoiceinvoice");
  const [orders, setorders] = useState([]);

  const date = moment(orderDateTime).format("DD MMMM YYYY");
  console.log(date, "ooooo9");
  console.log(productInfo, "llllllllllll");

  const ItemSepartorView = () => {
    return <View style={{ height: 10, width: "100%" }} />;
  };

  const openResume = (invoice) => {
    if (invoice) {
      const file_url = invoice;
      console.log(file_url, "filename");
      Linking.canOpenURL(file_url).then(async (supported) => {
        if (supported) {
          Linking.openURL(file_url);
        } else {
          await WebBrowser.openBrowserAsync(file_url);
        }
      });
    }
  };
  // const requestStoragePermission = async () => {
  //   console.log("7777777777777777788888888888899999999999");
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //       {
  //         title: "Watermelon supplier App storage permission",
  //         message:
  //           "Downloader App needs access to your storage " +
  //           "so you can download files.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       downloadFile();
  //     } else {
  //       console.log("storage permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // const downloadFile = () => {
  //   const { config, fs } = RNFetchBlob;
  //   const date = new Date();
  //   const fileDir = fs.dirs.DownloadDir;
  //   config({
  //     // add this option that makes response data to be stored as a file,
  //     // this is much more performant.
  //     fileCache: true,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       path:
  //         fileDir +
  //         "/download" +
  //         Math.floor(date.getDate() + date.getSeconds() / 2),
  //       description: "file download",
  //     },
  //   })
  //     .fetch("GET", { invoice })
  //     .then((res) => {
  //       // the temp file path
  //       console.log("The file saved to ", res.path());
  //       alert("file downloaded completly");
  //     });
  // };
  useEffect(() => {
    getOrdersSupplierlist();
  }, []);

  //orders/supplier-list
  const getOrdersSupplierlist = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token =
      "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RhZ2luZ2FwaS53YXRlcm1lbG9uLm1hcmtldFwvaW5kZXgucGhwXC9hcGlcL3YxXC9sb2dpbiIsImlhdCI6MTY3NzU4NTc0MCwiZXhwIjoxNzA5MTIxNzQwLCJuYmYiOjE2Nzc1ODU3NDAsImp0aSI6IndzbHk1ekFjUlFJWk11MWkiLCJzdWIiOiI2MDc4NGRhNzdiNjBiNzYwNWE0N2E0MWUiLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.A7QeobHngL_qrnq6wj8HUxRW7X2EX35H5tOehk2NauU";

    const result = await api.getorders(token, endPoint.get_orders);
    console.log(result.data.orders[0].invoice_status.invoice_link, "opopopopo");

    if (result) {
      setorders(result);
    } else {
      setorders([]);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={GlobalStyles.orderContainer}>
        {/* <StatusBar animated={true} backgroundColor='#1F9CEF' /> */}
        <View style={GlobalStyles.headerDetailOrderView}>
          <Pressable
            onPress={() => {
              navigation.navigate("Orders");
            }}
          >
            <CrossMark />
          </Pressable>

          {moneyStatus == 10 ? (
            <View
              style={[
                GlobalStyles.orderDetailPaidStatus,
                GlobalStyles.orderDetailPaidStatusColor,
              ]}
            >
              <Text style={GlobalStyles.paidTextOrderDetail}>UnPaid</Text>
            </View>
          ) : (
            <View style={GlobalStyles.orderDetailPaidStatus}>
              <Text style={GlobalStyles.paidTextOrderDetail}>Paid</Text>
            </View>
          )}
          <Text style={GlobalStyles.orderNumberText}>
            Order No : {orderNumber}
          </Text>
          <Text style={GlobalStyles.orderTitle}>
            {/* Unibic Dubai International */}
            {titleOne}
          </Text>
          <Text style={GlobalStyles.orderOutlet}>Outlet : {outlet}</Text>
        </View>

        <View style={GlobalStyles.positionalAbsoluteCardPadding}>
          <View
            style={[
              GlobalStyles.positionalAbsoluteCard,
              GlobalStyles.orderDetailCardOneHeight,
            ]}
          >
            <View style={GlobalStyles.positionalAbsoluteCardView}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ marginTop: 22 }}>
                  <Text style={GlobalStyles.orderDetailPositionText}>
                    Items
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.paddingFour,
                    ]}
                  >
                    {items}
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.marginTopFive,
                    ]}
                  >
                    Email Status
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.paddingFour,
                    ]}
                  >
                    {emailStatus}
                  </Text>
                </View>
                <View style={GlobalStyles.orderDetailamountCard}>
                  <Text style={GlobalStyles.orderDetailPositionText}>
                    Amount
                  </Text>
                  <Text style={GlobalStyles.orderAmountText}>
                    AED {totalPayableAmount}
                  </Text>
                  <Text
                    style={[
                      GlobalStyles.orderDetailPositionText,
                      GlobalStyles.colorBlue,
                    ]}
                  >
                    Ordered On {date}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <FlatList
            data={productInfo}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={ItemSepartorView}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <OrderDetailCard
                title={item?.product_name}
                costPriceperUnit={item?.cost_price_per_unit}
                displayskuName={item?.display_sku_name}
                image={item?.product_image}
              />
            )}
          />

          {/* <OrderDetailCard /> */}

          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}
          >
            <View style={GlobalStyles.cardThreeView}>
              <Text style={GlobalStyles.orderDetailCardHeading}>
                Billing Address
              </Text>
              <Text
                style={[
                  GlobalStyles.orderDetailCardText,
                  GlobalStyles.marginTopSeven,
                ]}
              >
                {billingAddress}
              </Text>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}
          >
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardHeading}>
                    Delivery Address
                  </Text>
                </View>

                <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => {}}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>
                  {deliveryaddress}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}
          >
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardHeading}>
                    Order Notes
                  </Text>
                </View>

                <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => {}}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>{}</Text>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}
          >
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={GlobalStyles.orderDetailCardHeading}>
                        Delivery Date
                      </Text>
                    </View>
                    <View style={GlobalStyles.requiredIconPadding}>
                      <Ionicons
                        name="information-circle-outline"
                        size={14}
                        color="red"
                      />
                    </View>
                  </View>
                </View>

                <View style={GlobalStyles.justifyContentCenter}>
                  <Pressable onPress={() => {}}>
                    <View style={GlobalStyles.editView}>
                      <Text style={GlobalStyles.editText}>Edit</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              <View style={GlobalStyles.marginTopSeven}>
                <Text style={GlobalStyles.orderDetailCardText}>
                  {deliveryData}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.orderDetailCardGlobalView,
              GlobalStyles.marginTopFive,
            ]}
          >
            <View style={[GlobalStyles.cardThreeView]}>
              <View style={GlobalStyles.bottomLineOrderCared1}>
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        Estimated Subtotal
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED{estimatedSubtotal}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}
              >
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        Estimated Delivery Fee
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {estimatedDeliveryFee}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.paddingThree,
                ]}
              >
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text style={[GlobalStyles.orderDetailCardText]}>
                        VAT(5%)
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text style={GlobalStyles.orderDetailCardText}>
                    AED {vatAmount}
                  </Text>
                </View>
              </View>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.marginTopSeven,
                ]}
              >
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.orderDetailCardHeading,
                          GlobalStyles.colorRed,
                        ]}
                      >
                        Estimated total
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  <Text
                    style={[
                      GlobalStyles.orderDetailCardHeading,
                      GlobalStyles.colorRed,
                    ]}
                  >
                    AED {totalPayableAmount}
                  </Text>
                </View>
              </View>
            </View>
            <View style={GlobalStyles.orderDetailFlexView} />
            <View style={[GlobalStyles.cardThreeView]}>
              <View
                style={[
                  GlobalStyles.bottomLineOrderCared1,
                  GlobalStyles.marginTopSeven,
                ]}
              >
                <View style={GlobalStyles.justifyContentCenter}>
                  <View style={GlobalStyles.orderDetailcardView}>
                    <View>
                      <Text
                        style={[
                          GlobalStyles.orderDetailCardHeading,
                          GlobalStyles.colorRed,
                        ]}
                      >
                        Payment Status
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={GlobalStyles.justifyContentCenter}>
                  {moneyStatus == 10 ? (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.colorRed,
                      ]}
                    >
                      UnPaid
                    </Text>
                  ) : (
                    <Text
                      style={[
                        GlobalStyles.orderDetailCardHeading,
                        GlobalStyles.colorRed,
                      ]}
                    >
                      Paid
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>

          {status === 0 ||
          status === 30 ||
          status === 70 ||
          status === 80 ||
          status === 32 ||
          status === 60 ? (
            <Pressable onPress={() => openResume(invoice)}>
              <View
                style={[
                  GlobalStyles.marginTopSix,
                  GlobalStyles.onPressMarkReceived,
                ]}
              >
                <Text style={GlobalStyles.onPressedOrderText}>
                  Download Invoice
                </Text>
              </View>
            </Pressable>
          ) : null}
          {status === 35 || status === 33 ? (
            <View>
              <View
                style={[
                  GlobalStyles.marginTopSix,
                  GlobalStyles.onPressMarkReceived,
                ]}
              >
                <Pressable onPress={() => {}}>
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Mark As Reaceived
                  </Text>
                </Pressable>
              </View>
              <Pressable onPress={() => openResume(invoice)}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressMarkReceived,
                  ]}
                >
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Download Invoice
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : null}
          {status === 50 ? (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressReceived,
                  ]}
                >
                  <Pressable onPress={() => {}}>
                    <Text style={GlobalStyles.onPressedOrderText}>
                      Order Returned
                    </Text>
                  </Pressable>
                </View>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressReceived,
                  ]}
                >
                  <Pressable onPress={() => {}}>
                    <Text style={GlobalStyles.onPressedOrderText}>
                      Mark as Complated
                    </Text>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={() => openResume(invoice)}>
                <View
                  style={[
                    GlobalStyles.marginTopSix,
                    GlobalStyles.onPressMarkReceived,
                  ]}
                >
                  <Text style={GlobalStyles.onPressedOrderText}>
                    Download Invoice
                  </Text>

                  {/* <Button
  title="Download PDF"
  onPress={() =>
    downloadPDF(
      'https://example.com/path/to/pdf/file.pdf'
    )
  }
/> */}
                </View>
              </Pressable>
            </View>
          ) : null}

          {moneyStatus == 10 ? (
            <View
              style={[
                GlobalStyles.marginTopSix,
                GlobalStyles.onPressMarkReceived,
              ]}
            >
              <Pressable onPress={() => {}}>
                <Text style={GlobalStyles.onPressedOrderText}>Pay Now</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default DetailedOrderPage;
