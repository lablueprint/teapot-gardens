import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';

// ─── Assets ──────────────────────────────────────────────────────
import gardenBg from '@assets/garden-assets/garden-background.png';
import plant_1_level_1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';
import plant_1_level_2_locked from '@assets/garden-assets/plant_1/plant_1_level_2_locked.png';
import plant_1_level_3_locked from '@assets/garden-assets/plant_1/plant_1_level_3_locked.png';

export default function GardenScreen() {
  const [popupVisible, setPopupVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <ImageBackground source={gardenBg} style={styles.bg} resizeMode="cover">
        
        
{/* ─── Combined Header Container ───────────────────────────── */}
<View style={styles.headerContainer}>
  {/* Top Header Row */}
  <View style={styles.topHeader}>
    <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.drawerBtn}>
      <Text style={styles.drawerIcon}>☰</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => navigation.navigate("Nursery")} style={styles.nurseryBtn}>
      <Text style={styles.nurseryIcon}>🌱</Text>
    </TouchableOpacity>
  </View>

  {/* Garden Title Header */}
  <View style={styles.headerBelow}>
    <Text style={styles.headerText}>Your Garden</Text>
  </View>
</View>

        {/* ─── Greeting Bubble ─────────────────────────────────── */}
        <View style={styles.speechWrapper}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              <Text style={{ fontStyle: 'italic' }}>Welcome Henry!</Text>
            </Text>
          </View>
          <View style={styles.speechTail} />
        </View>

        {/* ─── Flower ──────────────────────────────────────────── */}
        <Image source={plant_1_level_1} style={styles.flower} resizeMode="contain" />

        {/* ─── Info Panel ──────────────────────────────────────── */}
        <Pressable style={styles.infoPanel} onPress={() => setPopupVisible(true)}>
          <Text style={styles.nameText}>Gary</Text>
          <Text style={styles.subText}>Yellow Dandelion</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
          </View>
          <Text style={styles.levelText}>LVL 2/3     400/600 XP</Text>
        </Pressable>
      </ImageBackground>

      {/* ─── Popup ─────────────────────────────────────────────── */}
      <Modal
        animationType="fade"
        transparent
        visible={popupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPopupVisible(false)}>
          <BlurView intensity={25} tint="dark" style={styles.modalBackdrop}>
            <View style={styles.popupCard}>
              <View style={styles.popupHeader}>
                <Text style={styles.popupTitle}>Gary</Text>
                <TouchableOpacity onPress={() => setPopupVisible(false)}>
                  <Text style={styles.closeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.popupSubtitle}>Starters</Text>

              <Text style={styles.plantTitle}>Orchid Seedling</Text>
              <Text style={styles.plantDescription}>
                Description of what the plant is – lorem ipsum lalalalala hello my name is Daniel!
              </Text>

              <View style={styles.popupLevels}>
                <Image source={plant_1_level_1} style={styles.popupLevelIcon} />
                <Image source={plant_1_level_2_locked} style={[styles.popupLevelIcon, { opacity: 0.3 }]} />
                <Image source={plant_1_level_3_locked} style={[styles.popupLevelIcon, { opacity: 0.15 }]} />
              </View>
              <View style={styles.popupLevelsLabel}>
                <Text style={styles.popupLevelText}>LV1</Text>
                <Text style={styles.popupLevelText}>LV2</Text>
                <Text style={styles.popupLevelText}>LV3</Text>
              </View>

              <View style={styles.popupProgressBar}>
                <View style={[styles.popupProgressFill, { width: '33%' }]} />
              </View>

              <View style={styles.popupFunFact}>
                <Text style={styles.funFactIcon}>🌱</Text>
                <Text style={styles.funFactText}>
                  Fun fact: Your plant is an orchid. It survives in sunny and windy environments.
                </Text>
              </View>
            </View>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

// ───────────────────────────────────────────────────────────────
// Styles
// ───────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  bg: { flex: 1, paddingTop: 60, alignItems: 'center' },
  headerContainer: {
    marginTop: 30, // or any value you want
    width: '90%',
    position: 'absolute',
    top: 30,
  },  
  // Top Menu/Nursery Row
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  drawerIcon: {
    fontSize: 20,
    color: '#000',
  },
  nurseryBtn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 8,
  },
  nurseryIcon: {
    fontSize: 20,
  },

  headerBelow: {
    marginTop: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
  },

  // Speech bubble
  speechWrapper: {
    position: 'absolute',
    top: 470,
    left: 160,
    maxWidth: '70%',
  },
  speechBubble: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 1 },
  },
  speechTail: {
    position: 'absolute',
    bottom: -6,
    left: 30,
    width: 14,
    height: 14,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],
  },
  speechText: {
    fontSize: 16,
    color: '#000',
  },

  // Flower
  flower: {
    width: 250,
    height: 180,
    position: 'absolute',
    top: 490,
    left: 80,
    transform: [{ rotate: '-1.85deg' }],
  },

  // Info panel
  infoPanel: {
    position: 'absolute',
    bottom: 30,
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  subText: { color: 'gray', marginBottom: 10 },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 4,
  },
  progressFill: { height: '100%', backgroundColor: '#708238' },
  levelText: { fontSize: 12, color: 'gray', marginTop: 4 },

  // Modal
  modalBackdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupCard: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  popupHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#101828',
  },
  popupSubtitle: {
    color: '#10182880',
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '400',
  },
  closeIcon: {
    fontSize: 22,
    position: 'absolute',
    right: -120,
    top: 10,
  },
  plantTitle: { fontWeight: '600', marginBottom: 4 },
  plantDescription: { color: 'gray', marginBottom: 12 },
  popupLevels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  popupLevelIcon: { width: 48, height: 48 },
  popupLevelsLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  popupLevelText: { fontSize: 12, color: 'gray', width: 48, textAlign: 'center' },
  popupProgressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 12,
  },
  popupProgressFill: { height: '100%', backgroundColor: '#8DC53F' },
  popupFunFact: { flexDirection: 'row', alignItems: 'flex-start', gap: 6 },
  funFactIcon: { fontSize: 16 },
  funFactText: { flex: 1, fontSize: 12 },
});
