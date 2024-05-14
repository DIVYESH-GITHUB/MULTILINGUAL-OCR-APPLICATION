//import liraries
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
  Text,
  Image,
  Keyboard,
  Alert,
} from "react-native";
import colors from "../../constants/colors";
import {
  responsiveHeight as h,
  responsiveFontSize as f,
  responsiveScreenWidth as w,
} from "react-native-responsive-dimensions";
import Input from "../../components/input";
import Button from "../../components/button";
import AuthNavigate from "../../components/authNavigate";
import navigationStrings from "../../navigations/navigationStrings";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../../constants/backendUrl";

// create a component
const Login = () => {
  const [showLoading, setShowLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const validate = () => {
    if (email == "") {
      Alert.alert("Login Error", "Email not provided");
      return false;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      Alert.alert("Login Error", "Email is not valid");
      return false;
    }
    if (password == "") {
      Alert.alert("Login Error", "Password not provided");
      return false;
    }
    if (password.length <= 6) {
      Alert.alert(
        "Login Error",
        "Password length should be more than 6 characters"
      );
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    setShowLoading(true);
    if (validate()) {
      await axios
        .post(`http://${url}:3000/api/v1/users/login`, {
          emailOrUsername: email,
          password: password,
        })
        .then(async (response) => {
          if (response.status == 200) {
            setShowLoading(false);
            Alert.alert("Login Success", response.data.message);
            console.log(response.data.data.user);
            try {
              await AsyncStorage.setItem(
                "userData",
                JSON.stringify(response.data.data.user)
              );
              navigation.navigate(navigationStrings.TabRoutes);
            } catch (error) {
              console.log("Error saving data: ", error);
            }
          }
        })
        .catch((error) => {
          setShowLoading(false);
          Alert.alert("Login Error", error.response.data.errorMessage);
        });
    } else {
      setShowLoading(false);
      return;
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={"light-content"}
        />
        <View>
          <Image
            source={require("../../../assets/login.png")}
            style={{
              height: h(35),
              width: w(80),
              alignSelf: "center",
              marginBottom: h(2),
            }}
          />
          <Text style={styles.login}>Login</Text>

          <Text style={styles.info}>Please sign in to continue</Text>

          <Input
            iconName={"mail"}
            onChangeText={(text) => setEmail(text)}
            placeholder={"user123@gmail.com"}
            text={"Email or Username"}
            value={email}
          />

          <Input
            iconName={"lock"}
            onChangeText={(text) => setPassword(text)}
            placeholder={"#123Hello"}
            text={"Password "}
            value={password}
          />

          <Button
            onPress={async () => await handleLogin()}
            text={"LOGIN"}
            showLoading={showLoading}
          />

          <Text style={styles.forgotPassword}>Forgot Password?</Text>

          <AuthNavigate
            onPress={() => navigation.navigate(navigationStrings.Register)}
            text1={"Don't have an account?"}
            text2={" Sign Up"}
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
    paddingHorizontal: w(5),
  },
  login: {
    color: "white",
    fontSize: f(4.4),
    fontWeight: "600",
    letterSpacing: 1,
  },
  info: {
    color: colors.secondfontcolor,
    fontSize: f(2.6),
    fontWeight: "600",
    letterSpacing: 1,
    marginTop: h(0.9),
    marginBottom: h(1.3),
  },
  forgotPassword: {
    color: colors.neoncolor,
    marginTop: h(3),
    alignSelf: "center",
    fontSize: f(2.2),
    padding: h(0.5),
  },
});

//make this component available to the app
export default Login;
