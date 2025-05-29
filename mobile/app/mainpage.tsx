import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context'; 

const logoImage = require('../assets/logo.png');
const illustrationImage = require('../assets/Group.png');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.fullScreen}>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor="transparent" />
      <LinearGradient
        colors={['#2C3E50', '#1A2980', '#23074d']}
        style={styles.gradientBackground}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            {/* Logo Alanı */}
            <View style={styles.logoContainer}>
              <Image source={logoImage} style={styles.logo} />
              <Text style={styles.appName}>LucidVerse</Text>
            </View>

            {/* İllüstrasyon Alanı */}
            <View style={styles.illustrationContainer}>
              <Image
                source={illustrationImage}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>

            {/* Metin Alanı */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Rüyalarının Derinliklerine Yolculuk</Text>
              <Text style={styles.subtitle}>
                Gördüğün rüyaları anlamlandır, eşsiz hikayelere dönüştür ve rüya temalı oyunları keşfet.
              </Text>
            </View>

            {/* Butonlar Alanı */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push('../Signup/page')}
              >
                <Text style={styles.primaryButtonText}>Hemen Başla (Kayıt Ol)</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push('../Login/login')}
              >
                <Text style={styles.secondaryButtonText}>Zaten Bir Hesabın Var mı? Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 20 + 20,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 12,
    marginBottom: 8,
  },
  appName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  illustrationContainer: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  illustration: {
    width: '95%',
    maxWidth: 350,
    aspectRatio: 1,
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 15,
    color: '#E0E0E0',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  buttonContainer: { 
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
  },
  primaryButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '95%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 15,
  },
  primaryButtonText: {
    color: '#1A237E',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    paddingVertical: 10,
    width: '95%',
    maxWidth: 350,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#B0BEC5',
    fontSize: 14,
    fontWeight: '500',
  },
});