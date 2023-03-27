/** @format */

import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Appbar, Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalStyles from "../../../assets/css/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MenuIcon from "../../../assets/images/icons/MenuIcon";
import Bell from "../../../assets/images/icons/Bell";
import { FloatingAction } from "react-native-floating-action";

import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
import styles from "../../../assets/css/styles";
import Editcatelogue from "./Editcatelogue";
import SearchIcon from "../../../assets/images/icons/Search";
import SubCatalogueCard from "./SubCatalogueCard";
import AllCataloguesCard from "./AllCataloguesCard";
import SvgUri from "react-native-svg-uri-updated";
import AllTiersCard from "./AllTiersCard";
import Edittier from "./Edittier";
import ImportCatalogueScreen from "./ImportCatalogueScreen";

export default function Catelogue({ navigation }) {
  const [Productsdata, setProductsdata] = useState([]);
  const [filterdData, setfilterdData] = useState([]);
  const [filterdData1, setfilterdData1] = useState([]);
  console.log(filterdData1, "filterdData1");
  const [tierdata, settierdata] = useState([]);
  const [allCatalogues, setallCatalogues] = useState(true);
  const [tier, settier] = useState(false);
  const [subCatalogue, setsubCatalogue] = useState(false);
  const [importCatalogue, setimportCatalogue] = useState(false);
  const [search, setSearch] = useState("");
  const [myproducts, setmyproducts] = useState();
  const [mytiers, setmytiers] = useState();

  useEffect(() => {
    getTiers();
    getProducts();
  }, []);

  const onPressofCatalogues = () => {
    settier(false);
    setsubCatalogue(false);
    setimportCatalogue(false);
    setallCatalogues(true);
  };

  const onPressofSubCatalogue = () => {
    settier(false);

    setimportCatalogue(false);
    setallCatalogues(false);
    setsubCatalogue(true);
  };

  const onPressofTier = () => {
    setimportCatalogue(false);
    setallCatalogues(false);
    setsubCatalogue(false);
    settier(true);
  };

  const onPressofImportCatalogue = () => {
    setallCatalogues(false);
    setsubCatalogue(false);
    settier(false);
    setimportCatalogue(true);
  };

  //search function
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = Productsdata.filter((item) => {
        const itemData = item.product_name
          ? item.category_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData(newData);
      setSearch(text);
    } else {
      setfilterdData(Productsdata);
      setSearch(text);
    }
  };

  //search function
  const searchFilterFunction1 = (text) => {
    if (text) {
      const newData = tierdata.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setfilterdData1(newData);
      setSearch(text);
    } else {
      setfilterdData1(tierdata);
      setSearch(text);
    }
  };
  //getproducts
  const getProducts = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");

    let token = jsonValue;
    var myJson = {
      user_type_id: "5fe9c03ab70cb405ba5dcb33",
    };
    const result = await api.getProduct(token, endPoint.get_products, myJson);
    console.log(result.data, "090909878");

    if (result) {
      setmyproducts(result);
      setProductsdata(result.data);
      setfilterdData(result.data);
    } else {
      setProductsdata([]);
    }
  };
  //gettiers
  const getTiers = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      supplier_id: " ",
    };
    const result = await api.getTier(token, endPoint.get_tiers, myJson);
    console.log(result.data, "WERTY");

    if (result) {
      setmytiers(result);
      settierdata(result.data);
      setfilterdData1(result.data);
    } else {
      settierdata([]);
    }
  };
  //TO Give padding between the flatlist
  const ItemSepartorView = () => {
    return <View style={{ height: 0, width: "100%" }} />;
  };

  return (
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
              </View>
              <Text style={GlobalStyles.menuText}>
                Unibic Dubai International
              </Text>
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
        <ScrollView
          style={{ paddingBottom: 15 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: "auto" }}
        >
          <View style={GlobalStyles.orderTabDirection}>
            <Pressable onPress={() => onPressofCatalogues()}>
              {allCatalogues ? (
                <View style={GlobalStyles.allOrderView}>
                  <Text style={GlobalStyles.allOrderOnpressText}>
                    Catalogue
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={GlobalStyles.allOrderText}>Catalogue</Text>
                </View>
              )}
            </Pressable>

            <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofSubCatalogue()}>
                {subCatalogue ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      Sub Catalogue
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>Sub Catalogue</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofTier()}>
                {tier ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      Pricing Tier
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>Pricing Tier</Text>
                  </View>
                )}
              </Pressable>
            </View>

            <View style={GlobalStyles.prendingAccecptance}>
              <Pressable onPress={() => onPressofImportCatalogue()}>
                {importCatalogue ? (
                  <View style={GlobalStyles.pendingAcceptanceOnpressView}>
                    <Text style={GlobalStyles.pendingOnPressText}>
                      Import Catalogue
                    </Text>
                  </View>
                ) : (
                  <View style={GlobalStyles.pendingAcceptanceView}>
                    <Text style={GlobalStyles.pendingText}>
                      Import Catalogue
                    </Text>
                  </View>
                )}
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>

      {allCatalogues ? (
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              height: 38,
              width: "100%",
              paddingLeft: 19,
              paddingRight: 18,
              marginTop: 19,
            }}
          >
            <View>
              <Searchbar
                style={[styles.searchBarStyle]}
                inputStyle={[
                  GlobalStyles.font12,
                  GlobalStyles.textBlack,
                  GlobalStyles.searchinput,
                ]}
                placeholderTextColor={"#0F141A"}
                placeholder="Search"
                value={search}
                icon={{ display: "none" }}
                onChangeText={(text) => searchFilterFunction(text)}
              />
              <SvgUri
                source={require("../../../assets/images/dashboard/input_search_icon.svg")}
                style={[GlobalStyles.searchIcon]}
              />
              <TouchableOpacity
                style={[
                  GlobalStyles.filterBlk,
                  GlobalStyles.flexRow,
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                ]}
              >
                <SvgUri
                  source={require("../../../assets/images/dashboard/filter_icon.svg")}
                />
              </TouchableOpacity>
              <View></View>
            </View>
          </View>

          <View
            style={{
              paddingLeft: 18,
              paddingRight: 19,
              paddingTop: 19,
              width: "100%",
              // backgroundColor: "red",
              marginBottom: 260,
            }}
          >
            {!myproducts ? (
              <View>
                <ActivityIndicator color={"#1F9CEF"} size="large" />
              </View>
            ) : (
              <FlatList
                data={filterdData}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={ItemSepartorView}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() =>
                      navigation.navigate("Editcatelogue", {
                        id: item?._id,
                        product_image: item?.product_image,
                        supplier_product_code: item?.supplier_product_code,
                        product_code: item?.product_code,
                        product_name: item?.product_name,
                        category_name: item?.category_name,
                        product_image: item?.product_image,
                      })
                    }
                  >
                    <AllCataloguesCard
                      id={item?._id}
                      // title={title}
                      supplier_product_code={item?.supplier_product_code}
                      product_code={item?.product_code}
                      product_name={item?.product_name}
                      category_name={item?.category_name}
                      in_stack={item?.in_stock}
                      subcategory_name={item?.subcategory_name}
                      product_image={item?.product_image}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>
      ) : null}
      {subCatalogue ? (
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              height: 38,
              width: "100%",
              paddingLeft: 19,
              paddingRight: 18,
              marginTop: 19,
            }}
          >
            <View>
              <Searchbar
                style={[styles.searchBarStyle]}
                inputStyle={[
                  GlobalStyles.font12,
                  GlobalStyles.textBlack,
                  GlobalStyles.searchinput,
                ]}
                placeholderTextColor={"#0F141A"}
                placeholder="Search"
                value={search}
                icon={{ display: "none" }}
                onChangeText={(text) => searchFilterFunction(text)}
              />
              <SvgUri
                source={require("../../../assets/images/dashboard/input_search_icon.svg")}
                style={[GlobalStyles.searchIcon]}
              />
              <TouchableOpacity
                style={[
                  GlobalStyles.filterBlk,
                  GlobalStyles.flexRow,
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                ]}
              >
                <SvgUri
                  source={require("../../../assets/images/dashboard/filter_icon.svg")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              paddingLeft: 18,
              paddingRight: 19,
              paddingTop: 19,
              width: "100%",
              // backgroundColor: "red",
              marginBottom: 260,
            }}
          >
            {!myproducts ? (
              <View>
                <ActivityIndicator color={"#1F9CEF"} size="large" />
              </View>
            ) : (
              <FlatList
                data={filterdData}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={ItemSepartorView}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() =>
                      navigation.navigate("Editcatelogue", {
                        _id: item?._id,
                        product_image: item?.product_image,
                        supplier_product_code: item?.supplier_product_code,
                        product_code: item?.product_code,
                        product_name: item?.product_name,
                        category_name: item?.category_name,
                        product_image: item?.product_image,
                      })
                    }
                  >
                    <SubCatalogueCard
                      category_name={item?.category_name}
                      sku_name={item?.sku_name}
                      product_code={item?.product_code}
                      in_stack={item?.in_stock}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>
      ) : null}

      {tier ? (
        <View
          style={{
            width: "100%",
          }}
        >
          <View
            style={{
              height: 38,
              width: "100%",
              paddingLeft: 19,
              paddingRight: 18,
              marginTop: 19,
            }}
          >
            <View>
              <Searchbar
                style={[styles.searchBarStyle]}
                inputStyle={[
                  GlobalStyles.font12,
                  GlobalStyles.textBlack,
                  GlobalStyles.searchinput,
                ]}
                placeholderTextColor={"#0F141A"}
                placeholder="Search"
                value={search}
                icon={{ display: "none" }}
                onChangeText={(text) => searchFilterFunction1(text)}
              />
              <SvgUri
                source={require("../../../assets/images/dashboard/input_search_icon.svg")}
                style={[GlobalStyles.searchIcon]}
              />
              <TouchableOpacity
                style={[
                  GlobalStyles.filterBlk,
                  GlobalStyles.flexRow,
                  GlobalStyles.alignCenter,
                  GlobalStyles.justifyCenter,
                ]}
              >
                <SvgUri
                  source={require("../../../assets/images/dashboard/filter_icon.svg")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              paddingLeft: 18,
              paddingRight: 19,
              paddingTop: 19,
              width: "100%",
              // backgroundColor: "red",
              marginBottom: 260,
            }}
          >
            {!myproducts ? (
              <View>
                <ActivityIndicator color={"#1F9CEF"} size="large" />
              </View>
            ) : (
              <FlatList
                data={filterdData1}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={ItemSepartorView}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() =>
                      navigation.navigate("Edittier", {
                        id: item?._id,
                        tierName: item?.name,
                        amountType: item?.amount_type,
                        value: item?.discount_price,
                      })
                    }
                  >
                    <AllTiersCard
                      id={item?._id}
                      tierName={item?.name}
                      amountType={item?.amount_type}
                      value={item?.discount_price}
                    />
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>
      ) : null}
      {importCatalogue ? <ImportCatalogueScreen /> : null}
      {allCatalogues && (
        <View style={GlobalStyles.addButton1}>
          <Pressable onPress={() => navigation.navigate("AddCatalogueScreen")}>
            <Text style={GlobalStyles.stictyText1}>+</Text>
          </Pressable>
        </View>
        // <FloatingAction
        //   onPressMain={() => navigation.navigate("AddCatalogueScreen")}
        //   color={"#1F9CEF"}
        //   default={{
        //     shadowOpacity: 0,

        //   }}
        //   buttonSize={64}
        //   iconWidth={20}
        //   iconHeight={20}
        //   animated={false}
        // />
      )}
      {tier && (
        <View style={GlobalStyles.addButton1}>
          <Pressable onPress={() => navigation.navigate("Addtier")}>
            <Text style={GlobalStyles.stictyText1}>+</Text>
          </Pressable>
        </View>
      )}
      {subCatalogue && (
        <View style={GlobalStyles.addButton1}>
          <Pressable onPress={() => navigation.navigate("AddSubCatalogue")}>
            <Text style={GlobalStyles.stictyText1}>+</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
