// import React from 'react';
// import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';

// const AttendeePopup = ({ visible, onClose, attendee }) => {
//     return (
//         <Modal
//             animationType="slide"
//             transparent={true}
//             visible={visible}
//             onRequestClose={onClose}
//         >
//             <View style={styles.overlay}>
//                 <View style={styles.popup}>
//                     <Text style={styles.title}>Attendee Details</Text>
//                     <Text style={styles.detail}>Name: {attendee?.name || 'N/A'}</Text>
//                     <Text style={styles.detail}>Email: {attendee?.email || 'N/A'}</Text>
//                     <Text style={styles.detail}>Phone: {attendee?.phone || 'N/A'}</Text>
//                     <TouchableOpacity style={styles.closeButton} onPress={onClose}>
//                         <Text style={styles.closeButtonText}>Close</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </Modal>
//     );
// };

// const styles = StyleSheet.create({
//     overlay: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     popup: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//         alignItems: 'center',
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     detail: {
//         fontSize: 16,
//         marginBottom: 5,
//     },
//     closeButton: {
//         marginTop: 20,
//         backgroundColor: '#2196F3',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//     },
//     closeButtonText: {
//         color: 'white',
//         fontSize: 16,
//     },
// });

// export default AttendeePopup;