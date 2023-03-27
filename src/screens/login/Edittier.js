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
  SafeAreaView,
  TextInput,
  Pressable,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalSelector from "react-native-modal-selector";
import { Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../../../assets/css/styles";
import SvgUri from "react-native-svg-uri-updated";
import GlobalStyles from "../../../assets/css/styles";
import api from "../../screens/Services/API/CallingApi";
import { endPoint } from "../../screens/Services/API/ApiConstants";
export default function Edittier({ route, navigation }) {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [id, setId] = useState(route.params.id);
  //const[name,setname]=useState(route.params.tierName)

  const [tierName, setTierName] = useState(route.params.tierName);
  const [amountType, setamountType] = useState(route.params.amountType);
  const [value1, setValue1] = useState(route.params.value);
  console.log(typeof route.params.value, "9078776");
  // const[TierData,setTierData] = useState('false');

  const onSubmit = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;

    var myJson = {
      id: id,
      amount_type: amountType,
      discount_price: value1,
      name: tierName,
      platform: "",
      supplier_id: "76786457234868787",
      status: "",
    };
    console.log(myJson, "9900tyu90");
    const result = await api.edittier(token, endPoint.edit_tier, myJson);
    console.log(result.message, "TYUYU878");
    if (result) {
      alert(result.message);
      navigation.goBack();
    } else {
    }
  };

  return (
    <SafeAreaView style={[styles.width100, styles.flex1]}>
      <ScrollView style={[styles.grayBg, styles.width100]}>
        <View
          style={[
            styles.signupTitle,
            styles.mb28,
            styles.primaryBg,
            styles.flexRow,
            styles.alignCenter,
            styles.headerShadow,
          ]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <SvgUri
              source={require("../../../assets/images/dashboard/white_left_arrow.svg")}
            />
          </TouchableOpacity>
          <Text
            style={[
              styles.font16,
              styles.textWhite,
              styles.padl15,
              styles.fontMed,
            ]}>
            {" "}
            Edit Tier{" "}
          </Text>
        </View>

        <View style={[styles.ph18, styles.mb18, styles.width100]}>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Tier Name <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>
            <View>
              <Controller
                name='tierName'
                control={control}
                //   rules={{
                //     required: "Tier is required.",
                //   }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(tierName) => {
                      setTierName(tierName);
                      props.field.onChange(tierName);
                    }}
                    value={tierName}
                  />
                )}
              />
              {errors && errors.tierName && (
                <Text style={[styles.errorMsg]}>Tier name is required.</Text>
              )}
            </View>
          </View>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Select Amount Type{" "}
              <Text style={[styles.textred, styles.font13]}>*</Text>
            </Text>

            <View>
              <Controller
                name='amountType'
                control={control}
                //   rules={{
                //     required: "Amount type is required.",
                //   }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor='#222B2E'
                    onChangeText={(amountType) => {
                      setamountType(amountType);
                      props.field.onChange(amountType);
                    }}
                    value={amountType}
                  />
                )}
              />
              {errors && errors.amountType && (
                <Text style={[styles.errorMsg]}>Amount type is required.</Text>
              )}
            </View>
          </View>
          <View style={styles.inputView}>
            <Text
              style={[
                styles.textDefault,
                styles.font12,
                styles.fontMed,
                styles.marBtm4,
              ]}>
              Value(%)
            </Text>
            <View>
              <Controller
                name='value1'
                control={control}
                //   rules={{
                //     required: "Value is required.",
                //   }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    keyboardType='numeric'
                    placeholderTextColor='#222B2E'
                    value={value1.toString()}
                    onChangeText={(value1) => {
                      setValue1(value1);
                      props.field.onChange(value1);
                    }}
                  />
                )}
              />
              {errors && errors.value1 && (
                <Text style={[styles.errorMsg]}>Tier name is required.</Text>
              )}
            </View>
          </View>

          <View style={[styles.flexRow, styles.alignCenter, styles.mt18]}>
            <View style={[styles.width50, styles.pr15]}>
              <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                <Button
                  style={[
                    styles.primaryBg,
                    styles.saveBtn,
                    styles.width100,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}>
                  <Text
                    style={[
                      styles.font15,
                      styles.letterSpa33,
                      styles.textWhite,
                    ]}>
                    Submit
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
            <View style={[styles.width50, styles.pl15]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Button
                  style={[
                    styles.cancelStyle,
                    styles.saveBtn,
                    styles.width100,
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifyCenter,
                  ]}>
                  <Text
                    style={[styles.font15, styles.letterSpa33, styles.textPri]}>
                    Cancel
                  </Text>
                </Button>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
