import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';

const dummyStories = [
  { id: '1', content: 'Karanlıkta yürürken...', theme: 'Korku' },
  { id: '2', content: 'Bir ejderha ile savaştım...', theme: 'Fantastik' },
];

export default function StoryScreen() {
  const [input, setInput] = useState('');

  const handleGenerate = () => {
    // Burada Gemini API çağrısı yapılacak
    console.log('Generate Story:', input);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Story</Text>
      <Text style={styles.desc}>describe</Text>

      {/* Metin Girişi */}
      <TextInput
        style={styles.textarea}
        multiline
        placeholder="Bir metin girin"
        value={input}
        onChangeText={setInput}
      />

      <TouchableOpacity style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Hikaye Üret</Text>
      </TouchableOpacity>

      {/* Hikaye Listesi */}
      <Text style={styles.oldHeader}>Eski Hikayeler</Text>

      <FlatList
        data={dummyStories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storyBox}
            onPress={() => router.push(`../story/${item.id}`)}
          >
            <Text numberOfLines={1}>{item.content}</Text>
            <Text style={styles.themeText}>Ana Tema: {item.theme}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 24, fontWeight: 'bold' },
  desc: { color: '#fff', marginBottom: 20 },
  textarea: {
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#A5A1F5',
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  oldHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  storyBox: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },
  themeText: { marginTop: 4, color: '#666', fontSize: 12 },
});
