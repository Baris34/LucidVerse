import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useState } from 'react';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';

export default function DreamScreen() {
  const { width } = useWindowDimensions();
  const [dreamText, setDreamText] = useState('');
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [recommendedGame, setRecommendedGame] = useState<string | null>(null);

  
  const htmlStyles = StyleSheet.create({
    p: {
      marginBottom: 10,
      fontSize: 14,
      color: '#333',
    },
    strong: {
      fontWeight: '700', // string değil, literal olarak "700"
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
      const response = await fetch('http://10.0.2.2:5000/analyze', {
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
    <ScrollView contentContainerStyle={styles.container}>
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
      {analysis !== '' && (
  <>
    <Text style={styles.sectionTitle}>🔍 Analiz Sonucu</Text>
    <View style={styles.analysisContainer}>
    <RenderHtml
      contentWidth={width}
      source={{ html: analysis ?? '' }}
      tagsStyles={htmlStyles}
    />
    </View>
  </>
)}

      {/* Önerilen Oyun */}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
  }
});
