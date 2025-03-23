import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.brandName}>
          <Text style={{ fontWeight: 'bold' }}>Lucid</Text> <Text>Verse</Text>
        </Text>
      </View>

      <Image
        source={require('../assets/Group.png')}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.textContainer}>
        <Text style={styles.title}>We are what we do</Text>
        <Text style={styles.subtitle}>
          Thousand of people are using silent moon for smalls meditation
        </Text>
      </View>
      <Link href="/Signup/page" asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>
      </Link>
      <Text style={styles.footerText}>
        ALREADY HAVE AN ACCOUNT?{' '} Login
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    height: 50,
    width: 50,
  },
  brandName: {
    fontSize: 20,
    marginTop: 8,
  },
  image: {
    height: 250,
    width: '100%',
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#252525',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 10,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#9D84F7',
    paddingVertical: 16,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 20,
    fontSize: 12,
    color: '#999',
  },
  loginLink: {
    color: '#9D84F7',
    fontWeight: 'bold',
  },
});
