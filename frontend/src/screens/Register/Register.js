//import liraries
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import {
  responsiveHeight as h,
  responsiveWidth as w,
  responsiveFontSize as f,
} from "react-native-responsive-dimensions";
import { useNavigation } from "@react-navigation/native";
import Input from "../../components/input";
import Button from "../../components/button";
import AuthNavigate from "../../components/authNavigate";
import navigationStrings from "../../navigations/navigationStrings";
import axios from "axios";
import { url } from "../../constants/backendUrl";

// create a component
const Register = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const validate = () => {
    if (email == "") {
      Alert.alert("Registration Error", "Email not provided");
      return false;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      Alert.alert("Registration Error", "Email is not valid");
      return false;
    }
    if (userName == "") {
      Alert.alert("Registration Error", "Username not provided");
      return false;
    }
    if (!userName.match("^[a-z0-9_-]{3,16}$")) {
      Alert.alert("Registration Error", "Username is not valid");
      return false;
    }
    if (password == "") {
      Alert.alert("Registration Error", "Password not provided");
      return false;
    }
    if (password.length <= 6) {
      Alert.alert(
        "Registration Error",
        "Password length should be more than 6 characters"
      );
      return false;
    }
    if (password != confirmPassword) {
      Alert.alert("Registration Error", "Passwords doesn't match");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    setShowLoading(true);

    if (validate()) {
      await axios
        .post(`http://${url}:3000/api/v1/users/register`, {
          email: email,
          userName: userName,
          password: password,
          confirmPassword: confirmPassword,
        })
        .then((response) => {
          if (response.status == 201) {
            setShowLoading(false);
            Alert.alert("Registration Success", response.data.message);
            navigation.canGoBack()
              ? navigation.goBack()
              : navigation.navigate(navigationStrings.Login);
          }
        })
        .catch((error) => {
          setShowLoading(false);
          Alert.alert("Registration Error", error.response.data.errorMessage);
        });
    } else {
      setShowLoading(false);
      return;
    }
  };

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar
          barStyle={"light-content"}
          backgroundColor={colors.background}
        />
        <View>
          {/* Back button to Login */}
          <Ionicons
            name="arrow-back-outline"
            size={h(4)}
            color="white"
            style={{ marginVertical: h(3.5) }}
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate(navigationStrings.Login)
            }
          />

          {/* Main Create account Text */}
          <Text style={styles.text1}>Create Account</Text>

          {/* info about screen */}
          <Text style={styles.text2}>Please fill the input blow here</Text>

          {/* Email input */}
          <Input
            text={"Email"}
            placeholder={"divyesh@gmail.com"}
            iconName={"mail"}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />

          {/* userName input */}
          <Input
            text={"User Name"}
            placeholder={"Jhoe Williams"}
            iconName={"user"}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />

          {/* password input */}
          <Input
            text={"Password"}
            placeholder={"***********"}
            iconName={"lock"}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />

          {/* confirmPassword input */}
          <Input
            text={"Confirm Password"}
            placeholder={"***********"}
            iconName={"lock"}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          {/* signUp button */}
          <Button
            onPress={async () => await handleSignUp()}
            text={"SIGN UP"}
            showLoading={showLoading}
          />

          {/* move to Login screen */}
          <AuthNavigate
            onPress={() =>
              navigation.canGoBack()
                ? navigation.goBack()
                : navigation.navigate(navigationStrings.Login)
            }
            text1={"Already have an account?"}
            text2={" Login"}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: w(4),
  },
  text1: {
    color: colors.white,
    fontSize: f(4),
    fontWeight: "bold",
    marginBottom: h(1),
  },
  text2: {
    color: colors.secondfontcolor,
    fontSize: f(2.5),
    fontWeight: "bold",
    marginBottom: h(5),
  },
});

//make this component available to the app
export default Register;
