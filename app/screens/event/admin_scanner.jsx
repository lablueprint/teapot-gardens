import React, { useState, useRef } from "react";
import { View, Text, Alert, Button, StyleSheet } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import axios from "axios";

const AdminScanner = () => {
  const tempEventId = "67932a72413f4d68be84e592";
  const [scannedUserId, setScannedUserId] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();
  const scannedRef = useRef(false);

  const handleScan = async ({ type, data }) => {
    if (scannedRef.current || !data) return;

    scannedRef.current = true; // block further scans immediately
    setScannedUserId(data);

    try {
      const response = await axios.get(
        `https://e6b3-131-179-94-72.ngrok-free.app/api/users/${data}`
      );
      console.log(response.data)
      const currentEvents = response.data.attendedEvents || [];

      if (currentEvents.includes(tempEventId)) {
        Alert.alert(`Already scanned ${response.data.name}!`);
      } else {
        const XPLevel = Math.floor(response.data.tamagatchiXP / 100);
        const updates = {
          attendedEvents: [...currentEvents, tempEventId],
        };

        if (XPLevel > response.data.tamagatchiLevel) {
          updates.notifications = `Your plant has reached level ${XPLevel}`;
          updates.tamagatchiLevel = XPLevel;
        }
        
        try { 
          await axios.patch(
            `https://e6b3-131-179-94-72.ngrok-free.app/api/users/${data}`,
            updates
          );
        } catch (err) {
          console.log("Error 1", err);
          Alert.alert("Error", "Failed to update attendance.");
        }
        Alert.alert("Success", `${response.data.name} marked as attended!`);
      }
    } catch (err) {
      console.log("Error 2", err);
      Alert.alert("Error", "Failed to update attendance.");
    }
  };


  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={handleScan} 
        barCodeScannerSettings={{ barCodeTypes: ["qr"] }}
      />
      {scannedUserId && <Text style={styles.scannedText}>Scanned User ID: {scannedUserId}</Text>}
    </View>
  );
};

export default AdminScanner;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  camera: { flex: 1, width: "100%" },
  scannedText: { textAlign: "center", marginTop: 20 },
});
