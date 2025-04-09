import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import UserImg from "../assets/photos/userImg.jpg";

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={UserImg}
        style={styles.profileImage} 
      />
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
});

export default Profile;
