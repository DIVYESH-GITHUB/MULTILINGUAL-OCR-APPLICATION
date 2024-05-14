import navigationStrings from "./navigationStrings";
import * as Screens from "../screens";

export default function (Stack) {
  return (
    <>
      <Stack.Screen
        name={navigationStrings.Login}
        component={Screens.Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={navigationStrings.Register}
        component={Screens.Register}
        options={{ headerShown: false }}
      />
    </>
  );
}
