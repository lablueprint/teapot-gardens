import React, {useState} from 'react';
import { View, Text, StyleSheet, Modal, Pressable, TouchableOpacity, TextInput} from 'react-native';
import UserCard from "@screens/event/user_card.jsx";
import Icon from 'react-native-vector-icons/FontAwesome';

const AttendeePopup = ({visible, setPopupVisible, onClose, attendeeInfo}) => {
    const [showAttendees, setShowAttendees] = useState(true);
    const [selectedName, setSelectedName] = useState(null);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.popup}>
                    <View style={styles.topBarContainer}> 
                        <Icon name="search" size={20} color="#7B7B7B" />
                        <TextInput placeholder="Attendeees" style={styles.input}/> 
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={() => setPopupVisible(false)}>
                            <Icon name="close" size={20} color="#7B7B7B" /> 
                        </TouchableOpacity>
                    </View>
                    <View style={styles.toggleContainer}>
                        <Pressable style={[styles.toggleTab, showAttendees && styles.activeTab]}
                             onPress={() => setShowAttendees(true)}>
                            <Text style={[styles.toggleText, showAttendees && styles.activeText]}>Attendees</Text>
                            <Text style={[styles.peopleCount, showAttendees && styles.activeCount]}>{attendeeInfo?.length}</Text>
                        </Pressable>
                        <Pressable style={[styles.toggleTab, !showAttendees && styles.activeTab]}
                            onPress={() => setShowAttendees(false)}>
                            <Text style={[styles.toggleText, !showAttendees && styles.activeText]}>Volunteers</Text>
                            <Text style={[styles.peopleCount, !showAttendees && styles.activeCount]}>0</Text>
                        </Pressable>
                    </View>
                    {showAttendees && attendeeInfo.length > 0 ? (
                        attendeeInfo.map((attendee, index) => 
                            <Pressable key={index} onPress={() => setSelectedName(attendee.name)} style={styles.userCard}>
                                <UserCard key={index} name={attendee.name} username={attendee.username} tamagatchiXP={attendee.tamagatchiXP} 
                                    style={[selectedName === attendee.name && styles.selectedCard]} />
                            </Pressable>
                        )) : null}
                    {!showAttendees && (
                        <Text>No volunteers yet</Text>
                    )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popup: {
        width: '80%',
        minHeight: '50%',
        maxHeight: '60%',
        backgroundColor: '#EAEAE4',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    input: {
        width: '80%',
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginLeft: 10,
        textAlign: 'left',
    },
    topBarContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: '100%',
        marginBottom: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        gap: 30,
        width: '100%',
        marginBottom: 20,
    },
    toggleTab: {
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        paddingHorizontal: 5,
        gap: 8,
    },
    toggleText: {
        color: "#7F7F7F",
    },
    peopleCount: {
        color: "#7F7F7F",
        backgroundColor: "#D8D8D8",
        paddingVertical: 2,
        paddingHorizontal: 5,
    },
    activeTab: {
        borderBottomColor: "#757B45",
        color: "#757B45",
    },  
    activeText: {
        color: "#757B45",
    },
    activeCount: {
        color: "#757B45",
        backgroundColor: "#CDDFCB",
    },
    userCard: {
        display: "flex",
        marginBottom: 10,
        width: '100%',
    },
    closeButton: {
        display: "flex",
        justifyContent: "right",
        alignItems: "right",
    },
    selectedCard: {
        backgroundColor: "#DDDDD2",
    },
});

export default AttendeePopup;