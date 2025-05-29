import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, FlatList, ActivityIndicator } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import BASE_URL from '../../constants/api';
import { Ionicons } from '@expo/vector-icons'; 

export default function DreamScreen() {
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [recommendedGame, setRecommendedGame] = useState<string | null>(null);
  const [dreams, setDreams] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingDreams, setIsFetchingDreams] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchDreams = async () => {
        setIsFetchingDreams(true);
        try {
          const res = await fetch(`${BASE_URL}/dreams`);
          const data = await res.json();
          setDreams(data.slice(0, 5));
        } catch (err) {
          console.error('Rüya analizleri çekilemedi:', err);
          Alert.alert("Hata", "Geçmiş rüyalar yüklenirken bir sorun oluştu.");
        } finally {
          setIsFetchingDreams(false);
        }
      };
      fetchDreams();
    }, [])
  );

  const handleAnalyzeDream = async () => {
    if (!dreamText.trim()) {
      Alert.alert("Uyarı", "Lütfen bir rüya metni giriniz.");
      return;
    }
    setIsLoading(true);
    setAnalysis(null); 
    setRecommendedGame(null); 

    try {
      const response = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: dreamText }),
      });
      const data = await response.json();
      setAnalysis(data.analysis || 'Analiz sonucu alınamadı.');
      setRecommendedGame('Dream Runner');
    } catch (error) {
      console.error("Hata oluştu:", error);
      Alert.alert("Hata", "Analiz sırasında bir sorun oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderDreamItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.dreamBox}
      onPress={() => router.push({ pathname: "/dream/[id]", params: { id: item.id } })}
    >
      <View style={styles.dreamBoxHeader}>
        <Ionicons name="moon-outline" size={20} color="#6A5ACD" style={styles.dreamIcon} />
        <Text style={styles.dreamTitle}>{item.title || "Başlıksız Rüya"}</Text>
      </View>
      <Text style={styles.dreamPreview} numberOfLines={2}>
        {item.dream_text ? (item.dream_text.length > 100 ? item.dream_text.substring(0, 100) + "..." : item.dream_text) : "İçerik yok"}
      </Text>
      <Text style={styles.themeText}>Tema: {item.theme || "Belirsiz"}</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={dreams}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      renderItem={renderDreamItem}
      ListHeaderComponent={
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Ionicons name="cloudy-night-outline" size={32} color="#6A5ACD" />
            <Text style={styles.header}>Rüya Analizi</Text>
          </View>
          <Text style={styles.desc}>Rüyanı yaz, anlamını keşfet ve sana özel bir oyunla maceraya atıl!</Text>

          <TextInput
            style={styles.textArea}
            placeholder="Dün gece ne gördün? Anlat bakalım..."
            placeholderTextColor="#999"
            multiline
            value={dreamText}
            onChangeText={setDreamText}
          />

          <TouchableOpacity style={styles.button} onPress={handleAnalyzeDream} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Rüyamı Yorumla</Text>
            )}
          </TouchableOpacity>

          {analysis && !isLoading && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="search-circle-outline" size={24} color="#6A5ACD" />
                <Text style={styles.sectionTitle}>Analiz Sonucu</Text>
              </View>
              <Text style={styles.analysisText}>{analysis}</Text>
            </View>
          )}

          {recommendedGame && !isLoading && (
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="game-controller-outline" size={24} color="#FFB900" />
                <Text style={styles.sectionTitle}>Sana Özel Oyun</Text>
              </View>
              <TouchableOpacity style={styles.gameCard} onPress={() => router.push('/game')}>
                <Image
                  source={require('../../assets/gamelogo.png')}
                  style={styles.gameImage}
                  resizeMode="cover"
                />
                <Text style={styles.gameName}>{recommendedGame}</Text>
                <Text style={styles.gameDesc}>Maceraya hazır mısın?</Text>
              </TouchableOpacity>
            </View>
          )}
          {dreams.length > 0 && <Text style={styles.oldHeader}>Son Rüyaların</Text>}
        </View>
      }
      ListFooterComponent={isFetchingDreams ? <ActivityIndicator size="large" color="#6A5ACD" style={{ marginVertical: 20 }}/> : null}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20, 
    paddingBottom: 40, 
    backgroundColor: '#F0F4F8',
  },
  headerContainer: {
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10, 
  },
  desc: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22, 
  },
  textArea: {
    minHeight: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
  },
  button: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 15,
    borderRadius: 30, 
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20, 
    fontWeight: '700',
    color: '#333333',
    marginLeft: 8,
  },
  analysisText: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 22,
  },
  gameCard: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  gameImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  gameName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333333',
    marginBottom: 4,
  },
  gameDesc: {
    fontSize: 13,
    color: '#666666',
  },
  oldHeader: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 16,
    marginTop: 10, 
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 20,
  },
  dreamBox: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  dreamBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  dreamIcon: {
    marginRight: 8,
  },
  dreamTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333333',
  },
  dreamPreview: {
    fontSize: 14,
    color: '#555555',
    lineHeight: 20,
    marginBottom: 6,
  },
  themeText: {
    fontSize: 13,
    color: '#777777',
    fontStyle: 'italic',
  },
});