import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function WelcomeAfterLogin() {
  const router = useRouter();
  const { username } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Text style={styles.logo}><Text style={{ fontWeight: 'bold' }}>Lucid</Text> Verse</Text>

      {/* Merhaba mesajı */}
      <Text style={styles.title}>Hi {username || 'Dreamer'}, Welcome</Text>
      <Text style={styles.subtitle}>to Silent Moon</Text>
      <Text style={styles.description}>Your journey to dream-powered creativity starts here.</Text>

      {/* Görsel */}
      <Image
        source={require('../../assets/meditation.png')} // assets içine meditasyon görseli ekle!
        style={styles.image}
        resizeMode="contain"
      />

      {/* Get Started */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.buttonText}>GET STARTED</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    backgroundColor: '#A5A1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    color: '#eee',
    fontSize: 14,
    marginBottom: 24,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
  },
  buttonText: {
    color: '#A5A1F5',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
