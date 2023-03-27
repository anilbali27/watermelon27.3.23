/** @format */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  Pressable,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constant/Colors";
import moment from "moment";
import Icon from "react-native-vector-icons/Feather";
import GlobalStyles from "../../../assets/css/styles";
import Star from "../../../assets/images/icons/Star";
import SvgUri from "react-native-svg-uri-updated";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";

const DetailedAllinvoices = ({ route, navigation }) => {
  const [id, setId] = useState(route.params.id);
  const [invoice, setInvoice] = useState(route.params.invoice);
  const [image, setImage] = useState(route.params.image);

  const [count, setCount] = useState(0);

  console.log(route.params.image, "route.123params");
  const [invoiceDetailsData, setinvoiceDetailsData] = useState([]);

  useEffect(() => {
    getInvoiceDetailList();
  }, []);

  const getInvoiceDetailList = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token = jsonValue;
    var myJson = {
      invoice_id: id,
    };
    const result = await api.getInvoiceDeatils(
      token,
      endPoint.get_invoice,
      myJson
    );
    console.log(result.data, "RTY090909878");

    if (result) {
      setinvoiceDetailsData(result.data);
    } else {
      setinvoiceDetailsData([]);
    }
  };
  const selDate = moment(invoiceDetailsData?.order?.created_at).format(
    "DD-MMM-YYYY"
  );

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
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

  return (
    <ScrollView>
      <View style={GlobalStyles.modal}>
        <View style={GlobalStyles.topModelSection}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign
              name="close"
              size={30}
              style={GlobalStyles.closeIcon}
            ></AntDesign>
          </TouchableOpacity>
          <View style={GlobalStyles.modelPaidButton}>
            <Text style={GlobalStyles.invoiceButtonText}>
              {invoiceDetailsData?.invoice?.status_name}
            </Text>
          </View>
          <Text style={GlobalStyles.modelInvoiceNo}>
            Invoice No : {invoiceDetailsData?.invoice?.unique_name}
          </Text>
          <Text style={GlobalStyles.modelTitle}>
            Unibic Dubai International
          </Text>
          <Text style={GlobalStyles.modelAddress}>
            Outlet :{" "}
            {invoiceDetailsData?.invoice?.supplier_info?.supplier_address}
          </Text>
        </View>
        <View style={GlobalStyles.modelTopBoxSection}>
          <View style={GlobalStyles.modelTopBoxContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.modelTwoSectionRow}>
                <View style={GlobalStyles.modelOneBox}>
                  <Text style={GlobalStyles.modelSingleBoxTitle}>Order No</Text>
                  <Text style={GlobalStyles.modelSingleBoxValue}>
                    {invoiceDetailsData?.invoice?.order_unique_name}
                  </Text>
                  <Text style={GlobalStyles.modelSingleBoxTitle}>Outlet</Text>
                  <Text style={GlobalStyles.modelSingleBoxBottomValue}>
                    Outlet 1
                  </Text>
                </View>
                <View style={GlobalStyles.modelTwoBox}>
                  <Text style={GlobalStyles.modelSingleBoxTitle}>Amount</Text>
                  <Text style={GlobalStyles.modelSingleBoxUniqValue}>
                    AED {invoiceDetailsData?.order?.total_payable_amount}
                  </Text>
                  <Text style={GlobalStyles.modelSingleBoxDate}>
                    Created On {selDate}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.modelImageBoxSectionRow}>
                <View style={GlobalStyles.modelImageBox}>
                  <View style={GlobalStyles.modelImageCircleBox}>
                    <Image
                      // source={invoiceDetailsData?.invoice?.products_info[0].product_image}
                      source={{
                        uri: `https://stagingapi.watermelon.market/upload/upload_photo/${image}`,
                      }}
                      style={GlobalStyles.modelImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={GlobalStyles.modelAmmountUpdateRow}>
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
                <View style={GlobalStyles.modelContentBox}>
                  <Text style={GlobalStyles.modelImageBoxTitle}>
                    {invoiceDetailsData?.invoice?.products_info[0].product_name}
                  </Text>
                  <Text style={GlobalStyles.modelImageBoxContent}>
                    {invoiceDetailsData?.invoice?.products_info[0].product_code}
                  </Text>
                  <Text style={GlobalStyles.modelImageBoxContentPackage}>
                    {invoiceDetailsData?.invoice?.products_info[0].uom} (
                    {invoiceDetailsData?.invoice?.products_info[0].uom_number})
                  </Text>
                  <Text style={GlobalStyles.modelImageBoxUniqValue}>
                    AED{" "}
                    {
                      invoiceDetailsData?.invoice?.products_info[0]
                        .cost_price_per_unit
                    }
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceTitle}>Billing Address</Text>
              </View>
              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.billingAddress}>
                  {invoiceDetailsData?.invoice?.billing_address}
                </Text>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceTitle}>Delivery Address</Text>
                <View style={GlobalStyles.invoiceButtonEdit}>
                  <Text style={GlobalStyles.invoiceButtonEditText}>Edit</Text>
                </View>
              </View>

              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.billingAddress}>
                  {invoiceDetailsData?.invoice?.delivery_address}
                </Text>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <Text style={GlobalStyles.invoiceTitle}>
                  Delivery Date
                  <Icon name="info" size={16} color="red"></Icon>
                </Text>
                <View style={GlobalStyles.invoiceButtonEdit}>
                  <Text style={GlobalStyles.invoiceButtonEditText}>Edit</Text>
                </View>
              </View>

              <View style={GlobalStyles.invoiceSingleSectionRow}>
                <Text style={GlobalStyles.billingAddress}>
                  {
                    invoiceDetailsData?.invoice?.delivery_requested
                      ?.delivery_date
                  }
                </Text>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.notificationOddContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.billingAddress}>
                    Estimated SubTotal
                  </Text>
                </View>
                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.billingCurrency}>
                    AED {invoiceDetailsData?.order?.total_net_amount}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.billingAddress}>
                    Estimated Delivery Fee
                  </Text>
                </View>

                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.billingCurrency}>
                    AED {invoiceDetailsData?.order?.delivery_fee}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.billingAddress}>
                    VAT({invoiceDetailsData?.order?.vat?.percentage}%)
                  </Text>
                </View>

                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.billingCurrency}>
                    AED {invoiceDetailsData?.order?.vat_amount}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.estimatedTotal}>
                    Estimated total
                  </Text>
                </View>

                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.estimatedTotal}>
                    AED {invoiceDetailsData?.order?.total_payable_amount}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={GlobalStyles.invoiceNoMarginContainer}>
            <View style={GlobalStyles.invoiceContainer}>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.estimatedTotal}>STATUS</Text>
                </View>

                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.estimatedTotal}>
                    {invoiceDetailsData?.order?.paid_status_name}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.billingAddress}>PAID AMOUNT</Text>
                </View>
                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.billingCurrency}>
                    AED {invoiceDetailsData?.order?.paid_status}
                  </Text>
                </View>
              </View>
              <View style={GlobalStyles.invoiceTwoSectionRow}>
                <View style={GlobalStyles.invoiceCardLeft}>
                  <Text style={GlobalStyles.billingAddress}>
                    REMAINING AMOUNT
                  </Text>
                </View>

                <View style={GlobalStyles.invoiceCardRight}>
                  <Text style={GlobalStyles.billingCurrency}>AED 0</Text>
                </View>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={GlobalStyles.buttonStyleRounded}
            onPress={() => openResume(invoice)}
          >
            {/* <Text style={GlobalStyles.buttonStyleRoundedText}>
                    Download Invoice
                  </Text> */}
            <Button
              //   onPress={handleSubmit3(onSubmit)}
              style={[
                GlobalStyles.primaryBg,
                GlobalStyles.saveBtn,
                GlobalStyles.width100,
              ]}
            >
              <Text
                style={[
                  GlobalStyles.font15,
                  GlobalStyles.letterSpa33,
                  GlobalStyles.textWhite,
                  GlobalStyles.fontMed,
                ]}
              >
                Download Invoice
              </Text>
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailedAllinvoices;
