import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}>
        <Text style={{ fontWeight: 'bold' }}>Silent</Text> Moon
      </Text>

      {/* Karşılama */}
      <Text style={styles.title}>Good Morning, Baris</Text>
      <Text style={styles.subtitle}>We wish you have a good day</Text>

      {/* Kartlar */}
      <View style={styles.cardRow}>
        <View style={[styles.card, { backgroundColor: '#A5A1F5' }]}>
          <Text style={styles.cardTitle}>Basic</Text>
          <Text style={styles.cardSubtitle}>COURSE</Text>
          <Text style={styles.cardDuration}>3-10 MIN</Text>
          <TouchableOpacity style={styles.cardButton}><Text>START</Text></TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: '#F9D7A5' }]}>
          <Text style={styles.cardTitle}>Relaxation</Text>
          <Text style={styles.cardSubtitle}>MUSIC</Text>
          <Text style={styles.cardDuration}>3-10 MIN</Text>
          <TouchableOpacity style={styles.cardButton}><Text>START</Text></TouchableOpacity>
        </View>
      </View>

      {/* Günün düşüncesi */}
      <View style={styles.dailyCard}>
        <Text style={styles.cardTitle}>Daily Thought</Text>
        <Text style={styles.cardSubtitle}>MEDITATION • 3-10 MIN</Text>
      </View>

      {/* Önerilenler */}
      <Text style={styles.sectionTitle}>Recommended for you</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {["Focus", "Happiness", "Calm"].map((title, idx) => (
          <View key={idx} style={styles.recommendCard}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>MEDITATION • 3-10 MIN</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 24 },
  logo: { fontSize: 20, marginBottom: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#999', marginBottom: 20 },

  cardRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
  },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  cardSubtitle: { fontSize: 12, color: '#555', marginBottom: 8 },
  cardDuration: { fontSize: 10, color: '#666' },
  cardButton: {
    marginTop: 12,
    backgroundColor: '#fff',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },

  dailyCard: {
    backgroundColor: '#333',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },

  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10 },
  horizontalScroll: { flexDirection: 'row' },
  recommendCard: {
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    marginRight: 12,
    width: 140,
  },
});
