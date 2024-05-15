import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  ScrollView,
} from "react-native";
import colors from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import navigationStrings from "../../navigations/navigationStrings";

const ShowText = ({ route }) => {
  const extractedText = route.params.extractedText;
  const [text, setText] = useState(extractedText);
  const navigation = useNavigation();

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    ToastAndroid.show("Text copied to clipboard", ToastAndroid.SHORT);
  };

  return (
    <ScrollView showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        <TextInput
          style={{
            width: "90%",
            marginTop: 15,
            minHeight: 100,
            maxHeight : 570,
            fontSize: 16,
            color: "black",
            borderColor: "black",
            borderWidth: 2,
            padding: 10,
            borderRadius: 10,
          }}
          autoFocus
          cursorColor={"black"}
          value={text}
          onChangeText={(x) => {
            setText(x);
          }}
          multiline
          numberOfLines={3}
        />
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default ShowText;
