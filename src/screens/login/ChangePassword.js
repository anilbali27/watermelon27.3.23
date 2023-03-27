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
  Pressable,
  Dimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import GlobalStyles from "../../../assets/css/styles";
import styles from "../../../assets/css/styles";
import SvgUri from "react-native-svg-uri-updated";
import BackArrow from "../../../assets/images/icons/BackArrow";
import { useForm, Controller } from "react-hook-form";

import { endPoint } from "../../screens/Services/API/ApiConstants";
import api from "../../screens/Services/API/CallingApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

const ChangePassword = ({ navigation }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
    getValues,
    setValue,
  } = useForm();
  const [old_password, setold_password] = useState("");
  const [new_password, setnew_password] = useState("");
  console.log(new_password, "new_password");
  const [confirm_password, setconfirm_password] = useState("");
  const [rightIcon, setRightIcon] = useState("eye");
  const [rightIcon1, setRightIcon1] = useState("eye");
  const [rightIcon2, setRightIcon2] = useState("eye");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [passwordVisibility1, setPasswordVisibility1] = useState(true);
  const [passwordVisibility2, setPasswordVisibility2] = useState(true);
  const [profileDatta, setProfileDatta] = useState([]);
  const [password, setPassword] = useState("");
  const storedPassword = password;
  const userPassword = "myPassword123";

  const PASSWORD_REGEX1 = new_password;
  const PASSWORD_REGEX = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]{4,}$/;
  // bcrypt.compare(userPassword, apiPassword, function(err, result) {
  //   if (err) {
  //     console.log("Error comparing passwords:", err);
  //   } else if (result === true) {
  //     console.log("Passwords match!");
  //   } else {
  //     console.log("Passwords do not match!");
  //   }
  // });
  useEffect(() => {
    getProfile();
  }, []);

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
    } else {
      setRightIcon("eye");
    }
    setPasswordVisibility(!passwordVisibility);
  };
  const handlePasswordVisibility1 = () => {
    if (rightIcon1 === "eye") {
      setRightIcon1("eye-off");
    } else {
      setRightIcon1("eye");
    }
    setPasswordVisibility1(!passwordVisibility1);
  };

  const handlePasswordVisibility2 = () => {
    if (rightIcon2 === "eye") {
      setRightIcon2("eye-off");
    } else {
      setRightIcon2("eye");
    }
    setPasswordVisibility2(!passwordVisibility2);
  };

  const getProfile = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    const jsonId = await AsyncStorage.getItem("id");
    console.log(jsonId, "jsonId");
    let token = jsonValue;
    var myJson = {
      id: jsonId,
    };

    const result = await api.getProfile(token, endPoint.get_profile, myJson);
    console.log(result, "getprofile");

    if (result) {
      setProfileDatta(result.data);
      setPassword(result.data.password);
    } else {
      setProfileDatta([]);
    }
  };
  const onChangePassword = async () => {
    const jsonValue = await AsyncStorage.getItem("UserToken");
    let token = jsonValue;
    var myJson = {
      old_password: old_password,
      new_password: new_password,
      confirm_password: confirm_password,
    };

    const result = await api.ChangePassword(
      token,
      endPoint.CHANGE_PASSWORD,
      myJson
    );
    setnew_password(result);
    console.log(result, "uyty76");
    if (result.success == "1") {
      // setnew_password(false);
      navigation.replace("LoginScreen");
      Toast.show("Password has been changed");
    } else {
      // setnew_password(result.data);
      alert("Password has been not changed");
      navigation.replace("LoginScreen");
    }
  };
  return (
    <View style={GlobalStyles.signupContainer}>
      <View style={GlobalStyles.promotionsHeaderContainer}>
        <View style={GlobalStyles.PromotionScreenIconView}>
          <Pressable
            onPress={() => {
              //   navigation.navigate("DrawerNavigationRoutes");
              navigation.goBack();
            }}
          >
            <BackArrow />
          </Pressable>
          <Text style={GlobalStyles.promotionsHeaderText}>ChangePassword</Text>
        </View>
      </View>

      <View style={{ padding: 20 }}>
        <View style={styles.inputView}>
          <Text
            style={[
              styles.textDefault,
              styles.font12,
              styles.fontMed,
              styles.marBtm4,
            ]}
          >
            Current Password{" "}
            <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name="old_password"
                control={control}
                rules={{
                  required: "Current password is required.",
                  pattern: {
                    value: PASSWORD_REGEX1,
                    message: "Please enter correct old password.",
                  },
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor="#222B2E"
                    onChangeText={(old_password) => {
                      setold_password(old_password);
                      props.field.onChange(old_password);
                    }}
                    value={old_password}
                    secureTextEntry={!passwordVisibility}
                  />
                )}
              />
              <Pressable
                style={[GlobalStyles.passwordalign]}
                onPress={handlePasswordVisibility}
              >
                <MaterialCommunityIcons
                  name={rightIcon}
                  size={24}
                  color="#222B2E"
                  // style={GlobalStyles.passwordIcon}
                />
              </Pressable>
            </View>
            {errors && errors.old_password && (
              <Text style={[styles.errorMsg]}>
                Current Password is required.
              </Text>
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
            ]}
          >
            New Password <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name="new_password"
                control={control}
                rules={{
                  required: "New password is required.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message: "Password length should be 4 minimum.",
                  },
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor="#222B2E"
                    onChangeText={(new_password) => {
                      setnew_password(new_password);
                      props.field.onChange(new_password);
                    }}
                    value={new_password}
                    secureTextEntry={!passwordVisibility1}
                  />
                )}
              />
              <Pressable
                style={[GlobalStyles.passwordalign]}
                onPress={handlePasswordVisibility1}
              >
                <MaterialCommunityIcons
                  name={rightIcon1}
                  size={24}
                  color="#222B2E"
                  // style={GlobalStyles.passwordIcon}
                />
              </Pressable>
            </View>
            {/* {errors && errors.new_password && (
                <Text style={[styles.errorMsg]}>New Password is required.</Text>
              )} */}
            {errors && errors.new_password && (
              <Text style={[styles.errorMsg]}>
                {errors.new_password.message}
              </Text>
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
            ]}
          >
            Confirm Password{" "}
            <Text style={[styles.textred, styles.font13]}>*</Text>
          </Text>
          <View>
            <View>
              <Controller
                name="confirm_password"
                control={control}
                rules={{
                  required: "Confirm password is required.",
                  pattern: {
                    value: PASSWORD_REGEX,
                    message:
                      "The confirm password and new password must match.",
                  },
                }}
                render={(props) => (
                  <TextInput
                    style={[
                      styles.inputStyle,
                      styles.borderRadius0,
                      styles.borderDefault,
                    ]}
                    placeholderTextColor="#222B2E"
                    onChangeText={(confirm_password) => {
                      setconfirm_password(confirm_password);
                      props.field.onChange(confirm_password);
                    }}
                    value={confirm_password}
                    secureTextEntry={!passwordVisibility2}
                  />
                )}
              />
              <Pressable
                style={[GlobalStyles.passwordalign]}
                onPress={handlePasswordVisibility2}
              >
                <MaterialCommunityIcons
                  name={rightIcon2}
                  size={24}
                  color="#222B2E"
                  // style={GlobalStyles.passwordIcon}
                />
              </Pressable>
            </View>

            {errors && errors.confirm_password && (
              <Text style={[styles.errorMsg]}>
                {errors.confirm_password.message}
              </Text>
            )}
          </View>
        </View>
        <TouchableOpacity
          style={GlobalStyles.loginBtn}
          onPress={handleSubmit(onChangePassword)}
        >
          <Text
            style={GlobalStyles.loginText}
            onPress={handleSubmit(onChangePassword)}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChangePassword;
