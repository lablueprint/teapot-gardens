import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const UserCard = ({ name, username, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.name}>{username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default UserCard;
