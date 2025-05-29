import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Platform, StatusBar, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BASE_URL from '../../constants/api'; 

const googleIcon = require('../../assets/google.png');
const appLogo = require('../../assets/logo.png'); 

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isEmailValid = (emailToTest: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToTest);

  const handleLogin = async () => { 
    if (!email.trim() || !password.trim()) {
      alert("Lütfen e-posta ve şifrenizi girin.");
      return;
    }
    if (!isEmailValid(email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/login`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) { 
        alert(data.message || "Giriş başarılı!");
        router.replace('/(tabs)/home');
      } else {
        alert(data.error || "Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      }
    } catch (error) {
      console.error("Giriş API hatası:", error);
      alert("Bir ağ hatası oluştu veya sunucuya ulaşılamadı.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor as string} />
      <ScrollView
        style={styles.scrollViewStyle}
        contentContainerStyle={styles.scrollContentContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarButton} onPress={() => router.canGoBack() ? router.back() : router.push('/')}>
            <Ionicons name="arrow-back-outline" size={28} color="#34495E" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Image source={appLogo} style={styles.logo} />
          <Text style={styles.title}>Tekrar Hoş Geldin!</Text>
          <Text style={styles.subtitle}>LucidVerse hesabına giriş yap.</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta Adresi"
              placeholderTextColor="#A0A0A0"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          <View style={[styles.inputContainer, styles.passwordInputContainer]}>
            <Ionicons name="lock-closed-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              placeholderTextColor="#A0A0A0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              autoComplete="password"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPasswordButton} onPress={() => alert("Şifremi Unuttum Ekranı")}>
            <Text style={styles.forgotPasswordText}>Şifreni mi unuttun?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.submitButton} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                <Text style={styles.submitButtonText}>Giriş Yap</Text>
                )}
            </TouchableOpacity>

          <View style={styles.signUpPrompt}>
            <Text style={styles.signUpPromptText}>Hesabın yok mu? </Text>
            <TouchableOpacity onPress={() => router.push('../Signup/signup')}>
              <Text style={styles.signUpLink}>Kayıt Ol</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  container: {
    backgroundColor: "#F4F6F8",
  },
  scrollViewStyle: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  topBar: {
    position: 'absolute', 
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 56 : 50,
    alignItems: 'center',
    zIndex: 1,
  },
  topBarButton: {
    padding: 10,
  },
  content: {
    paddingHorizontal: 30,
    paddingTop: 80, 
    alignItems: 'center', 
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 40,
    textAlign: 'center',
  },
  socialButton: { /* ... (SignUpScreen'den alınabilir) ... */ },
  facebookButton: { /* ... */ },
  googleButton: { /* ... */ },
  socialIcon: { /* ... */ },
  socialButtonText: { /* ... */ },
  orDividerContainer: { /* ... */ },
  dividerLine: { /* ... */ },
  orText: { /* ... */ },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 55,
    width: '100%', 
  },
  passwordInputContainer: {
    paddingHorizontal: 0,
    paddingLeft: 15,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333333',
  },
  eyeIcon: {
    padding: 12,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end', 
    marginBottom: 25,
    paddingVertical: 5,
  },
  forgotPasswordText: {
    color: '#6A5ACD',
    fontSize: 14,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%', 
    shadowColor: '#6A5ACD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 7,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpPrompt: { 
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  signUpPromptText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  signUpLink: {
    fontSize: 14,
    color: '#6A5ACD',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});