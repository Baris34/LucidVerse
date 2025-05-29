import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator, Platform, StatusBar, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import BASE_URL from '../../constants/api';
import { Ionicons } from '@expo/vector-icons'; 

interface StoryItem {
  id: string;
  title: string;
  theme: string;
}

interface CurrentStory {
  story: string;
  theme: string;
  title?: string; 
}

export default function StoryScreen() {
  const [input, setInput] = useState('');
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [currentStory, setCurrentStory] = useState<CurrentStory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingStories, setIsFetchingStories] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchStories = async () => {
        setIsFetchingStories(true);
        try {
          const res = await fetch(`${BASE_URL}/stories`);
          const data = await res.json();
          setStories(Array.isArray(data) ? data.slice(0, 5) : []);
        } catch (err) {
          console.error("Hikaye çekme hatası:", err);
          setStories([]);
        } finally {
          setIsFetchingStories(false);
        }
      };

      fetchStories();
      setCurrentStory(null);
    }, [])
  );

  const handleGenerate = async () => {
    if (!input.trim()) {
      alert("Lütfen hikaye üretmek için bir metin veya anahtar kelimeler girin.");
      return;
    }
    setIsLoading(true);
    setCurrentStory(null);

    try {
      const response = await fetch(`${BASE_URL}/generate-story`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      const data = await response.json();
      if (data.story && data.theme) {
        setCurrentStory({ story: data.story, theme: data.theme, title: data.title || "Yeni Hikayen" });
      } else {
        alert("Hikaye üretilemedi. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Hikaye üretim hatası:", error);
      alert("Hikaye üretilirken bir sorun oluştu.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderStoryItem = ({ item }: { item: StoryItem }) => (
    <TouchableOpacity
      style={styles.storyBox}
      onPress={() => router.push({ pathname: "/story/[id]", params: { id: item.id.toString() }})} 
    >
      <View style={styles.storyBoxIconContainer}>
        <Ionicons name="book-outline" size={24} color={styles.storyTitle.color} />
      </View>
      <View style={styles.storyBoxTextContainer}>
        <Text numberOfLines={1} style={styles.storyTitle}>
          {item.title || "Başlıksız Hikaye"}
        </Text>
        <Text style={styles.themeText}>Ana Tema: {item.theme || "Belirsiz"}</Text>
      </View>
      <Ionicons name="chevron-forward-outline" size={22} color="#B0BEC5" />
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: styles.listContainer.backgroundColor }}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.listContainer.backgroundColor as string} />
      <FlatList
        data={stories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={renderStoryItem}
        ListHeaderComponent={
          <View style={styles.headerContentContainer}>
            <View style={styles.titleContainer}>
              <Ionicons name="leaf-outline" size={32} color="#5D3FD3" />
              <Text style={styles.header}>Hikaye Atölyesi</Text>
            </View>
            <Text style={styles.desc}>Kelimelerden rüyalarına, rüyalarından hikayelere bir yolculuk...</Text>

            <TextInput
              style={styles.textarea}
              multiline
              placeholder="Birkaç kelime, bir cümle veya bir rüya özeti yazın..."
              placeholderTextColor="#A0A0A0"
              value={input}
              onChangeText={setInput}
            />

            <TouchableOpacity style={styles.button} onPress={handleGenerate} disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Hikayemi Oluştur</Text>
              )}
            </TouchableOpacity>

            {currentStory && !isLoading && (
              <View style={styles.storyOutputCard}>
                <View style={styles.storyOutputHeader}>
                  <Ionicons name="sparkles-outline" size={24} color="#6A0DAD" />
                  <Text style={styles.storyOutputTitle}>{currentStory.title || "İşte Hikayen!"}</Text>
                </View>
                <ScrollView style={styles.storyOutputScrollView} nestedScrollEnabled={true}>
                  <Text style={styles.storyText}>{currentStory.story}</Text>
                </ScrollView>
                <Text style={styles.storyOutputThemeText}>Tema: {currentStory.theme}</Text>
              </View>
            )}

            {stories.length > 0 && <Text style={styles.oldHeader}>Önceki Hikayelerin</Text>}
          </View>
        }
        ListFooterComponent={isFetchingStories ? <ActivityIndicator size="large" color="#5D3FD3" style={{ marginVertical: 20 }}/> : null}
        ListEmptyComponent={!isFetchingStories && stories.length === 0 ? (
          <View style={styles.emptyListComponent}>
            <Ionicons name="cloud-offline-outline" size={48} color="#B0BEC5" />
            <Text style={styles.emptyListText}>Henüz oluşturulmuş bir hikayen yok.</Text>
            <Text style={styles.emptyListSubText}>Yukarıdaki alana bir şeyler yazarak ilk hikayeni yarat!</Text>
          </View>
        ) : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 + 10 : 40,
    paddingBottom: 40,
    backgroundColor: '#F4F6F8',
  },
  headerContentContainer: {
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
    color: '#34495E',
    marginLeft: 10,
  },
  desc: {
    fontSize: 15,
    color: '#7F8C8D',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  textarea: {
    minHeight: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: '#5D3FD3',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#5D3FD3',
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
  storyOutputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    maxHeight: 300,
  },
  storyOutputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 10,
  },
  storyOutputTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginLeft: 8,
  },
  storyOutputScrollView: {
    maxHeight: 200,
    marginBottom: 10,
  },
  storyText: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 23,
  },
  storyOutputThemeText: {
    fontSize: 13,
    color: '#7F8C8D',
    fontStyle: 'italic',
    textAlign: 'right',
    marginTop: 8,
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
  storyBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  storyBoxIconContainer: {
    backgroundColor: '#E8EAF6',
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  storyBoxTextContainer: {
    flex: 1,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 3,
  },
  themeText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  emptyListComponent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyListText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginTop: 10,
    marginBottom: 5,
  },
  emptyListSubText: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});