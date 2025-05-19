import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Modal, Image } from "react-native";
import { BlurView } from 'expo-blur';
import volunteer from "@assets/volunteer.png";
import attendee from "@assets/attendee.png";
import barsort from "@assets/bar-sort.png";


  const VolunteerButton = ({ roleStatus, setRoleStatus, xp }) => {
    return (
      <Pressable
        onPress={() => setRoleStatus("v") }
        style={roleStatus === "v" ? styles.buttonDark : styles.roleButtons}
      >
        <View style={{ marginRight: 0, flex: 1, padding: 10, paddingRight: 10}}>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '30' }}>Volunteer</Text>
          <Text style={{ textAlign: 'left', color: 'white', fontSize: '13', marginBottom: 10 }}>Make an impact as a volunteer!</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
            <View style={{textAlign: 'right', backgroundColor: 'white', padding: 10, borderRadius: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5}}>
              <Text style={{width: 10, backgroundColor: '#CF7362', height: 10, borderRadius: 10}}>.</Text>
              <Text>{xp * 2 || 0} xp</Text>
            </View>
            <Pressable style={{ padding: 10, backgroundColor: 'white', borderRadius: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5}}>
              <Image source={barsort} style={{width: 10, height: 10}}/>
              <Text>See Volunteer Notes</Text>
            </Pressable>
          </View>
        </View>
        <Image style={styles.volunteer} source={volunteer}/>
      </Pressable>

    )
  }

  const AttendeeButton = ({ roleStatus, setRoleStatus, xp }) => {
    return (
      <Pressable
        onPress={() => setRoleStatus("a") }
        style={ roleStatus === "a" ? styles.buttonDark : styles.roleButtons}
      >
        <Image style={styles.volunteer} source={attendee}/>
        <View style={{ marginLeft: -40, flex: 1, padding: 10, paddingLeft: 10 }}>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '30' }}>Attendee</Text>
          <Text style={{ textAlign: 'right', color: 'white', fontSize: '13', marginBottom: '8', marginLeft: -10 }}>Enjoy the event and grow your plant!</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}> 
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{textAlign: 'right', backgroundColor: 'white', padding: 10, borderRadius: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 5}}>
                <Text style={{width: 10, backgroundColor: '#CF7362', height: 10, borderRadius: 10}}>.</Text>
                <Text>{xp || 0} xp</Text>
              </View>
            <View>
            <View style={{ padding: 10, backgroundColor: 'white', borderRadius: 18, flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <Image source={barsort} style={{width: 10, height: 10}}/>
              <Text>See Event Details</Text>
            </View>
            </View>
          </View>
          </View>
        </View>

      </Pressable>
    )
  }

  const RegisterButton = ({ roleStatus, setRoleStatus, setModalVisible, addUserEvent}) => {
    let buttonText = "Register";
    let onPressHandler = () => {};
  
    if (roleStatus === "v") {
      buttonText = "Register as a volunteer!";
      onPressHandler = () => {
        setModalVisible(false);
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
        <Text style={{ color: 'white', fontSize: 15 }}>{buttonText}</Text>
      </Pressable>
    );
  };

  const RegisterModal = ({ modalVisible, setModalVisible, addUserEvent, xp }) => {
    const [roleStatus, setRoleStatus] = useState("");

    return (
      <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
        <View style={styles.centeredView}>
          {/* Background Blur */}
          <BlurView
            style={styles.blurContainer}
            intensity={10}
          />

          <View style={styles.modalView}>
            <Text style={{marginTop: 40, color: "white", fontSize: 30,}}>Join the event as a...</Text>

            <VolunteerButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} xp={xp} />
            <AttendeeButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} xp={xp}/>
            <RegisterButton roleStatus={roleStatus} setRoleStatus={setRoleStatus} setModalVisible={setModalVisible} addUserEvent={addUserEvent}/>

            <Pressable style={styles.xButton} onPress={() => {setModalVisible(false); setRoleStatus("") }}>
            <Text style={{ textAlign: 'center', color: 'white' }}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    )
  }


const styles = StyleSheet.create({ 
  // container: {
  //   paddingVertical: 16,
  //   paddingHorizontal: 30,
  //   backgroundColor: "#E9E5DA",
  //   borderTopLeftRadius: 32,
  //   borderTopRightRadius: 32,
  //   overflow: "hidden",
  //   marginTop: -30,
  // },
  // eventHeader: {
  //   textAlign: 'center',
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   marginBottom: 8,
  // },
  // subtext: {
  //   color: "#8B8B8B",
  //   fontSize: 12,
  //   marginBottom: 4,
  // },
  // description: {
  //   fontSize: 14,
  //   marginBottom: 4,
  // },
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
  // shareButton: {
  //   marginTop: 16,
  //   padding: 12,
  //   borderRadius: 20,
  //   backgroundColor: "#9D4C6A"
  // },
  // shareButtonText: {
  //   textAlign: "center",
  //   color: "white",
  // },
  // adminSection: {
  //   marginTop: 24,
  // },
  // adminText: {
  //   fontSize: 18,
  //   fontWeight: "600",
  //   marginBottom: 8,
  // },
  buttonDark: {
    flexDirection: 'row',
    height: '124',
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
    height: '124',
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
    height: '124',
    // resizeMode: 'contain',
    borderRadius: '15%',
  },
  unclickableRegisterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '10%',
    margin: 10,
    padding: 12,
    width: '80%',
    backgroundColor: "#716F49",
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
    height: '510',
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
  // dateIcon: {
  //   width: 20,
  //   height: 20,
  //   marginRight: 8,
  // },
  // locationIcon: {
  //   width: 18,
  //   height: 22,
  //   marginRight: 8,
  // },
  // dateText: {
  //   fontSize: 16,
  //   marginBottom: 4,
  //   color: '#7D7D7D'
  // },
  blurContainer: {
    flex: 1,
    // padding: 20,
    // margin: 16,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: "100%",
  },
});

export default RegisterModal;



