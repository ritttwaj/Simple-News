import React, { useEffect, useState } from "react";
import { Switch } from "react-native";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";
import theme from "../config/theme";
import themeContext from "../config/themeContext";

import TabNavigator from "./TabNavigator";

import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener(
      "themeChange",
      (data) => {
        setIsEnabled(data);
        console.log(data);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  });

  return (
    <themeContext.Provider
      value={isEnabled === true ? theme.light : theme.dark}
    >
      <NavigationContainer
        theme={isEnabled === true ? DarkTheme : DefaultTheme}
      >
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};

export default DrawerNavigator;
