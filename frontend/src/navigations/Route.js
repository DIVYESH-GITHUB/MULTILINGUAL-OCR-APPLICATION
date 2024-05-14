import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import AuthStack from "./AuthStack";
import MainStack from "./MainStack";
import navigationStrings from "./navigationStrings";
import colors from "../constants/colors";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [userDataExists, setUserDataExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData !== null) {
          setUserDataExists(true);
        }
      } catch (error) {
        console.log("Error retrieving user data: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkUserData();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          userDataExists ? navigationStrings.TabRoutes : navigationStrings.Login
        }
      >
        {MainStack(Stack)}
        {AuthStack(Stack)}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.background} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
