import colors from "../constants/colors";
import { Pdf, ShowText } from "../screens";
import navigationStrings from "./navigationStrings";
import TabRoutes from "./TabRoutes";

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.TabRoutes}
        component={TabRoutes}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.ShowText}
        component={ShowText}
        options={{
          headerStyle: {
            backgroundColor: colors.neoncolor,
          },
          headerTitle: "Extracted Text",
          headerTitleStyle: {
            color: colors.lightcolor,
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen
        name={navigationStrings.Pdf}
        component={Pdf}
        options={{
          headerStyle: {
            backgroundColor: colors.neoncolor,
          },
          headerTitle: "Convert to PDF",
          headerTitleStyle: {
            color: colors.lightcolor,
            fontSize: 20,
          },
        }}
      />
    </>
  );
}
