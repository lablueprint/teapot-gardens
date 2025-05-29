import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { PlantContext } from '@app/screens/garden/PlantContext';

/* ─── Assets ────────────────────────────────────────────────── */
import nurseryBg from '@assets/garden-assets/garden-background.png';

// -- Plant set #1 ------------------------------------------------
import plant_1_level_1 from '@assets/garden-assets/plant_1/plant_1_level_1.png';
import plant_1_level_2 from '@assets/garden-assets/plant_1/plant_1_level_2.png';
import plant_1_level_3 from '@assets/garden-assets/plant_1/plant_1_level_3.png';

// -- Plant set #2 ------------------------------------------------
import plant_2_level_1 from '@assets/garden-assets/plant_2/plant_2_level_1.png';
import plant_2_level_2 from '@assets/garden-assets/plant_2/plant_2_level_2.png';
import plant_2_level_3 from '@assets/garden-assets/plant_2/plant_2_level_3.png';

// -- Plant set #3 ------------------------------------------------
import plant_3_level_1 from '@assets/garden-assets/plant_3/plant_3_level_1.png';
import plant_3_level_2 from '@assets/garden-assets/plant_3/plant_3_level_2.png';
import plant_3_level_3 from '@assets/garden-assets/plant_3/plant_3_level_3.png';

export default function NurseryScreen() {
  const navigation        = useNavigation();
  const { setHeroPlant }  = useContext(PlantContext);   // ✨

  const [collapsed, setCollapsed] = useState({
    starters: false,
    spring:   false,
    special:  false,
  });

  const starterPlants = [
    { id: 1, name: 'Blue Dandelion',   stage: 'Stage 1/3', img: plant_1_level_1, unlocked: true },
    { id: 2, name: 'Pink Dandelion',   stage: 'Stage 1/3', img: plant_2_level_1, unlocked: true },
    { id: 3, name: 'Yellow Dandelion', stage: 'Stage 1/3', img: plant_3_level_1, unlocked: true },
  ];

  const [selectedPlant, setSelectedPlant] = useState(starterPlants[0]);

  const toggle = key => setCollapsed(p => ({ ...p, [key]: !p[key] }));

  // when a user taps a thumbnail
  const handleSelect = (plant) => {
    setSelectedPlant(plant);
    setHeroPlant(plant);          // 🚀 updates Garden instantly
  };

  return (
    <View style={{ flex: 1, overflow: 'hidden' }}>
      <ImageBackground source={nurseryBg} style={styles.bg} resizeMode="cover">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.navigate('Garden')}   // nicer than .navigate('Garden')
          >
            <Ionicons name="chevron-back" size={22} color="#101828" />
          </TouchableOpacity>

          <View>
            <Text style={styles.title}>Nursery</Text>
            <Text style={styles.subTitle}>{selectedPlant.name}</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeTxt}>2</Text>
            <Ionicons name="leaf" size={12} color="#fff" />
          </View>
        </View>

        {/* Hero flower */}
        <Image source={selectedPlant.img} style={styles.hero} resizeMode="contain" />

        {/* Action buttons */}
        <View style={styles.actionRow}>
          <Pressable style={[styles.actBtn, { flex: 1, marginRight: 8 }]}>
            <Ionicons name="eye" size={16} color="#fff" />
            <Text style={styles.actTxt}>In&nbsp;Your&nbsp;Garden</Text>
          </Pressable>
          <Pressable style={[styles.actBtn, { width: 48 }]}>
            <Ionicons name="help" size={20} color="#fff" />
          </Pressable>
        </View>

        {/* Scroll panel */}
        <ScrollView
          style={styles.card}
          contentContainerStyle={{ paddingBottom: 48 }}
          showsVerticalScrollIndicator={false}
        >
          <PlantSection
            title="Starters"
            subtitle="3 Starter Plants"
            collapsed={collapsed.starters}
            onToggle={() => toggle('starters')}
            plants={starterPlants}
            selectedId={selectedPlant.id}
            onSelect={handleSelect}   // 👈 use new handler
          />

          <Separator />

          {/* ---------- Spring Plants (locked) ---------- */}
          <PlantSection
            title="Spring Plants"
            subtitle="3 Plants That Bloom in Spring"
            collapsed={collapsed.spring}
            onToggle={() => toggle('spring')}
            plants={[
              { id: 4, img: plant_1_level_2, unlocked: false },
              { id: 5, img: plant_2_level_2, unlocked: false },
              { id: 6, img: plant_3_level_2, unlocked: false },
            ]}
            selectedId={selectedPlant.id}          // not clickable but keeps highlight logic tidy
            onSelect={() => {}}                    // no-op
          />

          <Separator />

          {/* ---------- Special Plants (locked) ---------- */}
          <PlantSection
            title="Special Plants"
            subtitle="???"
            collapsed={collapsed.special}
            onToggle={() => toggle('special')}
            plants={[
              { id: 7, img: plant_1_level_3, unlocked: false },
              { id: 8, img: plant_2_level_3, unlocked: false },
              { id: 9, img: plant_3_level_3, unlocked: false },
            ]}
            selectedId={selectedPlant.id}
            onSelect={() => {}}
          />
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

/* ─── Helpers ─────────────────────────────────────────────── */
function PlantSection({ title, subtitle, collapsed, onToggle, plants, selectedId, onSelect }) {
  return (
    <View>
      <TouchableOpacity style={styles.secHeader} onPress={onToggle}>
        <View>
          <Text style={styles.secTitle}>{title}</Text>
          <Text style={styles.secSubtitle}>{subtitle}</Text>
        </View>
        <Ionicons
          name={collapsed ? 'chevron-down' : 'chevron-up'}
          size={18}
          color="#101828"
        />
      </TouchableOpacity>

      {!collapsed && (
        <View style={styles.plantRow}>
          {plants.map(p => (
            <PlantThumb
              key={p.id}
              {...p}
              selected={p.id === selectedId}
              onPress={() => p.unlocked && onSelect(p)}
            />
          ))}
        </View>
      )}
    </View>
  );
}

function PlantThumb({ name, stage, img, unlocked, selected, onPress }) {
  const Wrapper = unlocked ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.thumb, selected && styles.thumbSelected]}
    >
      {/* name + stage */}
      <Text style={styles.thumbName}>{name}</Text>
      <Text style={styles.thumbStage}>{stage}</Text>

      {/* plant icon */}
      <Image source={img} style={styles.thumbImg} resizeMode="contain" />

      {/* lock overlay */}
      {!unlocked && (
        <View style={styles.lockOverlay}>
          <Ionicons name="lock-closed" size={20} color="#fff" />
        </View>
      )}
    </Wrapper>
  );
}


const Separator = () => <View style={styles.sep} />;

/* ─── Styles ─────────────────────────────────────────────── */
const styles = StyleSheet.create({
  bg: { flex: 1, paddingTop: 60, alignItems: 'center' },

  /* Header */
  header: {
    width: '90%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#ffffffcc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:    { fontSize: 28, fontWeight: '700', color: '#101828' },
  subTitle: { fontSize: 14, color: '#10182880', textAlign: 'center' },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#708238',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeTxt: { color: '#fff', fontSize: 12, fontWeight: '600' },

  /* Hero flower */
  hero: { width: 140, height: 120, marginBottom: 24 },

  /* Actions */
  actionRow: { flexDirection: 'row', width: '80%', marginBottom: 24 },
  actBtn: {
    backgroundColor: '#708238',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actTxt: { color: '#fff', marginLeft: 8, fontWeight: '600' },

  /* White rounded panel (scroll-view) */
  card: {
    width: '95%',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 24,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
  },

  /* Section */
  secHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  secTitle:    { fontSize: 24, fontWeight: '700', color: '#101828' },
  secSubtitle: { fontSize: 14, color: '#10182880', marginTop: 2 },
  plantRow:    { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },

  /* Plant thumbnail */
  thumb: {
    width: 100,            // a bit wider to fit the text nicely
    height: 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    alignItems: 'center',
    paddingTop: 8,
    backgroundColor: '#ffffff',
  },
  thumbName:  { fontSize: 10, fontWeight: '600', color: '#101828' },
  thumbStage: { fontSize: 12, color: '#8d8d8d', marginBottom: 4 },
  thumbImg:   { width: 80, height: 80 },
  thumbSelected: {
    borderColor: '#708238',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  lockOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#00000055',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Dashed separator */
  sep: {
    width: '100%',
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#d6d6d6',
    marginVertical: 24,
  },
});
