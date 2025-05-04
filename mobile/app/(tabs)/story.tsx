import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import BASE_URL from '../../constants/api';

export default function StoryScreen() {
  const [input, setInput] = useState('');
  const [stories, setStories] = useState<any[]>([]);
  const [currentStory, setCurrentStory] = useState<{ story: string; theme: string } | null>(null);

  useFocusEffect(
    useCallback(() => {
      const fetchStories = async () => {
        try {
          const res = await fetch(`${BASE_URL}/stories`);
          const data = await res.json();
          setStories(data.slice(0, 5));
        } catch (err) {
          console.error("Hikaye çekme hatası:", err);
        }
      };

      fetchStories();
      setCurrentStory(null);
    }, [])
  );

  const handleGenerate = async () => {
    if (!input.trim()) return;

    try {
      const response = await fetch(`${BASE_URL}/generate-story`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      setCurrentStory({ story: data.story, theme: data.theme });

      const newStory = {
        id: Date.now().toString(),
        title: data.title,
        theme: data.theme,
      };
      

      setStories((prev) => [newStory, ...prev]);
      setInput("");
    } catch (error) {
      console.error("Hikaye üretim hatası:", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.storyBox}
            onPress={() => router.push(`../story/${item.id}`)}
          >
            <Text numberOfLines={1} style={styles.storyTitle}>
            {item.title}
            </Text>
            <Text style={styles.themeText}>Ana Tema: {item.theme}</Text>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <View>
            <Text style={styles.header}>Story</Text>
            <Text style={styles.desc}>describe</Text>

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

            {currentStory && (
              <View style={styles.storyOutputBox}>
                <Text style={styles.storyText}>{currentStory.story}</Text>
                <Text style={styles.themeText}>Ana Tema: {currentStory.theme}</Text>
              </View>
            )}

            <Text style={styles.oldHeader}>Eski Hikayeler</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: { fontSize: 24, fontWeight: 'bold' },
  desc: { color: '#999', marginBottom: 20 },
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
    width: '100%',
    alignSelf: 'center',
  },
  themeText: { marginTop: 4, color: '#666', fontSize: 12 },
  storyOutputBox: {
    backgroundColor: '#e8e8ff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
  },
  storyText: { fontSize: 14, color: '#333', marginBottom: 6 },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
