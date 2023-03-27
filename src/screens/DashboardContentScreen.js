/** @format */

import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import styles from "../../assets/css/styles";
import SideMenu from "./../../assets/images/dashboard/sidemenu_icon.svg";
import ModalSelector from "react-native-modal-selector";
import SvgUri from "react-native-svg-uri-updated";

export default function DashboardContentScreen({ navigation, route }) {
  const data = [
    { key: 1, label: "Daily" },
    { key: 2, label: "Weekly" },
    { key: 3, label: "Yearly" },
  ];

  return (
    <ScrollView style={[styles.grayBg, styles.flex1]}>
      {/* Header HTML */}
      <View style={[styles.dahboardHeader]}>
        <View
          style={[
            styles.width100,
            styles.justifyBetween,
            styles.flexRow,
            styles.alignCenter,
          ]}
        >
          <View style={[styles.flexRow, styles.alignCenter, styles.width20]}>
            <TouchableOpacity
              onPress={() => {
                navigation.toggleDrawer();
                // navigation.navigate("CustomSidebarMenu");
              }}
            >
              <SvgUri
                source={require("../../assets/images/dashboard/sidemenu_icon.svg")}
              />
            </TouchableOpacity>
            <Image
              source={require("../../assets/images/dashboard/dashboard-logo.png")}
              style={[
                styles.dashboardLogo,
                styles.marlft13,
                styles.resizeContain,
              ]}
            ></Image>
          </View>
          <View style={[styles.width60, styles.flexRow, styles.justifyCenter]}>
            <Text style={[styles.textWhite, styles.font12, styles.fontSemi]}>
              Hi, Haadiya Talwar
            </Text>
          </View>
          <View
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.width20,
              styles.justifyEnd,
            ]}
          >
            <SvgUri
              source={require("../../assets/images/dashboard/search_icon.svg")}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("NotificationScreen")}
            >
              <View>
                <View style={[styles.notCount]}></View>

                <SvgUri
                  source={require("../../assets/images/dashboard/notification_icon.svg")}
                  style={[styles.marlft21]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[
            styles.flexRow,
            styles.justifyBetween,
            styles.alignCenter,
            styles.padtop30,
          ]}
        >
          <View style={[styles.width50]}>
            <Text
              style={[
                styles.textWhite,
                styles.fontMed,
                styles.font12,
                styles.marBtm4,
              ]}
            >
              Total Sales
            </Text>
            <Text style={[styles.textWhite, styles.fontSemi, styles.font18]}>
              AED 67,954
            </Text>
          </View>
          <View style={[styles.width50, styles.flexRow, styles.justifyEnd]}>
            <View>
              <SvgUri
                source={require("../../assets/images/dashboard/modal_drop_down_icon.svg")}
                style={[styles.modalDropDown]}
              />
              <ModalSelector
                data={data}
                initValue="Weekly"
                selectStyle={[styles.weekyDropDown]}
                initValueTextStyle={[
                  styles.font12,
                  styles.textWhite,
                  styles.fontMed,
                ]}
                overlayStyle={[
                  styles.popupOverlay,
                  styles.flexColumn,
                  styles.justifyEnd,
                  styles.alignCenter,
                ]}
                optionContainerStyle={[styles.width300px]}
                cancelStyle={[styles.width300px, styles.marHorauto]}
                optionTextStyle={[styles.textBlack, styles.font12]}
                cancelTextStyle={[styles.textBlack, styles.font12]}
              />
            </View>
          </View>
        </View>
      </View>
      {/* Header HTML - Ends */}

      <View style={[styles.width100, styles.pad20]}>
        {/* total order HTML */}
        <View style={[styles.flexRow, styles.flexWrap]}>
          <View style={[styles.width50, styles.padR7]}>
            <View
              style={[
                styles.orderCol,
                styles.width100,
                styles.whiteBg,
                styles.pad20,
                styles.flexColumn,
                styles.alignStart,
              ]}
            >
              <View
                style={[
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.orderCircle,
                  styles.mb16,
                ]}
              >
                <SvgUri
                  source={require("../../assets/images/dashboard/total_order_icon.svg")}
                />
              </View>
              <Text
                style={[
                  styles.font12,
                  styles.textDefault,
                  styles.fontMed,
                  styles.marBtm6,
                ]}
              >
                Total Orders
              </Text>
              <Text
                style={[
                  styles.font18,
                  styles.textBlack,
                  styles.fontSemi,
                  styles.mb18,
                ]}
              >
                67,954
              </Text>
              <TouchableOpacity
                style={[
                  styles.activeSKUBtn,
                  styles.flexRow,
                  styles.alignCenter,
                ]}
              >
                <SvgUri
                  source={require("../../assets/images/dashboard/tick_icon.svg")}
                  style={[styles.mr3]}
                />
                <Text style={[styles.font12, styles.fontMed, styles.textPri]}>
                  250 Active SKU
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.width50, styles.padL7]}>
            <View
              style={[
                styles.orderCol,
                styles.width100,
                styles.whiteBg,
                styles.pad20,
                styles.flexRow,
                styles.justifyBetween,
                styles.mb16,
              ]}
            >
              <View style={[styles.width80]}>
                <Text
                  style={[
                    styles.font12,
                    styles.textDefault,
                    styles.fontMed,
                    styles.marBtm6,
                  ]}
                >
                  Total Customers
                </Text>
                <Text
                  style={[styles.font18, styles.textBlack, styles.fontSemi]}
                >
                  56,437
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.orderCircle,
                ]}
              >
                <SvgUri
                  source={require("../../assets/images/dashboard/total_customer_icon.svg")}
                />
              </View>
            </View>
            <View
              style={[
                styles.orderCol,
                styles.width100,
                styles.whiteBg,
                styles.pad20,
                styles.flexRow,
                styles.justifyBetween,
              ]}
            >
              <View style={[styles.width80]}>
                <Text
                  style={[
                    styles.font12,
                    styles.textDefault,
                    styles.fontMed,
                    styles.marBtm6,
                  ]}
                >
                  Total Receivables
                </Text>
                <Text
                  style={[styles.font18, styles.textBlack, styles.fontSemi]}
                >
                  AED 242k
                </Text>
              </View>
              <View
                style={[
                  styles.flexRow,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.orderCircle,
                ]}
              >
                <SvgUri
                  source={require("../../assets/images/dashboard/total_receiver_icon.svg")}
                />
              </View>
            </View>
          </View>
        </View>
        {/* total order HTML - Ends */}

        {/* Top Categories */}
        <View>
          <View
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.padtop30,
              styles.mb12,
              styles.justifyBetween,
            ]}
          >
            <Text style={[styles.font16, styles.textBlack, styles.fontBold]}>
              Top Categories
            </Text>
            <TouchableOpacity>
              <Text style={[styles.font12, styles.textPri, styles.fontMed]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.categoryBlk,
              styles.flexRow,
              styles.alignCenter,
              styles.justifyBetween,
              styles.whiteBg,
              styles.mb12,
            ]}
          >
            <View style={[styles.width80, styles.flexRow, styles.alignCenter]}>
              <Image
                source={require("../../assets/images/dashboard/category_image_1.png")}
                style={[styles.categoryImage, styles.resizeContain]}
              ></Image>
              <View style={[styles.pl10]}>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb3,
                  ]}
                >
                  Avocado (HAAS)
                </Text>
                <Text style={[styles.font12, styles.textDefault]}>
                  176 Customers
                </Text>
              </View>
            </View>
            <Text style={[styles.font12, styles.textBlack, styles.fontBold]}>
              AED 12.5k
            </Text>
          </View>
          <View
            style={[
              styles.categoryBlk,
              styles.flexRow,
              styles.alignCenter,
              styles.justifyBetween,
              styles.whiteBg,
              styles.mb12,
            ]}
          >
            <View style={[styles.width80, styles.flexRow, styles.alignCenter]}>
              <Image
                source={require("../../assets/images/dashboard/category_image_2.png")}
                style={[styles.categoryImage, styles.resizeContain]}
              ></Image>
              <View style={[styles.pl10]}>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb3,
                  ]}
                >
                  Tuna Fish(FAAS)
                </Text>
                <Text style={[styles.font12, styles.textDefault]}>
                  243 Customers
                </Text>
              </View>
            </View>
            <Text style={[styles.font12, styles.textBlack, styles.fontBold]}>
              AED 43.2k
            </Text>
          </View>
          <View
            style={[
              styles.categoryBlk,
              styles.flexRow,
              styles.alignCenter,
              styles.justifyBetween,
              styles.whiteBg,
              styles.mb12,
            ]}
          >
            <View style={[styles.width80, styles.flexRow, styles.alignCenter]}>
              <Image
                source={require("../../assets/images/dashboard/category_image_3.png")}
                style={[styles.categoryImage, styles.resizeContain]}
              ></Image>
              <View style={[styles.pl10]}>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb3,
                  ]}
                >
                  Indian Mango
                </Text>
                <Text style={[styles.font12, styles.textDefault]}>
                  142 Customers
                </Text>
              </View>
            </View>
            <Text style={[styles.font12, styles.textBlack, styles.fontBold]}>
              AED 53.2k
            </Text>
          </View>
        </View>
        {/* Top Categories - Ends */}

        {/* Recent Users */}
        <View>
          <View
            style={[
              styles.flexRow,
              styles.alignCenter,
              styles.padtop30,
              styles.mb12,
              styles.justifyBetween,
            ]}
          >
            <Text style={[styles.font16, styles.textBlack, styles.fontBold]}>
              Recent Users
            </Text>
            <TouchableOpacity>
              <Text style={[styles.font12, styles.textPri, styles.fontMed]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.flexRow]}>
            <View style={[styles.width33, styles.padR8]}>
              <View
                style={[
                  styles.categoryBlk,
                  styles.flexColumn,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.whiteBg,
                ]}
              >
                <Image
                  source={require("../../assets/images/dashboard/recent_user_1.png")}
                  style={[
                    styles.recentuserImage,
                    styles.resizeContain,
                    styles.mb7,
                  ]}
                ></Image>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb2,
                  ]}
                >
                  Samer Ismail
                </Text>
                <Text style={[styles.font12, styles.textDefault, styles.mb12]}>
                  256 Orders
                </Text>
                <TouchableOpacity
                  style={[
                    styles.activeSKUBtn,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.AEDBtn,
                  ]}
                >
                  <Text
                    style={[styles.font12, styles.fontMed, styles.textBlacks]}
                  >
                    AED 12.55
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.width33, styles.padR4, styles.padL4]}>
              <View
                style={[
                  styles.categoryBlk,
                  styles.flexColumn,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.whiteBg,
                ]}
              >
                <Image
                  source={require("../../assets/images/dashboard/recent_user_1.png")}
                  style={[
                    styles.recentuserImage,
                    styles.resizeContain,
                    styles.mb7,
                  ]}
                ></Image>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb2,
                  ]}
                >
                  Samer Ismail
                </Text>
                <Text style={[styles.font12, styles.textDefault, styles.mb12]}>
                  256 Orders
                </Text>
                <TouchableOpacity
                  style={[
                    styles.activeSKUBtn,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.AEDBtn,
                  ]}
                >
                  <Text
                    style={[styles.font12, styles.fontMed, styles.textBlacks]}
                  >
                    AED 12.55
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.width33, styles.padL8]}>
              <View
                style={[
                  styles.categoryBlk,
                  styles.flexColumn,
                  styles.alignCenter,
                  styles.justifyCenter,
                  styles.whiteBg,
                ]}
              >
                <Image
                  source={require("../../assets/images/dashboard/recent_user_1.png")}
                  style={[
                    styles.recentuserImage,
                    styles.resizeContain,
                    styles.mb7,
                  ]}
                ></Image>
                <Text
                  style={[
                    styles.font14,
                    styles.textBlack,
                    styles.fontSemi,
                    styles.mb2,
                  ]}
                >
                  Samer Ismail
                </Text>
                <Text style={[styles.font12, styles.textDefault, styles.mb12]}>
                  256 Orders
                </Text>
                <TouchableOpacity
                  style={[
                    styles.activeSKUBtn,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.AEDBtn,
                  ]}
                >
                  <Text
                    style={[styles.font12, styles.fontMed, styles.textBlacks]}
                  >
                    AED 12.55
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Recent Users - Ends */}
      </View>
    </ScrollView>
  );
}
