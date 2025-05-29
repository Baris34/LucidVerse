import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Switch, ScrollView, Platform, StatusBar,ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import BASE_URL from '../../constants/api';
const googleIcon = require('../../assets/google.png');

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const isEmailValid = (emailToTest: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailToTest);

  const handleSignUp = async () => {
    if (!username.trim() || !email.trim() || !password.trim()) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    if (!isEmailValid(email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.");
      return;
    }
    if (password.length < 6) {
      alert("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }
    if (!agreedToPolicy) {
      alert("Devam etmek için Gizlilik Politikası'nı kabul etmelisiniz.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim().toLowerCase(),
          password: password, 
        }),
      });

      const data = await response.json();

      if (response.ok) { 
        alert(data.message || "Hesap başarıyla oluşturuldu!");
        router.push({
          pathname: "/Welcome/page", 
          params: { username: data.username || username }, 
        });
      } else {
        alert(data.error || "Kayıt sırasında bir sorun oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Kayıt API hatası:", error);
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
          {/* İsterseniz buraya da bir başlık eklenebilir */}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Hesabını Oluştur</Text>
          <Text style={styles.subtitle}>LucidVerse'in büyülü dünyasına katıl!</Text>

          <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
            <AntDesign name="facebook-square" size={22} color="#FFFFFF" />
            <Text style={[styles.socialButtonText, { color: '#FFFFFF' }]}>Facebook ile Devam Et</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Image source={googleIcon} style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Google ile Devam Et</Text>
          </TouchableOpacity>

          <View style={styles.orDividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>VEYA E-POSTA İLE</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#A0A0A0" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Kullanıcı Adı"
              placeholderTextColor="#A0A0A0"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
            {username.length > 2 && <AntDesign name="checkcircle" size={20} color="#58D68D" style={styles.validationIcon} />}
          </View>

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
            />
            {isEmailValid(email) && <AntDesign name="checkcircle" size={20} color="#58D68D" style={styles.validationIcon} />}
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
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Feather name={showPassword ? "eye-off" : "eye"} size={22} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
          {password.length >= 6 && <AntDesign name="checkcircle" size={20} color="#58D68D" style={[styles.validationIcon, styles.passwordValidationIcon]} />}


          <View style={styles.checkboxContainer}>
            <Switch
              value={agreedToPolicy}
              onValueChange={setAgreedToPolicy}
              trackColor={{ false: '#D1D1D6', true: '#8E7CC3' }}
              thumbColor={agreedToPolicy ? '#FFFFFF' : '#f4f3f4'}
              ios_backgroundColor="#D1D1D6"
            />
            <Text style={styles.privacyText}>
              <Link href="/privacy-policy" style={styles.link}>Gizlilik Politikası</Link>'nı okudum ve kabul ediyorum.
            </Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Hesap Oluştur</Text>
            )}
          </TouchableOpacity>

          <View style={styles.loginPrompt}>
            <Text style={styles.loginPromptText}>Zaten bir hesabın var mı? </Text>
            <TouchableOpacity onPress={() => router.push('../Login/login')}>
              <Text style={styles.loginLink}>Giriş Yap</Text>
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
  },
  topBar: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    height: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 56 : 50,
    alignItems: 'center',
    backgroundColor: '#F4F6F8', 
  },
  topBarButton: {
    padding: 10,
  },
  content: {
    paddingHorizontal: 25, 
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  facebookButton: {
    backgroundColor: '#4267B2',
    borderColor: '#365899',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  socialButtonText: {
    fontWeight: '600',
    fontSize: 15,
    color: '#34495E',
  },
  orDividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  orText: {
    textAlign: 'center',
    color: '#A0A0A0',
    marginHorizontal: 10,
    fontSize: 12,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0', 
    height: 50, 
  },
  passwordInputContainer: {
    paddingHorizontal: 0, 
    paddingLeft: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%', 
    fontSize: 16,
    color: '#333333',
  },
  validationIcon: { 
    marginLeft: 'auto', 
    paddingRight: 5, 
  },
  passwordValidationIcon: {
    position: 'absolute', 
    right: 45, 
    top: 15,
  },
  eyeIcon: {
    padding: 10, 
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 5,
  },
  privacyText: {
    marginLeft: 10,
    fontSize: 13,
    color: '#6C757D',
    flexShrink: 1, 
  },
  link: {
    color: '#6A5ACD',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: '#6A5ACD',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
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
  loginPrompt: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  loginPromptText: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  loginLink: {
    fontSize: 14,
    color: '#6A5ACD',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});