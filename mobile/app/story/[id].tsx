import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const dummyStories: Record<string, { content: string; theme: string }> = {
    '1': { content: 'Birinci hikaye', theme: 'Korku' },
    '2': { content: 'İkinci hikaye', theme: 'Fantastik' },
  };
  

export default function StoryDetailScreen() {
  const { id } = useLocalSearchParams();
  const story = dummyStories[id as string];

  if (!story) return <Text>Hikaye bulunamadı.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Story</Text>
      <Text style={styles.desc}>describe</Text>

      <View style={styles.storyBox}>
        <Text>{story.content}</Text>
        <Text style={styles.themeText}>Ana Tema : {story.theme}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold' },
  desc: { color: '#888', marginBottom: 16 },
  storyBox: {
    backgroundColor: '#f3f3f8',
    padding: 16,
    borderRadius: 12,
    minHeight: 200,
    justifyContent: 'space-between',
  },
  themeText: { marginTop: 12, color: '#444', fontWeight: '500' },
});
