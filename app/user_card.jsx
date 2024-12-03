import { Text, View, Image } from "react-native";
import React from "react";
import sample_logo from '../assets/sample_logo.png';

const UserCard = (name) => {
    return (
      <View>
          <Image source={ sample_logo } />
          <Text>{name}</Text>
      </View>
    );
  };
  
  export default UserCard;
  