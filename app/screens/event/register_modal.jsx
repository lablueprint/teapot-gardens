import React, { useState } from "react";
import { Text, View, Pressable, StyleSheet, Modal, Image } from "react-native";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import volunteer from "@assets/character-volunteer.png";
import attendee from "@assets/character-attendee.png";
import moreInfo from "@assets/more-info.png";
import expandedInfo from "@assets/expanded-info.png";
import barsort from "@assets/bar-sort.png";

  const RoleButton = ({ role, description, img, xp, setInfoStatus, onPress }) => {
    return (
      <View style={styles.roleButtons}>
        <Pressable 
            style={styles.moreInfoButton} 
            onPress={() => setInfoStatus(1)}
        >
          <Image style={styles.moreInfo} source={moreInfo}/>
        </Pressable>

        <Pressable style={styles.roleButtons} onPress={onPress}>
          <Image style={styles.character} source={img}/>
          <View style={ styles.buttonText }>
            <View style={{paddingBottom: 7}}>
              <Text style={{ textAlign: 'left', color: 'rgba(22, 20, 20, 1)', fontSize: '25' }}>{role}</Text>
              <Text style={{ textAlign: 'left', color: 'rgba(64, 60, 60, 0.5)', fontSize: '15'}}>{description}</Text>
            </View>
            <View style={ styles.XPindicator }>
              <Text style={{width: 10, backgroundColor: '#CF7362', height: 10, borderRadius: 10, }}>.</Text>
              <Text style={{color: 'rgba(64, 60, 60, 0.5)',}}> You will earn </Text><Text>{xp || 0} xp </Text><Text style={{color: 'rgba(64, 60, 60, 0.5)',}}>for attending!</Text>
            </View>
          </View>
        </Pressable>
      </View>
    )
  }

  const ExpandedRoleButton = ({ role, description, img, xp, setInfoStatus, onPress }) => {
    return (
      <View style={styles.roleButtons}>
        <Pressable 
          style={styles.moreInfoButton} 
          onPress={() => setInfoStatus(0)}
        >
          <Image style={styles.moreInfo} source={expandedInfo}/>
        </Pressable>
        <Pressable style={styles.roleButtons} onPress={onPress}>
          <View style={ styles.expandedButtonText}>
            <View style={{paddingBottom: 7}}>
              <Text style={{ textAlign: 'left', color: 'rgba(22, 20, 20, 1)', fontSize: '25' }}>{role}</Text>
              <Text style={{ textAlign: 'left', color: 'rgba(64, 60, 60, 0.5)', fontSize: '15'}}>{description}</Text>
            </View>
            <View style={ styles.XPindicator }>
              <Text style={{width: 10, backgroundColor: '#CF7362', height: 10, borderRadius: 10, }}>.</Text>
              <Text style={{color: 'rgba(64, 60, 60, 0.5)',}}> You will earn </Text><Text>{xp || 0} xp </Text><Text style={{color: 'rgba(64, 60, 60, 0.5)',}}>for attending!</Text>
            </View>
          </View>
        </Pressable>
      </View>
    )
  }

  const RenderRoleButton = ({ role, xp, infoStatus, setInfoStatus, setModalVisible, addUserEvent }) => {
    const Component = infoStatus === 0 ? RoleButton : ExpandedRoleButton;
    let description = "";
    let img = null;
    let onPressHandler = () => {};

    if ( role == "Volunteer" ) {
      img = volunteer
      onPressHandler = () => {
        setModalVisible(false);
        // NOT ADDING TO USER EVENTS
      };
      if ( infoStatus == 0 ) {
        description = "Make an impact as a volunteer!"
      }
      else {
        description = "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices."
      }
    }
    else {
      img = attendee
      onPressHandler = () => {
        setModalVisible(false);
        addUserEvent();
      };
      if ( infoStatus == 0 ) {
        description = "Enjoy the event and grow your plant!"
      }
      else {
        description = "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices."
      }
    }
    return (
      <Pressable
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          margin: 10,
          marginBottom: 0,
          backgroundColor: "rgba(237, 234, 229, 0.75)",
          borderRadius: 12,
        }}
      >
        <Component
          role={role}
          description={description}
          img={img}
          xp={xp}
          setInfoStatus={setInfoStatus}
          onPress={onPressHandler}
        />
      </Pressable>
    );
  }

  const RegisterModal = ({ modalVisible, setModalVisible, addUserEvent, xp }) => {
    const [vInfoStatus, setVInfoStatus] = useState(0);
    const [aInfoStatus, setAInfoStatus] = useState(0);

    return (
      <Modal
      animationType="slide"
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
        {/* Background Blur */}
        <BlurView
          style={styles.blurContainer}
          intensity={10}
        >
          <Pressable
            style={styles.outerPressable}
            onPress={() => { setModalVisible(false)}}
          >
            <LinearGradient style={styles.modalView} colors={['rgba(191, 192, 167, 1)', 'rgba(212, 195, 185, 1)']}>
                <RenderRoleButton
                  role="Volunteer"
                  xp={xp}
                  infoStatus={vInfoStatus}
                  setInfoStatus={setVInfoStatus}
                  setModalVisible={setModalVisible}
                  addUserEvent={addUserEvent}
                />
                <RenderRoleButton
                  role="Attendee"
                  xp={xp}
                  infoStatus={aInfoStatus}
                  setInfoStatus={setAInfoStatus}
                  setModalVisible={setModalVisible}
                  addUserEvent={addUserEvent}
                />
            </LinearGradient>
          </Pressable>
        </BlurView>
      </Modal>

    )
  }


const styles = StyleSheet.create({ 
  XPindicator: {
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    padding: 3,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '35',
  },
  moreInfo: {
    resizeMode: 'contain',
    height: 25,
    width: 25,
  },
  moreInfoButton: {
    position: 'absolute',
    top: '5%',
    right: '4%',
    zIndex: 2,
  },
  expandedButtonText: {
    flex: 1,
    padding: 15,
  },
  buttonText: {
    flex: 1,
    padding: 10,
    paddingLeft: 0,
    paddingVertical: '8%',
    justifyContent: 'space-around',
  },
  roleButtons: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  character: {
    width: '25%',
    margin: 10,
  },
  modalView: {
    height: '50%',
    backgroundColor: 'linear-gradient(#e66465, #9198e5)',
    borderRadius: 18,
    margin: 10,
    paddingBottom: 10,
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
    width: "100%",
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
  },
  outerPressable: {
    flex: 1,
    width: "100%",
    justifyContent: 'flex-end',
  },
});

export default RegisterModal;



