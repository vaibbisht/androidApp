import React, { useState, useEffect } from "react";
import { View, Text, Switch, StyleSheet, Appearance, useColorScheme } from "react-native";


const Settings = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(Appearance.getColorScheme() === "dark");
  const [notificationSwitch, setNotificationSwitch] =useState(false);
  
  return (
    <View style={[styles.container, isDarkModeEnabled && styles.darkContainer]}>
      <Text style={[styles.header, isDarkModeEnabled && styles.darkText]}>Settings</Text>

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDarkModeEnabled && styles.darkText]}>Enable Notifications</Text>
        <Switch value={notificationSwitch} onValueChange={()=>setNotificationSwitch(!handleNotificationToggle)} />
      </View>

      <View style={styles.settingRow}>
        <Text style={[styles.settingText, isDarkModeEnabled && styles.darkText]}>Dark Mode</Text>
        <Switch 
          value={isDarkModeEnabled} 
          onValueChange={() => setIsDarkModeEnabled(!isDarkModeEnabled)} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  darkText: {
    color: "white",
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 18,
  },
});

export default Settings;
