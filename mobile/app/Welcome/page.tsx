import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform,ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const appLogoSmall = require('../../assets/logo.png');
const welcomeIllustration = require('../../assets/meditation.png');

export default function WelcomeAfterLoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ username?: string }>();
  const username = params.username || 'Rüya Gezgini';

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <LinearGradient
        colors={['#2C3E50', '#1A2980', '#23074d']}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.scrollContentContainer} showsVerticalScrollIndicator={false}>
            {/* Logo ve Uygulama Adı */}
            <View style={styles.headerContainer}>
              <Image source={appLogoSmall} style={styles.logo} />
              <Text style={styles.appName}>LucidVerse</Text>
            </View>

            {/* Karşılama Metinleri */}
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Merhaba, {username}!</Text>
              <Text style={styles.welcomeSubtitle}>LucidVerse'e Hoş Geldin.</Text>
            </View>

            {/* İllüstrasyon */}
            <View style={styles.illustrationContainer}>
              <Image
                source={welcomeIllustration}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            {/* Açıklama Metni */}
            <Text style={styles.description}>
              Rüyalarının sınırsız potansiyelini keşfetmeye, anlamlandırmaya ve yeni maceralara dönüştürmeye hazırsın.
            </Text>

            {/* Başla Butonu */}
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text style={styles.startButtonText}>Evreni Keşfet</Text>
              <Ionicons name="arrow-forward-circle-outline" size={26} color="#2C3E50" style={{ marginLeft: 10 }}/>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: 'space-around', 
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight || 20 + 30,
    paddingBottom: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20, 
  },
  logo: {
    width: 65,
    height: 65,
    borderRadius: 12,
    marginBottom: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    opacity: 0.95,
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 30, 
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 18, 
    color: '#E0E0E0',
    textAlign: 'center',
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20, 
  },
  illustration: {
    width: '85%',
    maxWidth: 320,
    aspectRatio: 1.05, 
  },
  description: {
    fontSize: 15,
    color: '#B0BEC5',
    textAlign: 'center',
    lineHeight: 23,
    paddingHorizontal: 10,
    marginBottom: 30, 
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '90%',
    maxWidth: 350,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 10,
  },
  startButtonText: {
    color: '#2C3E50',
    fontWeight: 'bold',
    fontSize: 17,
  },
});