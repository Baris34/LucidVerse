import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Platform, StatusBar, Share} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BASE_URL from '../../constants/api';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

interface DreamDetail {
  id: string | number;
  title: string;
  analysis: string;
  theme: string;
  dream_text?: string; 
  created_at?: string;
}

export default function DreamDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [dream, setDream] = useState<DreamDetail | null>(null);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
    if (!id) {
      setLoading(false);
      console.error("Rüya ID'si bulunamadı.");
      return;
    }
    const fetchDreamDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/dream/${id}`);
        if (!res.ok) {
          throw new Error(`API Error: ${res.status}`);
        }
        const data = await res.json();
        setDream(data);
      } catch (err) {
        console.error('Rüya detayı çekilemedi:', err);
        setDream(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDreamDetail();
  }, [id]);

  const onShare = async () => {
    if (!dream) return;
    try {
      const result = await Share.share({
        message: `LucidVerse Rüya Yorumu: "${dream.title}"\n\nTema: ${dream.theme}\n\n${dream.analysis.substring(0, 150)}...\n\nDaha fazlası LucidVerse'de!`,
        title: `Rüya Yorumu: ${dream.title}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Şununla paylaşıldı:', result.activityType);
        } else {
          console.log('Paylaşıldı');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Paylaşım iptal edildi');
      }
    } catch (error: any) {
      alert(error.message);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return new Date(dateString).toLocaleDateString('tr-TR', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };
  if (loading) {
    return (
      <SafeAreaView>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#6A5ACD" />
          <Text style={styles.loadingText}>Rüya yükleniyor...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!dream) {
    return (
      <SafeAreaView>
        <View style={styles.center}>
          <Ionicons name="sad-outline" size={48} color="#B0BEC5" />
          <Text style={styles.errorText}>Rüya detayı bulunamadı.</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.tryAgainButton}>
            <Text style={styles.tryAgainText}>Geri Dön</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

    return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" /> {/* Üst barın rengiyle uyumlu */}
      
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.topBarButton} onPress={() => router.canGoBack() ? router.back() : router.push('/(tabs)/dream')}>
          <Ionicons name="arrow-back-outline" size={26} color="#34495E" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1} ellipsizeMode="tail">
          {dream.title || "Rüya Detayı"}
        </Text>
        <TouchableOpacity style={styles.topBarButton} onPress={onShare}>
          <Ionicons name="share-social-outline" size={24} color="#34495E" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* ... (kart ve içerik aynı kalabilir) ... */}
         <View style={styles.card}>
            {dream.created_at && <Text style={styles.dateText}>Görülme Tarihi: {formatDate(dream.created_at)}</Text>}
            <View style={styles.separator} />
            <Text style={styles.sectionHeader}>Rüya Yorumu</Text>
            <Text style={styles.analysisText}>{dream.analysis}</Text>
            {dream.dream_text && (
              <>
                <View style={styles.separator} />
                <Text style={styles.sectionHeader}>Senin Rüyan</Text>
                <Text style={styles.dreamContentText}>{dream.dream_text}</Text>
              </>
            )}
            <View style={styles.separator} />
            <View style={styles.themeBox}>
              <Ionicons name="pricetag-outline" size={20} color="#5D3FD3" style={styles.themeIcon} />
              <View>
                <Text style={styles.themeLabel}>Ana Tema:</Text>
                <Text style={styles.themeValue}>{dream.theme || "Belirlenmemiş"}</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
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
  analysisText: {
    fontSize: 15.5,
    color: "#333333",
    lineHeight: 25,
    marginBottom: 10,
  },
  dreamContentText: {
    fontSize: 15,
    color: "#4F4F4F",
    lineHeight: 23,
    fontStyle: 'italic',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E8E8E8'
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