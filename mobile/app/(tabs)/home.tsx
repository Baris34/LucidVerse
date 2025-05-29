import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Platform, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect,useLocalSearchParams } from 'expo-router';
import BASE_URL from '../../constants/api';

const userAvatar = require('../../assets/logo.png'); 
const dreamCloudIcon = require('../../assets/logo.png');

interface Dream {
  id: string | number;
  title: string;
  dream_text: string;
  theme: string;
  created_at: string;
}

const quickAccessItems = [
  { title: 'Rüya Günlüğüm', onPress: () => router.push('/dream'), iconName: 'journal-outline' as const, iconColor: '#5DADE2', bgColor: '#EBF5FB' },
  { title: 'Rüya Oyunları', onPress: () => router.push('/game'), iconName: 'game-controller-outline' as const, iconColor: '#F5B041', bgColor: '#FEF9E7' },
  { title: 'Rüya Hikayeleri', onPress: () => router.push('/story'), iconName: 'book-outline' as const, iconColor: '#58D68D', bgColor: '#E8F8F5' },
  { title: 'Profilim', onPress: () => router.push('/profile'), iconName: 'person-outline' as const, iconColor: '#AF7AC5', bgColor: '#F4ECF7' },
];


export default function HomeScreen() {
  const userName = 'Baris';
  const [lastDream, setLastDream] = useState<Dream | null>(null);
  const [isLoadingLastDream, setIsLoadingLastDream] = useState(true);

  const navigateToDreamEntry = () => router.push('/dream'); 

  useFocusEffect(
    useCallback(() => {
      const fetchLastDream = async () => {
        setIsLoadingLastDream(true);
        try {
          const res = await fetch(`${BASE_URL}/dreams?limit=1&order=desc`);
          const data = await res.json();
          setLastDream(data && data.length > 0 ? data[0] : null);
        } catch (err) {
          console.error('Son rüya çekilemedi:', err);
          setLastDream(null);
        } finally {
          setIsLoadingLastDream(false);
        }
      };
      fetchLastDream();
    }, [])
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return `Günaydın, ${userName}!`;
    if (hour < 18) return `Tünaydın, ${userName}!`;
    return `İyi akşamlar, ${userName}!`;
  };

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="dark-content" backgroundColor="#F4F6F8" />
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#E6E9F0', '#F4F6F8']}
          style={styles.headerGradient}
        />

        <View style={styles.content}>
          <View style={styles.profileHeader}>
            <Image source={userAvatar} style={styles.avatar} />
            <View>
              <Text style={styles.greetingTitle}>{getGreeting()}</Text>
              <Text style={styles.greetingSubtitle}>Bugün harika rüyalar seni bekliyor.</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.mainActionCard} onPress={navigateToDreamEntry}>
            <View style={styles.mainActionTextContainer}>
              <Text style={styles.mainActionTitle}>Rüyanı Kaydet</Text>
              <Text style={styles.mainActionSubtitle}>Gördüklerini bizimle paylaş, sırlarını çözelim!</Text>
            </View>
            <Ionicons name="chevron-forward" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          {isLoadingLastDream ? (
            <ActivityIndicator color="#6A5ACD" style={{ marginVertical: 20, height: 70 }}/>
          ) : lastDream ? (
            <TouchableOpacity
              style={styles.lastDreamCard}
              onPress={() => router.push({ pathname: "/dream/[id]", params: { id: lastDream.id }})}
            >
              <Ionicons name="moon-outline" size={24} color="#8E7CC3" style={styles.lastDreamIcon} />
              <View style={styles.lastDreamTextContainer}>
                <Text style={styles.lastDreamLabel}>Son Rüyan:</Text>
                <Text style={styles.lastDreamTitle} numberOfLines={1}>{lastDream.title || "Başlıksız Rüya"}</Text>
              </View>
              <Ionicons name="arrow-forward" size={22} color="#8E7CC3" />
            </TouchableOpacity>
          ) : (
             <View style={styles.lastDreamCardPlaceholder}>
              <Ionicons name="cloud-offline-outline" size={24} color="#A0A0A0" style={styles.lastDreamIcon} />
              <Text style={styles.lastDreamPlaceholderText}>Henüz bir rüya kaydetmemişsin.</Text>
            </View>
          )}

          <Text style={styles.sectionTitle}>LucidVerse'de Neler Var?</Text>
          <View style={styles.quickActionsGrid}>
            {quickAccessItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.actionButton, { backgroundColor: item.bgColor }]}
                onPress={item.onPress}
              >
                <Ionicons name={item.iconName} size={36} color={item.iconColor} style={styles.actionIconStyle} />
                <Text style={[styles.actionButtonText, { color: item.iconColor }]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scrollViewStyle: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  headerGradient: {
    height: 200,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 + 20 : 60,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#BCA0DC',
  },
  greetingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495E',
  },
  greetingSubtitle: {
    fontSize: 15,
    color: '#7F8C8D',
  },
  mainActionCard: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 7,
  },
  mainActionIcon: {
    width: 36,
    height: 36,
    marginRight: 15,
    tintColor: '#FFFFFF', 
  },
  mainActionTextContainer: {
    flex: 1,
  },
  mainActionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  mainActionSubtitle: {
    fontSize: 13,
    color: '#E0E0E0',
  },
  lastDreamCard: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E7FF',
    shadowColor: '#B0C4DE',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  lastDreamCardPlaceholder: {
    backgroundColor: '#F9F9F9',
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  lastDreamPlaceholderText: {
    color: '#A0A0A0',
    fontStyle: 'italic',
    fontSize: 15,
    marginLeft: 10,
  },
  lastDreamIcon: {
    marginRight: 15,
  },
  lastDreamTextContainer: {
    flex: 1,
  },
  lastDreamLabel: {
    fontSize: 12,
    color: '#7F8C8D',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  lastDreamTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 18,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    minHeight: 140,
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  actionIconStyle: { 
    marginBottom: 12,
  },
  actionButtonText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});