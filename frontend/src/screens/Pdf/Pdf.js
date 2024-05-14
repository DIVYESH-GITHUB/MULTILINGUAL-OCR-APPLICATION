import * as React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import colors from "../../constants/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// create a component
const Pdf = ({ route }) => {
  const extractedText = route.params.extractedText;

  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const html = `<h1>${extractedText}</h1>`;

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  return (
    <View style={styles.container}>
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
        onPress={print}
      >
        <FontAwesome5 name="save" size={24} color="white" />
        <Text
          style={{
            color: "white",
            letterSpacing: 1,
            fontWeight: "600",
            marginLeft: 10,
          }}
        >
          Save PDF
        </Text>
      </TouchableOpacity>
      <View style={styles.spacer} />
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
        onPress={printToFile}
      >
        <FontAwesome name="share-alt" size={24} color="white" />
        <Text
          style={{
            color: "white",
            letterSpacing: 1,
            fontWeight: "600",
            marginLeft: 10,
          }}
        >
          Share PDF
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});

//make this component available to the app
export default Pdf;
