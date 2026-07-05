import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { I18nProvider } from "./i18n/i18n-context";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { useTranslation } from "./i18n/useTranslation";
import { NAMESPACES, TRANSLATION_KEYS } from "./i18n/constants";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { t } = useTranslation();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: t(NAMESPACES.HOME, TRANSLATION_KEYS.TITLE),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.SETTINGS),
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>⚙️</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <I18nProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </I18nProvider>
  );
};

export default App;
