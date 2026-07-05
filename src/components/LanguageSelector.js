import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { useI18n } from "../i18n/i18n-context";
import { NAMESPACES, TRANSLATION_KEYS } from "../i18n/constants";

const LanguageSelector = ({ visible, onClose }) => {
  const { locale, locales, changeLocale, getTranslation } = useI18n();
  const [selectedLocale, setSelectedLocale] = useState(locale);

  const handleSelect = (localeCode) => {
    setSelectedLocale(localeCode);
  };

  const handleConfirm = () => {
    changeLocale(selectedLocale);
    onClose();
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedLocale === item.code;
    return (
      <TouchableOpacity
        style={[styles.languageItem, isSelected && styles.selectedItem]}
        onPress={() => handleSelect(item.code)}
      >
        <Text style={styles.flag}>{item.flag}</Text>
        <Text style={styles.languageName}>{item.name}</Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>
            {getTranslation(
              NAMESPACES.SETTINGS,
              TRANSLATION_KEYS.SELECT_LANGUAGE
            )}
          </Text>

          <FlatList
            data={Object.values(locales)}
            keyExtractor={(item) => item.code}
            renderItem={renderItem}
            style={styles.list}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>
                {getTranslation(NAMESPACES.COMMON, TRANSLATION_KEYS.CANCEL)}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={[styles.buttonText, styles.confirmButtonText]}>
                {getTranslation(NAMESPACES.COMMON, TRANSLATION_KEYS.SAVE)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  list: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  selectedItem: {
    backgroundColor: "#e3f2fd",
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  languageName: {
    fontSize: 16,
    flex: 1,
  },
  checkmark: {
    fontSize: 18,
    color: "#2196f3",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
  },
  confirmButton: {
    backgroundColor: "#2196f3",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  confirmButtonText: {
    color: "white",
  },
});

export default LanguageSelector;
