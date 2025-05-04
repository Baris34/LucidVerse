import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert,FlatList } from 'react-native';
import { useState,useCallback } from 'react';
import { useWindowDimensions } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { router } from 'expo-router';
import BASE_URL from '../../constants/api';
export default function DreamScreen() {
  const { width } = useWindowDimensions();
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [recommendedGame, setRecommendedGame] = useState<string | null>(null);
  const [dreams, setDreams] = useState<any[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const fetchDreams = async () => {
        try {
          const res = await fetch(`${BASE_URL}/dreams`);
          const data = await res.json();
          setDreams(data.slice(0, 5));
        } catch (err) {
          console.error('Rüya analizleri çekilemedi:', err);
        }
      };
      fetchDreams();
    }, [])
  );
  
  const htmlStyles = StyleSheet.create({
    
    p: {
      marginBottom: 10,
      fontSize: 14,
      color: '#333',
    },
    strong: {
      fontWeight: '700',
      color: '#222',
    },
    ul: {
      paddingLeft: 16,
      marginBottom: 10,
    },
    li: {
      marginBottom: 6,
    },
  });
  
  const handleAnalyzeDream = async () => {
    if (!dreamText.trim()) {
      Alert.alert("Uyarı", "Lütfen bir rüya metni giriniz.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: dreamText }),
      });

      const data = await response.json();
      setAnalysis(data.analysis || 'Analiz sonucu alınamadı.');
      setRecommendedGame('Dream Runner');
    } catch (error) {
      console.error("Hata oluştu:", error);
      Alert.alert("Hata", "Analiz sırasında bir sorun oluştu.");
    }
  };

  return (
    <FlatList
      data={dreams}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.dreamBox}
      onPress={() => router.push(`../dream/${item.id}`)}
    >
      <Text style={styles.dreamTitle}>{item.title}</Text>
      <Text style={styles.themeText}>Tema: {item.theme}</Text>
    </TouchableOpacity>
  )}
  ListHeaderComponent={
    <View>
      <Text style={styles.header}>🌙 Rüya Analizi</Text>
      <Text style={styles.desc}>Rüyanı yaz, analiz edelim ve sana özel bir oyun önerelim!</Text>

      {/* Rüya Metin Girişi */}
      <TextInput
        style={styles.textArea}
        placeholder="Rüyanızı buraya yazın..."
        multiline
        value={dreamText}
        onChangeText={setDreamText}
      />

      {/* Analiz Butonu */}
      <TouchableOpacity style={styles.button} onPress={handleAnalyzeDream}>
        <Text style={styles.buttonText}>Rüyayı Analiz Et</Text>
      </TouchableOpacity>

      {/* Analiz Sonucu */}
      {analysis && (
        <>
          <Text style={styles.sectionTitle}>🔍 Analiz Sonucu</Text>
          <View style={styles.analysisContainer}>
          <Text style={styles.analysisText}>{analysis}</Text>

          </View>
        </>
      )}

      {/* Oyun Önerisi */}
      {recommendedGame && (
        <>
          <Text style={styles.sectionTitle}>🎮 Oyun Önerisi</Text>
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={require('../../assets/google.png')}
              style={styles.gameImage}
              resizeMode="cover"
            />
            <Text style={styles.gameName}>{recommendedGame}</Text>
          </TouchableOpacity>
        </>
      )}

      <Text style={styles.oldHeader}>🕓 Eski Rüya Analizleri</Text>
    </View>
  }
/>
  )
}

const styles = StyleSheet.create({
  dreamBox: {
    backgroundColor: '#e8e8ff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container: { padding: 20, backgroundColor: '#fff', flexGrow: 1 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  desc: { fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 20 },
  textArea: {
    height: 140,
    backgroundColor: '#f2f2f7',
    borderRadius: 16,
    padding: 12,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#A5A1F5',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  analysis: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#f8f8ff',
    padding: 10,
    borderRadius: 12,
    marginBottom: 24,
  },
  gameCard: {
    backgroundColor: '#e4e4f5',
    borderRadius: 12,
    alignItems: 'center',
    padding: 12,
    width: 140,
    alignSelf: 'center',
  },
  gameImage: { width: 100, height: 100, borderRadius: 12, marginBottom: 8 },
  gameName: { fontWeight: '600' },
  analysisContainer: {
    backgroundColor: '#f9f9ff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  oldHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dreamTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 4 
  },
  
  themeText: {
    fontSize: 12,    
    color: '#666',
    marginTop: 4,
  },
  analysisText: { fontSize: 14, color: '#333', marginBottom: 6 },
});
