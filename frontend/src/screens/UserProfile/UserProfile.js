import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import navigationStrings from "../../navigations/navigationStrings";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import colors from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { responsiveScreenWidth as w } from "react-native-responsive-dimensions";
import { url } from "../../constants/backendUrl";
import axios from "axios";

const UserProfile = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalScans, setTotalScans] = useState(0);

  const getUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem("userData");
      console.log(userDataJSON);
      if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        setUserData(userData);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error retrieving user data: ", error);
    }
  };

  const fetchHistory = async () => {
    try {
      let userData = await AsyncStorage.getItem("userData");
      userData = JSON.parse(userData);

      const response = await axios.post(
        `http://${url}:3000/api/v1/users/history`,
        { _id: userData._id }
      );

      if (response.status === 200) {
        setTotalScans(response.data.data.length);
      } else {
        throw new Error("Failed to fetch history");
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userData");
              navigation.navigate(navigationStrings.Login);
            } catch (error) {
              console.log("Error removing user data: ", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return loading ? (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size={"large"} />
    </View>
  ) : (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
        }}
      >
        <Image
          source={require("../../../assets/profile.jpg")}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            marginBottom: 10,
          }}
        />

        <Text style={styles.heading}>Welcome User</Text>

        <View
          style={{
            backgroundColor: colors.lightcolor,
            height: 80,
            width: w(92),
            borderRadius: 20,
            alignItems: "center",
            paddingLeft: 20,
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="mail"
            size={24}
            color={colors.white}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{userData.email}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.lightcolor,
            height: 80,
            width: w(92),
            borderRadius: 20,
            alignItems: "center",
            paddingLeft: 20,
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Ionicons
            name="person"
            size={24}
            color={colors.white}
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.label}>User name :</Text>
            <Text style={styles.value}>{userData.userName}</Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.lightcolor,
            height: 80,
            width: w(92),
            borderRadius: 20,
            alignItems: "center",
            paddingLeft: 20,
            flexDirection: "row",
            marginBottom: 70,
          }}
        >
          <Ionicons
            name="scan-circle"
            size={26}
            color="white"
            style={{ marginRight: 15 }}
          />
          <View>
            <Text style={styles.label}>Total scans :</Text>
            <Text style={styles.value}>{totalScans}</Text>
          </View>
        </View>

        <Pressable
          style={{ backgroundColor: "red", padding: 13, borderRadius: 10 }}
          onPress={handleLogout}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name="logout"
              size={24}
              color="white"
              style={{ marginRight: 7 }}
            />
            <Text style={{ color: "white" }}>LOGOUT</Text>
          </View>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: colors.neoncolor,
    letterSpacing: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: colors.neoncolor,
  },
  value: {
    fontSize: 16,
    color: colors.white,
  },
});

export default UserProfile;
