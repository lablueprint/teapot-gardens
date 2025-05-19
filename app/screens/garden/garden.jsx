import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
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
import Ionicons from 'react-native-vector-icons/Ionicons';

import { PlantContext } from '@app/screens/garden/PlantContext';  

/* ---------- Shared background ---------- */
import gardenBg from '@assets/garden-assets/garden-background.png';

/* ---------- Plant-specific assets ---------- */
// Blue
import b1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';
import b2L from '@assets/garden-assets/plant_1/plant_1_level_2_locked.png';
import b3L from '@assets/garden-assets/plant_1/plant_1_level_3_locked.png';
// Pink
import p1 from '@assets/garden-assets/plant_2/plant_2_level_1.png';
import p2L from '@assets/garden-assets/plant_2/plant_2_level_2_locked.png';
import p3L from '@assets/garden-assets/plant_2/plant_2_level_3_locked.png';
// Yellow
import y1 from '@assets/garden-assets/plant_3/plant_3_level_1.png';
import y2L from '@assets/garden-assets/plant_3/plant_3_level_2_locked.png';
import y3L from '@assets/garden-assets/plant_3/plant_3_level_3_locked.png';

/* ---------- Config table: everything the popup needs per flower ---------- */
const plantInfo = {
  'Blue Dandelion': {
    levels: [b1, b2L, b3L],
    description:
      'Just a happy little blue dandelion doing its best. Loves sunshine, compliments, and pretending it’s a real flower.',
    funFact:
      'Fun fact: Blue dandelions aren’t real in nature—yours is extra special!',
    speechPos: { top: 470, left: 160 },
  },
  'Pink Dandelion': {
    levels: [p1, p2L, p3L],
    description:
      'A bashful pink dandelion that blushes even brighter when watered.',
    funFact:
      'Fun fact: Pink dandelions symbolize playfulness and sweet wishes.',
    speechPos: { top: 440, left: 170 },
  },
  'Yellow Dandelion': {
    levels: [y1, y2L, y3L],
    description:
      'Classic, cheerful, powered by optimism and a daily dose of vitamin D.',
    funFact:
      'Fun fact: Real yellow dandelions close at night and open with sunrise.',
    speechPos: { top: 470, left: 175 },
  },
};

export default function GardenScreen() {
  const navigation        = useNavigation();
  const { heroPlant }     = useContext(PlantContext);      // 💚 chosen in Nursery
  const {
    levels,
    description,
    funFact,
    speechPos,
  } = plantInfo[heroPlant.name] || plantInfo['Blue Dandelion'];

  /* nickname editing */
  const [nickname,   setNickname]   = useState('Gary');
  const [editing,    setEditing]    = useState(false);
  const [draftName,  setDraftName]  = useState('');
  const [popupOpen,  setPopupOpen]  = useState(false);

  const confirmEdit = () => {
    const trimmed = draftName.trim();
    if (trimmed) setNickname(trimmed);
    setEditing(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={gardenBg} style={styles.bg} resizeMode="cover">
        {/* header ----------------------------------------------------------- */}
        <View style={styles.headerContainer}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={styles.drawerBtn}>
              <Text style={styles.drawerIcon}>☰</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Nursery')} style={styles.nurseryBtn}>
              <Text style={styles.nurseryIcon}>🌱</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerBelow}>
            <Text style={styles.headerText}>Your Garden</Text>
          </View>
        </View>

        {/* greeting bubble -------------------------------------------------- */}
        <View style={[styles.speechWrapper, speechPos]}>
          <View style={styles.speechBubble}>
            <Text style={styles.speechText}>
              <Text style={{ fontStyle: 'italic' }}>
                Welcome&nbsp;{nickname}!
              </Text>
            </Text>
          </View>
          <View style={styles.speechTail} />
        </View>

        {/* main flower ------------------------------------------------------ */}
        <Image source={heroPlant.img} style={styles.flower} resizeMode="contain" />

        {/* info tile -------------------------------------------------------- */}
        <Pressable style={styles.infoPanel} onPress={() => setPopupOpen(true)}>
          <Text style={styles.nameText}>{nickname}</Text>
          <Text style={styles.subText}>{heroPlant.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
          </View>
          <Text style={styles.levelText}>LVL 1/3 &nbsp;  200 / 600 XP</Text>
        </Pressable>
      </ImageBackground>

      {/* popup ------------------------------------------------------------- */}
      <Modal
        animationType="fade"
        transparent
        visible={popupOpen}
        onRequestClose={() => setPopupOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setPopupOpen(false)}>
          <BlurView intensity={25} tint="dark" style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.popupCard}>
                {/* header row (nickname) */}
                <View style={styles.popupHeader}>
                  {editing ? (
                    <TextInput
                      value={draftName}
                      onChangeText={setDraftName}
                      style={styles.popupTitleInput}
                      maxLength={18}
                      autoFocus
                      onSubmitEditing={confirmEdit}
                    />
                  ) : (
                    <Text style={styles.popupTitle}>{nickname}</Text>
                  )}

                  {editing ? (
                    <TouchableOpacity style={styles.headerIcon} onPress={confirmEdit}>
                      <Ionicons name="checkmark" size={20} color="#101828" />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.headerIcon} onPress={() => { setDraftName(nickname); setEditing(true); }}>
                      <Ionicons name="pencil" size={18} color="#101828" />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={[styles.headerIcon, { right: 0 }]}
                    onPress={() => { setEditing(false); setPopupOpen(false); }}
                  >
                    <Ionicons name="close" size={22} color="#101828" />
                  </TouchableOpacity>
                </View>

                <Text style={styles.popupSubtitle}>Starters</Text>
                <View style={styles.dashedLine} />

                {/* description */}
                <Text style={styles.plantTitle}>{heroPlant.name}</Text>
                <Text style={styles.plantDescription}>{description}</Text>

                <View style={styles.dashedLine} />

                {/* level row */}
                <View style={styles.popupLevels}>
                  <Image source={levels[0]} style={styles.popupLevelIcon} />
                  <Image source={levels[1]} style={[styles.popupLevelIcon, styles.levelLocked]} />
                  <Image source={levels[2]} style={[styles.popupLevelIcon, styles.levelLocked]} />
                </View>
                <View style={styles.popupLevelsLabel}>
                  <Text style={styles.popupLevelText}>LV1</Text>
                  <Text style={styles.popupLevelText}>LV2</Text>
                  <Text style={styles.popupLevelText}>LV3</Text>
                </View>

                {/* XP bar */}
                <View style={styles.levelBarWrapper}>
                  <View style={[styles.popupProgressFill, { width: '33%' }]} />
                  <View style={styles.tick} />
                  <View style={[styles.tick, { left: '66%' }]} />
                </View>

                <View style={styles.dashedLine} />

                {/* fun fact */}
                <View style={styles.popupFunFact}>
                  <Text style={styles.funFactIcon}>🌱</Text>
                  <Text style={styles.funFactText}>{funFact}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </BlurView>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  bg: { flex: 1, paddingTop: 60, alignItems: 'center' },

  /* Header */
  headerContainer: { width: '90%', position: 'absolute', top: 60 },
  topHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  drawerBtn: { backgroundColor: '#fff', borderRadius: 10, padding: 8 },
  drawerIcon: { fontSize: 20, color: '#000' },
  nurseryBtn: { backgroundColor: '#fff', borderRadius: 10, padding: 8 },
  nurseryIcon: { fontSize: 20 },
  headerBelow: { marginTop: 12, alignItems: 'center' },
  headerText: { fontSize: 36, fontWeight: '600', color: '#000' },

  /* Greeting bubble */
  speechWrapper: { position: 'absolute', top: 470, left: 160, maxWidth: '70%' },
  speechBubble: {
    backgroundColor: '#fff', paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 10, shadowColor: '#000', shadowOpacity: 0.12, shadowOffset: { width: 0, height: 1 },
  },
  speechTail: {
    position: 'absolute', bottom: -6, left: 30, width: 14, height: 14,
    backgroundColor: '#fff', transform: [{ rotate: '45deg' }],
  },
  speechText: { fontSize: 16, color: '#000' },

  /* Main flower */
  flower: {
    width: 250, height: 180, position: 'absolute', top: 490, left: 80,
    transform: [{ rotate: '-1.85deg' }],
  },

  /* Info panel */
  infoPanel: {
    position: 'absolute', bottom: 30, width: '90%',
    backgroundColor: '#fff', padding: 20, borderRadius: 20,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },
  },
  nameText: { fontSize: 20, fontWeight: 'bold' },
  subText: { color: 'gray', marginBottom: 10 },
  progressBar: {
    width: '100%', height: 6, backgroundColor: '#e0e0e0',
    borderRadius: 3, overflow: 'hidden',
  },
  progressFill: { height: '100%', backgroundColor: '#708238' },
  levelText: { fontSize: 12, color: 'gray', marginTop: 4 },

  /* Modal backdrop */
  modalBackdrop: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  /* Popup card */
  popupCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },

  /* popup header */
  popupHeader: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  popupTitle:  { fontSize: 24, fontWeight: '700', color: '#101828' },
  popupTitleInput: {
    fontSize: 24, fontWeight: '700', color: '#101828',
    textAlign: 'center', paddingVertical: 0,
    minWidth: 120,
  },
  headerIcon:  { position: 'absolute', right: 36 },

  popupSubtitle: { fontSize: 14, color: '#6b6b6b', textAlign: 'center', marginTop: 2, marginBottom: 12 },

  /* dashed separators */
  dashedLine: { width: '100%', borderStyle: 'dashed', borderWidth: 1, borderColor: '#d6d6d6', marginVertical: 12 },

  /* description */
  plantTitle:       { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  plantDescription: { fontSize: 13, color: '#6b6b6b' },

  /* level row */
  popupLevels:      { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  popupLevelIcon:   { width: 100, height: 100, resizeMode: 'contain' },
  levelLocked:      { opacity: 0.75 },
  popupLevelsLabel: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  popupLevelText:   { fontSize: 12, width: 64, textAlign: 'center', color: '#6b6b6b' },

  /* progress bar with ticks */
  levelBarWrapper: {
    width: '100%', height: 6, backgroundColor: '#e0e0e0',
    borderRadius: 3, overflow: 'hidden', marginTop: 12, marginBottom: 16,
  },
  popupProgressFill: { height: '100%', backgroundColor: '#8DC53F' },
  tick: {
    position: 'absolute', top: -4, left: '33%',
    width: 1, height: 14, backgroundColor: '#00000055',
  },

  /* fun fact */
  popupFunFact: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  funFactIcon:  { fontSize: 18, marginTop: 2 },
  funFactText:  { flex: 1, fontSize: 13, color: '#101828' },
});
