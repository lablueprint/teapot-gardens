import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import garden from "@assets/garden.jpg";

const UserCard = ({ name, username, tamagatchiXP, style }) => {
  return (
    <View style={[styles.card, style]}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image source={garden} style={styles.image} />
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.username}>{username || '@username'}</Text>
        </View>
      </View>
      <Text style={styles.tamagatchiXP}>{tamagatchiXP || 0} xp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
  },
  xp: {
    backgroundColor: "#BFBFBF",
    text: '#1A1818',
    opacity: 0.5,
    borderRadius: 8,
    padding: 5, 
  }
});

export default UserCard;
