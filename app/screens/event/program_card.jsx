import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProgramCard = ({ name, profilePicture, style }) => {
  return (
    <View style={[styles.card, style]}>
      <Image style={styles.image} source={profilePicture}></Image>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    // borderWidth: 1,
    // borderColor: "#ccc",
    // borderRadius: 8,
    // marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    color: "#A3A3A3",
  },
});

export default ProgramCard;
