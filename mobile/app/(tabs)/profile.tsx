import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

export default function ProfileScreen() {
  const router = useRouter();

  const username = "Barış";
  const email = "baris@example.com";
  const dreamCount = 12;
  const storyCount = 8;
  const gamesPlayed = 5;
  const highestScore = 1200;

  return (
    <LinearGradient colors={['#E8EAF6', '#F3E5F5']} style={styles.container}>
      {/* Profil Bilgisi */}
      <View style={styles.profileBox}>
        <Image source={require('../../assets/avatar.png')} style={styles.avatar} />
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* İstatistik Kartları */}
      <View style={styles.statsContainer}>
        <StatCard label="Rüya" value={dreamCount} color="#A5A1F5" />
        <StatCard label="Hikaye" value={storyCount} color="#CE93D8" />
        <StatCard label="Oyun" value={gamesPlayed} color="#81D4FA" />
        <StatCard label="En Skor" value={highestScore} color="#FFAB91" />
      </View>

      {/* Ayarlar Kartı */}
      <View style={styles.settingsCard}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔐 Şifreyi Değiştir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/profile/settings')}>
          <Text style={styles.settingText}>⚙️  Hesap Ayarları</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>❓ Destek / Yardım</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>📄 Uygulama Hakkında</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>🚪 Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const StatCard = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <View style={[styles.statCard, { backgroundColor: color }]}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  profileBox: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 13,
    color: '#777',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '47%',
    height: 80,
    borderRadius: 16,
    padding: 10,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 13,
    color: '#fff',
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingText: {
    fontSize: 15,
    color: '#555',
  },
  logoutButton: {
    backgroundColor: '#FFE4E1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: 'bold',
  },
});
