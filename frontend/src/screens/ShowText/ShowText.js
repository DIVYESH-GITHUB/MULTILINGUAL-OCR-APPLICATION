import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import navigationStrings from "../../navigations/navigationStrings";

const ShowText = ({ route }) => {
  const extractedText = route.params.extractedText;
  const navigation = useNavigation();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(extractedText);
    ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT);
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.text}>{extractedText}</Text>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            padding: 15,
            borderRadius: 15,
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 20,
            flexDirection: "row",
          }}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="arrow-rotate-right" size={24} color="white" />
          <Text
            style={{
              color: "white",
              letterSpacing: 1,
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            Take Again
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: colors.background,
            padding: 15,
            borderRadius: 15,
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={copyToClipboard}
        >
          <FontAwesome6 name="clipboard" size={24} color="white" />
          <Text
            style={{
              color: "white",
              letterSpacing: 1,
              fontWeight: "600",
              marginLeft: 10,
            }}
          >
            Copy Text
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "red",
          padding: 15,
          borderRadius: 15,
          marginTop: 20,
          width: "85%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        onPress={() =>
          navigation.navigate(
            navigationStrings.Pdf,
            (params = { extractedText: extractedText })
          )
        }
      >
        <FontAwesome6 name="file-pdf" size={24} color="white" />
        <Text
          style={{
            color: "white",
            letterSpacing: 1,
            fontWeight: "600",
            marginLeft: 10,
          }}
        >
          Convert to PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  scrollViewContainer: {
    marginTop: "10%",
    width: "90%",
    borderWidth: 1,
    height: "70%",
    borderColor: "black",
    overflow: "hidden",
  },
  scrollViewContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
});

export default ShowText;
