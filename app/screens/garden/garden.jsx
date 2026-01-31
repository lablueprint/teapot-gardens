import React, { useState, useContext, useEffect } from 'react';
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
import { useIsFocused } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import { PlantContext } from '@app/screens/garden/PlantContext';

const url = 'http://localhost:4000';
const tempUserId = '696ad149027e7290f0c97e1e';

// XP thresholds for each level
const XP_THRESHOLDS = [0, 1000, 2000]; // Level 1: 0-999, Level 2: 1000-1999, Level 3: 2000+
const MAX_LEVEL = 3;

// Helper function to calculate level info from XP
const calculateLevelInfo = (xp) => {
  let level = 1;
  let currentLevelXP = 0;
  let nextLevelXP = XP_THRESHOLDS[1];

  if (xp >= XP_THRESHOLDS[2]) {
    level = 3;
    currentLevelXP = xp - XP_THRESHOLDS[2];
    nextLevelXP = 1000; // For display purposes at max level
  } else if (xp >= XP_THRESHOLDS[1]) {
    level = 2;
    currentLevelXP = xp - XP_THRESHOLDS[1];
    nextLevelXP = XP_THRESHOLDS[2] - XP_THRESHOLDS[1];
  } else {
    level = 1;
    currentLevelXP = xp;
    nextLevelXP = XP_THRESHOLDS[1];
  }

  const progress = Math.min(currentLevelXP / nextLevelXP, 1);
  const progressPercent = Math.round(progress * 100);

  return {
    level,
    currentLevelXP,
    nextLevelXP,
    progress,
    progressPercent,
    isMaxLevel: level === MAX_LEVEL,
  };
};

/* ---------- Shared background ---------- */
import gardenBg from '@assets/garden-assets/garden-background.png';

/* ---------- Plant-specific assets ---------- */
// Blue - unlocked
import b1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';
import b2 from '@assets/garden-assets/plant_1/plant_1_level_2.png';
import b3 from '@assets/garden-assets/plant_1/plant_1_level_3.png';
// Blue - locked
import b1L from '@assets/garden-assets/plant_1/plant_1_level_1_locked.png';
import b2L from '@assets/garden-assets/plant_1/plant_1_level_2_locked.png';
import b3L from '@assets/garden-assets/plant_1/plant_1_level_3_locked.png';
// Pink - unlocked
import p1 from '@assets/garden-assets/plant_2/plant_2_level_1.png';
import p2 from '@assets/garden-assets/plant_2/plant_2_level_2.png';
import p3 from '@assets/garden-assets/plant_2/plant_2_level_3.png';
// Pink - locked
import p1L from '@assets/garden-assets/plant_2/plant_2_level_1_locked.png';
import p2L from '@assets/garden-assets/plant_2/plant_2_level_2_locked.png';
import p3L from '@assets/garden-assets/plant_2/plant_2_level_3_locked.png';
// Yellow - unlocked
import y1 from '@assets/garden-assets/plant_3/plant_3_level_1.png';
import y2 from '@assets/garden-assets/plant_3/plant_3_level_2.png';
import y3 from '@assets/garden-assets/plant_3/plant_3_level_3.png';
// Yellow - locked
import y1L from '@assets/garden-assets/plant_3/plant_3_level_1_locked.png';
import y2L from '@assets/garden-assets/plant_3/plant_3_level_2_locked.png';
import y3L from '@assets/garden-assets/plant_3/plant_3_level_3_locked.png';

// Flower position constants
const FLOWER_TOP = 490;
const FLOWER_LEFT = 80;

/* ---------- Config table: everything the popup needs per flower ---------- */
// speechOffsets: [level1, level2, level3] - distance above flower top for speech bubble
const plantInfo = {
  'Blue Dandelion': {
    unlocked: [b1, b2, b3],
    locked: [b1L, b2L, b3L],
    description:
      "Just a happy little blue dandelion doing its best. Loves sunshine, compliments, and pretending it's a real flower.",
    funFact:
      "Fun fact: Blue dandelions aren't real in nature—yours is extra special!",
    speechOffsets: [20, 60, 100],  // Level 1: 20px above, Level 2: 60px above, Level 3: 100px above
    speechLeft: 160,
  },
  'Pink Dandelion': {
    unlocked: [p1, p2, p3],
    locked: [p1L, p2L, p3L],
    description:
      'A bashful pink dandelion that blushes even brighter when watered.',
    funFact:
      'Fun fact: Pink dandelions symbolize playfulness and sweet wishes.',
    speechOffsets: [50, 90, 130],
    speechLeft: 170,
  },
  'Yellow Dandelion': {
    unlocked: [y1, y2, y3],
    locked: [y1L, y2L, y3L],
    description:
      'Classic, cheerful, powered by optimism and a daily dose of vitamin D.',
    funFact:
      'Fun fact: Real yellow dandelions close at night and open with sunrise.',
    speechOffsets: [20, 60, 100],
    speechLeft: 175,
  },
};

export default function GardenScreen() {
  const navigation        = useNavigation();
  const isFocused         = useIsFocused();
  const { heroPlant }     = useContext(PlantContext);      // 💚 chosen in Nursery
  const {
    unlocked,
    locked,
    description,
    funFact,
    speechOffsets,
    speechLeft,
  } = plantInfo[heroPlant.name] || plantInfo['Blue Dandelion'];

  /* nickname editing */
  const [nickname,   setNickname]   = useState('');
  const [editing,    setEditing]    = useState(false);
  const [draftName,  setDraftName]  = useState('');
  const [popupOpen,  setPopupOpen]  = useState(false);
  const [userXP,     setUserXP]     = useState(0);

  // Fetch user's plant name and XP when screen is focused
  useEffect(() => {
    if (isFocused) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${url}/api/users/${tempUserId}`);
          setNickname(response.data.tamagatchiName || 'Gary');
          setUserXP(response.data.tamagatchiXP || 0);
        } catch (error) {
          console.log('Error fetching user data:', error);
          setNickname('Gary');
        }
      };
      fetchUserData();
    }
  }, [isFocused]);

  // Calculate level info from user XP
  const levelInfo = calculateLevelInfo(userXP);

  // Calculate dynamic speech bubble position based on level
  const speechOffset = speechOffsets[levelInfo.level - 1] || speechOffsets[0];
  const speechPos = { top: FLOWER_TOP - speechOffset, left: speechLeft };

  const confirmEdit = async () => {
    const trimmed = draftName.trim();
    if (trimmed) {
      setNickname(trimmed);
      try {
        await axios.patch(`${url}/api/users/${tempUserId}`, {
          tamagatchiName: trimmed
        });
      } catch (error) {
        console.log('Error saving plant name:', error);
      }
    }
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
        <Image source={unlocked[levelInfo.level - 1]} style={styles.flower} resizeMode="contain" />

        {/* info tile -------------------------------------------------------- */}
        <Pressable style={styles.infoPanel} onPress={() => setPopupOpen(true)}>
          <Text style={styles.nameText}>{nickname}</Text>
          <Text style={styles.subText}>{heroPlant.name}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${levelInfo.progressPercent}%` }]} />
          </View>
          <Text style={styles.levelText}>
            LVL {levelInfo.level}/{MAX_LEVEL} • {levelInfo.currentLevelXP}/{levelInfo.nextLevelXP} XP
          </Text>
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
                  <Image source={levelInfo.level >= 1 ? unlocked[0] : locked[0]} style={styles.popupLevelIcon} />
                  <Image source={levelInfo.level >= 2 ? unlocked[1] : locked[1]} style={styles.popupLevelIcon} />
                  <Image source={levelInfo.level >= 3 ? unlocked[2] : locked[2]} style={styles.popupLevelIcon} />
                </View>
                <View style={styles.popupLevelsLabel}>
                  <Text style={[styles.popupLevelText, levelInfo.level === 1 && styles.currentLevelText]}>LV1</Text>
                  <Text style={[styles.popupLevelText, levelInfo.level === 2 && styles.currentLevelText]}>LV2</Text>
                  <Text style={[styles.popupLevelText, levelInfo.level === 3 && styles.currentLevelText]}>LV3</Text>
                </View>

                {/* XP bar - shows overall progress across all levels */}
                <View style={styles.levelBarWrapper}>
                  <View style={[styles.popupProgressFill, { width: `${Math.min((userXP / XP_THRESHOLDS[2]) * 100, 100)}%` }]} />
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
  speechWrapper: { position: 'absolute', maxWidth: '70%' },
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
  currentLevelText: { fontWeight: 'bold', color: '#708238' },

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
