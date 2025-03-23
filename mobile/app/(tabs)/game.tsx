import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'all', label: 'All', icon: 'apps' as const },
  { id: 'fav', label: 'Fav', icon: 'heart-outline' as const },
  { id: 'horror', label: 'Horror', icon: 'alert-circle-outline' as const },
  { id: 'runner', label: 'Runner', icon: 'walk-outline' as const },
  { id: 'kids', label: 'Kids', icon: 'happy-outline' as const },
];

const games = [
  { id: 1, name: 'Dream Runner', image: require('../../assets/google.png'), theme: 'runner' },
  { id: 2, name: 'Spooky Sleep', image: require('../../assets/logo.png'), theme: 'horror' },
  { id: 3, name: 'Kiddo Jump', image: require('../../assets/logo.png'), theme: 'kids' },
  { id: 4, name: 'Relax World', image: require('../../assets/logo.png'), theme: 'fav' },
];

export default function GameScreen() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredGames =
    activeCategory === 'all'
      ? games
      : games.filter((game) => game.theme === activeCategory);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Game</Text>
      <Text style={styles.subtext}>discover games from your dreams</Text>

      {/* Category Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryButton,
              activeCategory === item.id && styles.activeCategory,
            ]}
            onPress={() => setActiveCategory(item.id)}
          >
            <Ionicons
              name={item.icon}
              size={18}
              color={activeCategory === item.id ? '#fff' : '#999'}
            />
            <Text style={[styles.categoryLabel, activeCategory === item.id && { color: '#fff' }]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Featured Game */}
      <View style={styles.featuredCard}>
        <Text style={styles.featuredTitle}>Daily Calm</Text>
        <Text style={styles.featuredSub}>APR 30 • Pause Practice</Text>
      </View>

      {/* Game Cards Grid */}
      <View style={styles.grid}>
        {filteredGames.map((game) => (
          <TouchableOpacity key={game.id} style={styles.gameCard}>
            <Image source={game.image} style={styles.gameImage} />
            <Text style={styles.gameName}>{game.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  subtext: { fontSize: 14, color: '#999', marginBottom: 20 },

  categoryRow: { flexDirection: 'row', marginBottom: 16 },
  categoryButton: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  activeCategory: { backgroundColor: '#A5A1F5' },
  categoryLabel: { marginLeft: 6, fontSize: 12, color: '#666' },

  featuredCard: {
    backgroundColor: '#FAD59A',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  featuredTitle: { fontSize: 16, fontWeight: 'bold' },
  featuredSub: { fontSize: 12, color: '#333' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  gameCard: {
    width: '47%',
    borderRadius: 12,
    backgroundColor: '#eee',
    marginBottom: 16,
    padding: 10,
    alignItems: 'center',
  },
  gameImage: { width: '100%', height: 100, borderRadius: 8, marginBottom: 6 },
  gameName: { fontWeight: '600', fontSize: 14 },
});
