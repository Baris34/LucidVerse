import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:5000/story/${id}`);
        const data = await response.json();
        setStory(data);
      } catch (err) {
        console.error("Hikaye çekilemedi", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }

  if (!story) {
    return (
      <View style={styles.center}>
        <Text>Hikaye bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* 🔙 Geri Dön Butonu */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("../(tabs)/story")}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Geri</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>
          {story.title}
        </Text>

        <Text style={styles.storyText}>{story.story}</Text>

        <View style={styles.themeBox}>
          <Text style={styles.themeText}>🎯 Ana Tema:</Text>
          <Text style={styles.themeDesc}>{story.theme}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F8F8FC",
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 6,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c2c2e",
  },
  storyText: {
    fontSize: 16,
    color: "#3a3a3c",
    lineHeight: 24,
    marginBottom: 24,
  },
  themeBox: {
    backgroundColor: "#EAE9FF",
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
  },
  themeText: {
    fontWeight: "600",
    color: "#4B4B6B",
    marginBottom: 4,
  },
  themeDesc: {
    fontStyle: "italic",
    color: "#444",
  },
});
