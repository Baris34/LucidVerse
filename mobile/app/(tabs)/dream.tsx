import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';

export default function DreamScreen() {
  const [dreamText, setDreamText] = useState('');
  const [recommendedGame, setRecommendedGame] = useState<string | null>(null);

  const handleAnalyzeDream = () => {
    // Buraya Gemini + NLP entegre edilecek
    console.log('Analyzing dream:', dreamText);

    // Şimdilik dummy öneri:
    setRecommendedGame('GameName');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dream</Text>
      <Text style={styles.desc}>describe</Text>

      {/* Rüya Metin Girişi */}
      <TextInput
        style={styles.textArea}
        placeholder="Bir metin girin"
        multiline
        value={dreamText}
        onChangeText={setDreamText}
      />

      {/* Analiz Butonu */}
      <TouchableOpacity style={styles.button} onPress={handleAnalyzeDream}>
        <Text style={styles.buttonText}>Rüya analiz et</Text>
      </TouchableOpacity>

      {/* Önerilen Oyun */}
      {recommendedGame && (
        <>
          <Text style={styles.sectionTitle}>Önerilen Oyun</Text>
          <TouchableOpacity style={styles.gameCard}>
            <Image
              source={require('../../assets/google.png')} // oyun görseli
              style={styles.gameImage}
              resizeMode="cover"
            />
            <Text style={styles.gameName}>{recommendedGame}</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
  desc: { fontSize: 14, color: '#999', textAlign: 'center', marginBottom: 20 },

  textArea: {
    height: 120,
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
});
