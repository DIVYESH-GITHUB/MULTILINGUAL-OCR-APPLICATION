import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  StatusBar,
  Modal,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { url } from "../../constants/backendUrl";
import { useNavigation } from "@react-navigation/native";
import navigationStrings from "../../navigations/navigationStrings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import colors from "../../constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";
import { languageCodes } from "./codes.js";

const Home = () => {
  const navigation = useNavigation();

  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("eng");

  const [items, setItems] = useState(
    Object.entries(languageCodes).map(([label, value]) => ({
      label,
      value,
    }))
  );

  const uploadImage = async (mode) => {
    try {
      let result;
      if (mode === "gallery") {
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        setShowModal(true);
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();
        setShowModal(true);
        result = await ImagePicker.launchCameraAsync({
          cameraType: ImagePicker.CameraType.back,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }
      if (!result.canceled) {
        handleImageUpload(result.assets[0].uri);
      } else {
        setShowModal(false);
      }
    } catch (error) {
      Alert.alert("Error occurred", error.message);
    }
  };

  const handleImageUpload = async (imageUri) => {
    let userData = await AsyncStorage.getItem("userData");
    userData = JSON.parse(userData);
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: imageUri,
        type: "image/jpeg",
        name: "image.jpg",
      });
      formData.append("userData", JSON.stringify(userData));
      formData.append("language", value);

      const response = await axios.post(
        `http://${url}:3000/api/v1/image/extract-text`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log(response.data.data.extractedText);

        Alert.alert("Image Uploaded Successfully");
        navigation.navigate(
          navigationStrings.ShowText,
          (params = { extractedText: response.data.data.extractedText })
        );
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      Alert.alert("Error occurred", error.message);
    } finally {
      setShowModal(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.neoncolor} />
      <Text style={{ fontSize: 23, marginBottom: 30 }}>
        Pick an option for OCR scan
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: colors.neoncolor,
          alignItems: "center",
          justifyContent: "center",
          height: 130,
          width: 150,
          borderRadius: 20,
          marginBottom: 20,
        }}
        onPress={() => uploadImage("camera")}
      >
        <Entypo name="camera" size={35} color={colors.lightcolor} />
        <Text style={{ fontSize: 20, color: colors.lightcolor }}>
          Take a photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: colors.neoncolor,
          alignItems: "center",
          justifyContent: "center",
          height: 130,
          width: 150,
          borderRadius: 20,
          marginBottom: 20,
        }}
        onPress={() => uploadImage("gallery")}
      >
        <MaterialIcons name="sd-storage" size={35} color={colors.lightcolor} />
        <Text style={{ fontSize: 20, color: colors.lightcolor }}>
          Choose from
        </Text>
        <Text style={{ fontSize: 20, color: colors.lightcolor }}>gallery</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 6,
          alignSelf: "flex-start",
          marginLeft: 40,
          marginBottom: 10,
          fontSize: 17,
        }}
      >
        Select a Language
      </Text>

      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select a language"
        style={{ borderColor: colors.neoncolor, width: "80%", marginLeft: 40 }}
      />

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Scanning your image ...</Text>
          <ActivityIndicator size="large" color={colors.neoncolor} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
  },
});

export default Home;
