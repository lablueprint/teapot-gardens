import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Dimensions,
  FlatList,           // NEW – use FlatList for horizontal paging
} from 'react-native';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Placeholder from './homepage_components/mainimage';
import Event       from '@screens/program_page/event';

import sample_logo from '@assets/sample.png';
import pichu       from '@assets/pichu.jpg';
import pikachu     from '@assets/pikachu.jpg';
import raichu      from '@assets/raichu.jpg';
import gardenBG    from '@assets/garden-assets/garden-background.png';

const url        = 'http://localhost:4000';
const tempUserId = '6789f49f8e0a009647312c7a';

/* ─── Layout constants ──────────────────────────────────────────── */                      

export default function Homepage() {
  const [userData,            setUserData]            = useState(null);
  const [userAttendingEvents, setUserAttendingEvents] = useState([]);
  const [events,              setEvents]              = useState([]);
  const [loading,             setLoading]             = useState(true);

  /* ---------- Avatar level image ---------- */
  let level_img = sample_logo;
  if (userData?.tamagatchiXP !== undefined) {
    if      (userData.tamagatchiXP < 1000)  level_img = pichu;
    else if (userData.tamagatchiXP <= 2000) level_img = pikachu;
    else                                    level_img = raichu;
  }

  /* ---------- Fetch user ---------- */
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${url}/api/users/${tempUserId}`);
        setUserData(data);
        setUserAttendingEvents(data.attendingEvents || []);
      } catch (err) {
        console.error('Error fetching user:', err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* ---------- Fetch attending events ---------- */
  useEffect(() => {
    if (!userAttendingEvents.length) return;
    (async () => {
      try {
        const uniqueIds = Array.from(new Set(userAttendingEvents));
        const res = await Promise.all(
          uniqueIds.map(id => axios.get(`${url}/api/events/${id}`))
        );
        setEvents(res.map(r => r.data));
      } catch (err) {
        console.error('Error fetching events:', err.message);
      }
    })();
  }, [userAttendingEvents]);

  /* ========================= Render ========================= */
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------- Pet card ---------- */}
        <View style={styles.petCard}>
          <Image source={gardenBG} style={styles.petImg} resizeMode="cover" />
          <View style={styles.petOverlay}>
            <Text style={styles.petTitle}>Grey is looking good!</Text>
            <Text style={styles.petSub}>
              You're 100 pts away{'\n'}from leveling up!
            </Text>
            <Text style={styles.petLvl}>LVL 2/3</Text>
          </View>
        </View>

        <Pressable style={styles.enterBtn}>
          <Text style={styles.enterTxt}>Enter My Garden</Text>
        </Pressable>

        {/* ---------- My Events ---------- */}
        <Text style={styles.sectionHdr}>My Events</Text>

        {events.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              Looks like you don't have any events yet!
            </Text>
            <Text style={styles.emptySub}>
              Come back here to view registered events
            </Text>
            <Ionicons
              name="leaf-outline"
              size={28}
              color="#8d9282"
              style={{ marginTop: 12 }}
            />
          </View>
        ) : (
          /* -------------- Carousel (exactly one card per swipe) -------------- */
          <FlatList
            data={events}
            horizontal
            pagingEnabled                /* ⬅️ snap full-width pages */
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item._id ?? String(item.id)}
            renderItem={({ item }) => (
              <View style={styles.carouselCard}>
                <Event {...item} />
              </View>
            )}
          />
        )}

        {/* ---------- Subscriptions ---------- */}
        <Text style={styles.sectionHdr}>Subscriptions</Text>
        <View style={styles.subRow}>
          <View style={styles.subIconWrap}>
            <Ionicons name="star-outline" size={22} color="#8d9282" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.subTitle}>Keep track of your programs!</Text>
            <Text style={styles.subDesc}>
              Follow programs to stay up to date.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

/* ========================= Styles ========================= */
const LIGHT_BG = '#F7F9F2';
const ACCENT   = '#9AA96D';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_BG,
    padding: 20,           
  },

  /* ----- Pet card ----- */
  petCard: {
    height: 300,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
    marginTop: 80
  },
  petImg: { ...StyleSheet.absoluteFillObject },
  petOverlay: { flex: 1, padding: 14, justifyContent: 'space-between' },
  petTitle:   { color: '#fff', fontSize: 20, fontWeight: '600' },
  petSub:     { color: '#fff', fontSize: 12, lineHeight: 18 },
  petLvl:     { color: '#fff', fontSize: 12 },

  /* ----- Buttons / headings ----- */
  enterBtn: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  enterTxt:  { color: '#fff', fontSize: 18, fontWeight: '600' },
  sectionHdr:{ fontSize: 24, fontWeight: '600', fontStyle: 'italic',
               marginBottom: 16, color: '#000' },

  /* ----- Empty state ----- */
  emptyCard: {
    backgroundColor: '#E8E9D8',
    borderColor:     '#D0D4B6',
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical:   32,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  emptyTitle:{ fontSize: 16, color: '#5c5c5c', textAlign: 'center' },
  emptySub:  { fontSize: 12, color: '#7c7c7c', marginTop: 4, textAlign: 'center' },

  /* ----- Carousel card ----- */
  carouselCard: {
    marginLeft: "20"            
  },

  /* ----- Subscriptions ----- */
  subRow: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
  subIconWrap: {
    width: 56, height: 56, borderRadius: 28,
    borderWidth: 1.5, borderColor: ACCENT,
    justifyContent: 'center', alignItems: 'center',
  },
  subTitle:{ fontSize: 14, color: '#444' },
  subDesc: { fontSize: 12, color: '#888' },
});
