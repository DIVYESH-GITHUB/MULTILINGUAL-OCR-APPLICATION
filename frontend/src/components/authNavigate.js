//import liraries
import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  responsiveHeight as h,
  responsiveFontSize as f,
} from "react-native-responsive-dimensions";
import colors from "../constants/colors";

// create a component
const AuthNavigate = ({ onPress, text1, text2 }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text1}>{text1}</Text>
      <Text style={styles.text2}>{text2}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: h(2),
  },
  text1: { color: colors.secondfontcolor, fontSize: f(2.2) },
  text2: {
    color: colors.neoncolor,
    fontSize: f(2.2),
    fontWeight: "800",
  },
});

export default AuthNavigate;
