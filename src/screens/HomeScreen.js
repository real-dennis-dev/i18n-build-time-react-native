import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "../i18n/useTranslation";
import { NAMESPACES, TRANSLATION_KEYS } from "../i18n/constants";
import LanguageSelector from "../components/LanguageSelector";

const HomeScreen = ({ navigation }) => {
  const { t, locale, formatCurrency, formatDate } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);

  // Example user data
  const user = {
    name: "John Doe",
  };

  // Example data
  const todaySales = 12450.5;
  const totalOrders = 42;
  const newMessages = 3;
  const recentOrders = [
    { id: 1, total: 125.0, date: new Date() },
    { id: 2, total: 89.5, date: new Date(Date.now() - 3600000) },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          {t(NAMESPACES.HOME, TRANSLATION_KEYS.GREETING, { name: user.name })}
        </Text>
        <TouchableOpacity
          style={styles.languageButton}
          onPress={() => setShowLanguageModal(true)}
        >
          <Text style={styles.languageButtonText}>🌐</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(todaySales)}</Text>
          <Text style={styles.statLabel}>
            {t(NAMESPACES.HOME, TRANSLATION_KEYS.TODAY_SALES)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{totalOrders}</Text>
          <Text style={styles.statLabel}>
            {t(NAMESPACES.HOME, TRANSLATION_KEYS.TOTAL_ORDERS)}
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{newMessages}</Text>
          <Text style={styles.statLabel}>
            {t(NAMESPACES.HOME, TRANSLATION_KEYS.NEW_MESSAGES)}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {t(NAMESPACES.HOME, TRANSLATION_KEYS.RECENT_ACTIVITY)}
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>
              {t(NAMESPACES.HOME, TRANSLATION_KEYS.VIEW_ALL)}
            </Text>
          </TouchableOpacity>
        </View>

        {recentOrders.length > 0 ? (
          recentOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <Text style={styles.orderAmount}>
                {formatCurrency(order.total)}
              </Text>
              <Text style={styles.orderDate}>
                {formatDate(order.date, {
                  weekday: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noOrders}>
            {t(NAMESPACES.HOME, TRANSLATION_KEYS.NO_ORDERS)}
          </Text>
        )}
      </View>

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>
          {t(NAMESPACES.HOME, TRANSLATION_KEYS.QUICK_ACTIONS)}
        </Text>
        <View style={styles.actionGrid}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>👤</Text>
            <Text>{t(NAMESPACES.HOME, TRANSLATION_KEYS.PROFILE)}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionIcon}>🔔</Text>
            <Text>{t(NAMESPACES.HOME, TRANSLATION_KEYS.NOTIFICATIONS)}</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  languageButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  languageButtonText: {
    fontSize: 24,
  },
  statsContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2196f3",
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
  },
  section: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  viewAll: {
    color: "#2196f3",
    fontSize: 14,
  },
  orderCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "500",
  },
  orderDate: {
    color: "#666",
  },
  noOrders: {
    textAlign: "center",
    color: "#666",
    padding: 20,
  },
  quickActions: {
    backgroundColor: "white",
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  actionGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  actionButton: {
    alignItems: "center",
    padding: 15,
  },
  actionIcon: {
    fontSize: 30,
    marginBottom: 5,
  },
});

export default HomeScreen;
