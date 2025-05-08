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


// ─── Assets ──────────────────────────────────────────────────────
import gardenBg     from '@assets/garden-assets/garden-background.png';
import defaultFlower from '@assets/garden-assets/starter-plant.png';
import { BlurView } from 'expo-blur';



export default function GardenScreen() {
  const [popupVisible, setPopupVisible] = useState(false);  
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <ImageBackground
        source={gardenBg}
        resizeMode="cover"
        style={styles.background}
        imageStyle={{ width: 625, height: 900, alignSelf: 'flex-start' }}
      >
        {/* ─── Header ───────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Your Garden</Text>
          <View style={styles.iconBox}>
            <TouchableOpacity onPress={() => navigation.navigate("Nursery")}>
                <Text style={styles.icon}>🌱</Text>
            </TouchableOpacity>
            </View>
        </View>

        {/* ─── Greeting Bubble ─────────────────────────────────── */}
        <View style={styles.speechWrapper}>
        <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
            <Text style={{ fontStyle: 'italic' }}>Welcome Henry!</Text>
            </Text>
        </View>

        {/* little triangle tail */}
        <View style={styles.speechTail} />
        </View>


        {/* ─── Flower ──────────────────────────────────────────── */}
        <Image 
            source={defaultFlower} 
            style={styles.flower} 
            resizeMode="contain" 
        />


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
            {/* Header */}
            <View style={styles.popupHeader}>
              <Text style={styles.popupTitle}>Gary</Text>
              <TouchableOpacity onPress={() => setPopupVisible(false)}>
                <Text style={styles.closeIcon}>✕</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.popupSubtitle}>Starters</Text>

            {/* Description */}
            <Text style={styles.plantTitle}>Orchid Seedling</Text>
            <Text style={styles.plantDescription}>
              Description of what the plant is – lorem ipsum lalalalala hello my name is Daniel!
            </Text>

            {/* Level images */}
            <View style={styles.popupLevels}>
              <Image source={defaultFlower} style={styles.popupLevelIcon} />
              <Image source={defaultFlower} style={[styles.popupLevelIcon, { opacity: 0.3 }]} />
              <Image source={defaultFlower} style={[styles.popupLevelIcon, { opacity: 0.15 }]} />
            </View>
            <View style={styles.popupLevelsLabel}>
              <Text style={styles.popupLevelText}>LV1</Text>
              <Text style={styles.popupLevelText}>LV2</Text>
              <Text style={styles.popupLevelText}>LV3</Text>
            </View>

            {/* Popup progress bar */}
            <View style={styles.popupProgressBar}>
              <View style={[styles.popupProgressFill, { width: '33%' }]} />
            </View>

            {/* Fun fact */}
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
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },

  /* Header */
  header: {
    position: 'absolute',
    top: 30,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: { fontSize: 24, fontWeight: '600', color: '#000' },
  iconBox: { backgroundColor: '#fff', borderRadius: 10, padding: 5 },
  icon: { fontSize: 18 },

/* ---------- Speech bubble ---------- */
speechWrapper: {
    position: 'absolute',
    top: 470,            // tune these two numbers so the
    left:  160,           // bubble sits where you want it
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
    bottom: -6,          // pulls the tail just under the bubble
    left:   30,          // moves tail horizontally – tweak as needed
    width:  14,
    height: 14,
    backgroundColor: '#fff',
    transform: [{ rotate: '45deg' }],   // makes the square a ♦
  },
  
  speechText: { fontSize: 16, color: '#000' },
  
  speechText: { fontSize: 16, color: '#000' },

  /* Flower */
  flower: {
    width: 250,  
    height: 180,
    position: 'absolute',
    top: 490,
    left: 80,
    transform: [{ rotate: '-1.85deg' }],
  },

  /* Info panel */
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
  nameText: { fontSize: 20, fontWeight: 'bold'},
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

  /* Popup */
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
    color: '#101828'
  },  
  popupSubtitle: { 
    color: '#10182880', 
    marginBottom: 12,
    fontSize: 14,
    textAlign: 'center', 
    fontWeight: 400          

   },
  closeIcon: { fontSize: 22,
    position: 'absolute',
    right: -120,                      // parks ✕ on the far right without
    top: 10,                        // disturbing the centered title
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
