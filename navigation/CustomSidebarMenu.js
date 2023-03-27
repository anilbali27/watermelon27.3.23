/** @format */

import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChangePassword from "../src/screens/login/ChangePassword";
import AddCatalogueScreen from "../src/screens/login/AddCatalogue";
import DashboardContentScreen from "../src/screens/DashboardContentScreen";
import Editcatelogue from "../src/screens/login/Editcatelogue";
import SupplierProfile from "../src/screens/login/SupplierProfile";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { COLORS } from "../src/constant/Colors";
import Ionicons from "react-native-vector-icons/Ionicons";

import Dashboard from "../assets/images/icons/sideBar/Dashboard";
import SupplierProfileIcon from "../assets/images/icons/sideBar/SupplierProfile";
import CatalogueIcon from "../assets/images/icons/sideBar/CatelogueIcon";
import GlobalStyles from "../assets/css/styles";
import InventoryIcon from "../assets/images/icons/sideBar/Inventory";
import Invoices from "../assets/images/icons/sideBar/Invoices";
import Review from "../assets/images/icons/sideBar/Review";
import Payments from "../assets/images/icons/sideBar/Payments";
import Promotions from "../assets/images/icons/sideBar/Promotions";
import Myoffers from "../assets/images/icons/sideBar/Myoffers";
import Account from "../assets/images/icons/sideBar/Account";
import Catelogue from "../src/screens/login/Catelogue";
import api from "../src/screens/Services/API/CallingApi";
import { endPoint } from "../src/screens/Services/API/ApiConstants";

const CustomSidebarMenu = (props) => {
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [profileDatta, setProfileDatta] = useState([]);

  useEffect(() => {
    getFirstName();
  }, []);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("userTypeId");
    console.log(jsonId, "jsonId");
    let token = jsonValue;
    var myJson = {
      id: jsonId,
      // id: "5fe9c03ab70cb405ba5dcb33",
    };

    const result = await api.getProfile(token, endPoint.get_profile, myJson);
    console.log(result, "getprofile");

    if (result) {
      setImage(result.data.profile);
    } else {
      setProfileDatta([]);
    }
  };

  const getFirstName = async () => {
    const name = await AsyncStorage.getItem("firstname");
    console.log(name, "firstnameeeeeeeeeeeeeeeeeeeeee");
    setFirstName(name);
  };

  const goToStack = (stackName) => {
    console.log(stackName, "stackName");
    if (stackName === "DashboardScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "ChangePassword") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "AppSettingsScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "AddCatalogueScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "Editcatelogue") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "SupplierProfile") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "InvoiceScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "PromotionScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "InventoryScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "ReviewRatingScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "MyOffersScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "PaymentScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "AccountSettingScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "BuyersScreen") {
      props.navigation.navigate(stackName);
    }
    if (stackName === "Catelogue") {
      props.navigation.navigate(stackName);
    } else {
      //console.log(props)
      props.navigation.navigate(stackName);
    }
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          {/* <Text style={{ fontSize: 25, color: "#307ecc" }}>
            {"Haadiya Talwar"}
          </Text> */}
          {/* <Image
            style={GlobalStyles.allOrdersImage}
            source={require("../assets/images/icons/MaskGroup.png")}
          /> */}
          <Image
            source={{
              uri: `https://stagingapi.watermelon.market/upload/upload_photo/${image}`,
            }}
            style={GlobalStyles.allOrdersImage}
          ></Image>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>Welcome Uni</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <View style={{ marginTop: -30 }}>
            {/* <View style={stylesSidebar.profileHeaderLine} /> */}
            <DrawerItem
              icon={() => (
                <Dashboard
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: "#11203D" }}>Dashboard</Text>
              )}
              onPress={() =>
                props.navigation.navigate("DashboardContentScreen")
              }
            />

            <DrawerItem
              icon={() => (
                <CatalogueIcon
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Catelogue</Text>
              )}
              onPress={() => goToStack("Catelogue")}
            />
            <DrawerItem
              icon={() => (
                <InventoryIcon
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Inventory</Text>
              )}
              onPress={() => goToStack("InventoryScreen")}
            />
            <DrawerItem
              icon={() => (
                <Invoices
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Invoices</Text>
              )}
              onPress={() => goToStack("InvoiceScreen")}
            />
            <DrawerItem
              icon={() => (
                <Review
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>
                  Review & Rating
                </Text>
              )}
              onPress={() => goToStack("ReviewRatingScreen")}
            />
            <DrawerItem
              icon={() => (
                <SupplierProfileIcon
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Buyers</Text>
              )}
              onPress={() => goToStack("BuyersScreen")}
            />

            <DrawerItem
              icon={() => (
                <Payments
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Payments</Text>
              )}
              onPress={() => goToStack("PaymentScreen")}
            />

            <DrawerItem
              icon={() => (
                <Promotions
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>Promotions</Text>
              )}
              onPress={() => goToStack("PromotionScreen")}
            />

            <DrawerItem
              icon={() => (
                <Myoffers
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>My Offers</Text>
              )}
              onPress={() => goToStack("MyOffersScreen")}
            />

            <View style={stylesSidebar.profileHeaderLine} />
            <DrawerItem
              icon={() => (
                <Account
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>
                  Account Settings
                </Text>
              )}
              onPress={() => goToStack("AccountSettingScreen")}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name="options-outline"
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>
                  App Settings
                </Text>
              )}
              onPress={() => goToStack("AppSettingsScreen")}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name="options-outline"
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput }}>
                  Change Password
                </Text>
              )}
              onPress={() => goToStack("ChangePassword")}
            />
            <DrawerItem
              icon={() => (
                <Ionicons
                  name="power-outline"
                  size={18}
                  style={{
                    alignSelf: "center",
                    marginLeft: 0,
                    marginRight: -20,
                  }}
                />
              )}
              label={({ color }) => (
                <Text style={{ color: COLORS.loginTextInput, paddingLeft: 0 }}>
                  Logout
                </Text>
              )}
              onPress={() => {
                props.navigation.toggleDrawer();
                Alert.alert(
                  "Logout",
                  "Are you sure to logout?",
                  [
                    {
                      text: "Cancel",
                      onPress: () => {
                        return null;
                      },
                    },
                    {
                      text: "Confirm",
                      onPress: () => {
                        AsyncStorage.clear();
                        props.navigation.replace("LoginScreen");
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            />
          </View>
        </DrawerContentScrollView>
      </ScrollView>
    </View>
  );
};

export default CustomSidebarMenu;

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    paddingTop: 0,
    color: "white",
  },
  profileHeader: {
    flexDirection: "row",
    backgroundColor: "#1F9CEF",
    padding: 15,
    textAlign: "center",
    paddingTop: 50,
    paddingBottom: 24,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: "white",
    backgroundColor: "#ffffff",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeaderText: {
    color: "white",
    alignSelf: "center",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: "#e2e2e2",
    marginTop: 15,
  },
});
