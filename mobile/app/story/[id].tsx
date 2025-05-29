import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Platform, StatusBar, Share } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../../constants/api';
import { SafeAreaView } from 'react-native-safe-area-context';

interface StoryDetail {
  id: string | number;
  title: string;
  story: string;
  theme: string;
  created_at?: string;
}

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [story, setStory] = useState<StoryDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      console.error("Hikaye ID'si bulunamadı.");
      return;
    }
    const fetchStoryDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/story/${id}`);
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error('Hikaye detayı çekilemedi:', err);
        setStory(null);
      } finally {
        setLoading(false);
      }
    };

    fetchStoryDetail();
  }, [id]);

  const onShareStory = async () => {
    if (!story) return;
    try {
      await Share.share({
        message: `LucidVerse'den Bir Hikaye: "${story.title}"\n\n${story.story.substring(0, 200)}...\n\nDevamını LucidVerse'de oku!`,
        title: `Hikaye: ${story.title}`
      });
    } catch (error: any) {
      alert(error.message);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    } catch (e) { return dateString; }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centerWrapper}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6A5ACD" />
          <Text style={styles.loadingText}>Hikaye yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!story) {
    return (
      <SafeAreaView style={styles.centerWrapper}>
        <View style={styles.center}>
          <Ionicons name="sad-outline" size={48} color="#B0BEC5" />
          <Text style={styles.errorText}>Hikaye detayı bulunamadı.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.topBar.backgroundColor as string} />
      
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarButton} onPress={() => router.canGoBack() ? router.back() : router.push('/(tabs)/story')}>
          <Ionicons name="arrow-back-outline" size={28} color="#34495E" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1} ellipsizeMode="tail">
          {story.title || "Hikaye Detayı"}
        </Text>
        <TouchableOpacity style={styles.topBarButton} onPress={onShareStory}>
          <Ionicons name="share-social-outline" size={26} color="#34495E" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.card}>
          {story.created_at && <Text style={styles.dateText}>Oluşturulma Tarihi: {formatDate(story.created_at)}</Text>}
          
          <View style={styles.separator} />

          {/* Hikaye İçeriği */}
          <Text style={styles.sectionHeader}>Hikayen</Text>
          <Text style={styles.storyContentText}>{story.story}</Text>
          
          <View style={styles.separator} />

          {/* Ana Tema */}
          <View style={styles.themeBox}>
            <Ionicons name="bulb-outline" size={20} color="#8E7CC3" style={styles.themeIcon} />
            <View>
              <Text style={styles.themeLabel}>Ana Tema:</Text>
              <Text style={styles.themeValue}>{story.theme || "Belirlenmemiş"}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  centerWrapper: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 56 : 50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  topBarButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  topBarTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '600',
    color: '#2C3E50',
    marginHorizontal: 5,
  },
  scrollContentContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#F4F6F8" },
  loadingText: { marginTop: 10, fontSize: 16, color: '#6A5ACD' },
  errorText: { marginTop: 10, fontSize: 16, color: '#7F8C8D', textAlign: 'center' },
  tryAgainButton: { marginTop: 20, backgroundColor: '#6A5ACD', paddingVertical: 10, paddingHorizontal: 25, borderRadius: 20 },
  tryAgainText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 20,
    shadowColor: "#9E9E9E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  dateText: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 18,
  },
  sectionHeader: {
    fontSize: 13, 
    fontWeight: 'bold',
    color: '#6A5ACD',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  storyContentText: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 26,
    marginBottom: 10,
    textAlign: Platform.OS === 'ios' ? 'justify' : 'left',
  },
  themeBox: { 
    backgroundColor: "#EDE7F6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeIcon: { 
    marginRight: 10,
  },
  themeLabel: { 
    fontWeight: "bold",
    color: "#5E35B1",
    fontSize: 15,
    marginBottom: 2,
  },
  themeValue: { 
    color: "#4527A0",
    fontSize: 16,
    fontWeight: '500',
  },
});