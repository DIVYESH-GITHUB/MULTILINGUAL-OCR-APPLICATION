import * as Screens from "../screens";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import navigationStrings from "./navigationStrings";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { Octicons } from "@expo/vector-icons";
import {
  responsiveHeight as h,
  responsiveFontSize as f,
} from "react-native-responsive-dimensions";

const Tab = createBottomTabNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      initialRouteName={navigationStrings.Home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === navigationStrings.Home) {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          if (route.name === navigationStrings.UploadTab) {
            return <FontAwesome5 name={iconName} size={size} color={color} />;
          }
          if (route.name === navigationStrings.History) {
            return <Octicons name="history" size={size} color={color} />;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.neoncolor,
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarLabelStyle: {
          fontSize: f(1.6),
          letterSpacing: 1,
          marginBottom: h(0.6),
        },
        tabBarItemStyle: { alignItems: "center", alignContent: "center" },
        tabBarStyle: { height: h(8) },
      })}
    >
      <Tab.Screen
        name={navigationStrings.Home}
        component={Screens.Home}
        options={{
          headerTitle: "Scan Images",
          headerTitleStyle: {
            color: colors.background,
            fontWeight: "600",
            letterSpacing: 1,
            fontSize: 22,
          },
          headerStyle: { backgroundColor: colors.neoncolor },
        }}
      />

      <Tab.Screen
        name={navigationStrings.History}
        component={Screens.History}
        options={{
          headerTitle: "Histroy",
          headerTitleStyle: {
            color: colors.background,
            fontWeight: "600",
            letterSpacing: 1,
            fontSize: 22,
          },
          headerStyle: { backgroundColor: colors.neoncolor },
        }}
      />

      <Tab.Screen
        name={"Profile"}
        component={Screens.UserProfile}
        options={{
          headerTitle: "Profile",
          headerTitleStyle: {
            color: colors.background,
            fontWeight: "600",
            letterSpacing: 1,
            fontSize: 22,
          },
          headerStyle: { backgroundColor: colors.neoncolor },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
