import { Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import UserCard from './user_card.jsx';
import Collapsible from 'react-native-collapsible';

const EventPages = (props) => {
  const attendees = ['Victoria', 'Angela'];
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setIsCollapsed((prevState) => !prevState);
  }
  const BulletPoints = (props) => {
    return (
      <View>
        {props.items.map((item, index) => (
          <Text key={index}>
            {'\u2022'} {item}
          </Text>
        ))}
      </View>
    )
  };

  return (
    <View>
        <Text>Kimchi Gardens</Text>
        <Text>Event Location: </Text>
        <Text>Date: </Text>
        <Text>Time: </Text>
        <Text>Details: </Text>
        <Text>Host Information: </Text>
        {/* <UserCard></UserCard> */}

        {/* Attendees */}
        <View>
          <Pressable onPress={ toggleCollapsed } >
            <Text>Attendees</Text>
          </Pressable>
          <Collapsible collapsed={ isCollapsed } >
            <BulletPoints items={ attendees } ></BulletPoints>
          </Collapsible>
        </View>

        {/* share button */}
        <Pressable style={{ borderWidth: 2, borderColor: 'gray' }} >
            <Text>Share</Text>
        </Pressable>

    </View>
  );
};

export default EventPages;
