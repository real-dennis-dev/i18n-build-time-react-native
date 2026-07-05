import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "../i18n/useTranslation";
import { NAMESPACES, TRANSLATION_KEYS } from "../i18n/constants";
import LanguageSelector from "../components/LanguageSelector";

const SettingsScreen = () => {
  const { t, locale, changeLocale, formatCurrency } = useTranslation();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  const handleSave = () => {
    // Save settings
    alert(t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.SETTINGS_SAVED));
  };

  const handleReset = () => {
    setDarkMode(false);
    setNotifications(true);
    changeLocale("en");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.SETTINGS)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={() => setShowLanguageModal(true)}
        >
          <View>
            <Text style={styles.settingLabel}>
              {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.LANGUAGE)}
            </Text>
            <Text style={styles.settingValue}>
              {locale === "en"
                ? "English"
                : locale === "es"
                ? "Español"
                : locale === "fr"
                ? "Français"
                : locale}
            </Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.DARK_MODE)}
          </Text>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={darkMode ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.NOTIFICATIONS_ENABLED)}
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={notifications ? "#f5f5f5" : "#f4f3f4"}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Information</Text>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.PRIVACY)}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.TERMS)}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.ABOUT)}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.VERSION)}
          </Text>
          <Text style={styles.settingValue}>1.0.0</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.SAVE_CHANGES)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>
            {t(NAMESPACES.SETTINGS, TRANSLATION_KEYS.RESET)}
          </Text>
        </TouchableOpacity>
      </View>

      <LanguageSelector
        visible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: "#ccc",
  },
  buttonContainer: {
    padding: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 5,
  },
  saveButton: {
    backgroundColor: "#2196f3",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  resetButtonText: {
    color: "#666",
    fontSize: 16,
  },
});

export default SettingsScreen;
