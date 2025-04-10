import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, Pressable, StyleSheet, Alert, Modal, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import Collapsible from "react-native-collapsible";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from 'expo-router';
import Paradise from "@assets/paradise.png";
import dateIcon from "@assets/date-icon.png";
import locationIcon from "@assets/location-icon.png";
import volunteer from "@assets/volunteer.png";
import attendee from "@assets/attendee.png";

const VolunteerButton = ({roleStatus, setRoleStatus}) => {
    // const buttonStyle = roleStatus === "v" ? styles.buttonDark : styles.roleButtons;
    return (
      <Pressable
        onPress={() => setRoleStatus("v") }
        style={roleStatus === "v" ? styles.buttonDark : styles.roleButtons}
      >
        <View style={{ margin: 5, marginRight: 0 }}>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '30' }}>Volunteer</Text>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '12' }}>make an impact as a volunteer!</Text>
        </View>
        <Image style={styles.volunteer} source={volunteer}/>
      </Pressable>

    )
  }

  const AttendeeButton = ({roleStatus, setRoleStatus}) => {
    // const buttonStyle = roleStatus === "a" ? styles.buttonDark : styles.roleButtons;
    return (
      <Pressable
        onPress={() => setRoleStatus("a") }
        style={ roleStatus === "a" ? styles.buttonDark : styles.roleButtons}
      >
        <Image style={styles.volunteer} source={attendee}/>
        <View style={{ margin: 5, marginLeft: 0, flex: 1 }}>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '30' }}>Attendee</Text>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '12' }}>enjoy the event and grow your plant!</Text>
        </View>

      </Pressable>

    )
  }

  const RegisterButton = ({roleStatus, setRoleStatus, setModalVisible, addUserEvent}) => {
    let buttonText = "Register";
    let onPressHandler = () => {};
  
    if (roleStatus === "v") {
      buttonText = "Register as a volunteer!";
      onPressHandler = () => {
        setModalVisible(false);
        // setShowDynamicButtons(true);
        setRoleStatus("");
      };
    } else if (roleStatus === "a") {
      buttonText = "Register as an attendee!";
      onPressHandler = () => {
        setModalVisible(false);
        addUserEvent();
        setRoleStatus("");
      };
    }
    const buttonStyle = roleStatus === "v" || roleStatus == "a" ? styles.unclickableRegisterButton : styles.clickableRegisterButton;
  
    return (
      <Pressable style={buttonStyle} onPress={onPressHandler}>
        <Text style={{ color: 'white' }}>{buttonText}</Text>
      </Pressable>
    );
  };

  const RegisterModalPopup = (props) => {
    const { modalVisible, setModalVisible, roleStatus, setRoleStatus, addUserEvent } = props;
    console.log('in register modal', modalVisible);
    console.log('in register modal role status', roleStatus);
    
    return (
      <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={false}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{marginTop: 40, color: "white", fontSize: 30,}}>Join the event as a...</Text>

            <VolunteerButton roleStatus={roleStatus} setRoleStatus={setRoleStatus}/>
            <AttendeeButton roleStatus={roleStatus} setRoleStatus={setRoleStatus}/>
            <RegisterButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} setModalVisible={setModalVisible} addUserEvent={addUserEvent}/>

            <Pressable style={styles.xButton} onPress={() => {setModalVisible(false); setRoleStatus("") }}>
            <Text style={styles.shareButtonText}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    )
  }


const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 30,
    backgroundColor: "#E9E5DA",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: "hidden",
    marginTop: -30,
  },
  eventHeader: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtext: {
    color: "#8B8B8B",
    fontSize: 12,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 4,
  },
  attendeesButton: {
    padding: 8,
    backgroundColor: "lightgray",
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  attendeesButtonText: {
    marginRight: 5,
  },
  shareButton: {
    marginTop: 16,
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#9D4C6A"
  },
  shareButtonText: {
    textAlign: "center",
    color: "white",
  },
  adminSection: {
    marginTop: 24,
  },
  adminText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  buttonDark: {
    flexDirection: 'row',
    height: 124,
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(30, 30, 30, 0.25)",
    color: "white",
    borderRadius: 20,
    padding: 0,
  },
  roleButtons: {
    flexDirection: 'row',
    height: 124,
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(194, 194, 194, 0.25)",
    color: "white",
    borderRadius: 20,
    padding: 0,
  },
  volunteer: {
    // borderColor: 'red',
    // borderStyle: 'solid',
    // borderWidth: '1',
    height: '100%',
    resizeMode: 'contain',
    paddingRight: '20',
  },
  unclickableRegisterButton: {
    alignItems: 'center',
    height: '10%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(157, 76, 106, 1)",
    borderRadius: 20,
  },
  clickableRegisterButton: {
    alignItems: 'center',
    height: '10%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#rgba(157, 76, 106, 0.25)",
    borderRadius: 20,
  },
  xButton: {
    marginTop: 16,
    padding: 12,
    width: 40,
    backgroundColor: "black",
    borderRadius: 20,
  },
  centeredView: {
    borderColor: 'red',
    borderWidth: '1px',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    borderColor: 'red',
    borderWidth: '1px',
    height: '150px',
    width: '100%',
    backgroundColor: '#6A7D66',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
      bottom: 0,
    }
  },
  dateIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  locationIcon: {
    width: 18,
    height: 22,
    marginRight: 8,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 4,
    color: '#7D7D7D'
  },
});

export default RegisterModalPopup;



