import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const userAvatar = require('../../assets/avatar.png');

export default function ProfileScreen() {
  const router = useRouter();

  const username = "Barış";
  const email = "baris@example.com";
  const dreamCount = 12;
  const storyCount = 8;
  const gamesPlayed = 5;
  const highestScore = 1200;

  const settingsItems = [
    { label: 'Şifreyi Değiştir', icon: 'lock-closed-outline' as const, onPress: () => alert('Şifre Değiştirme Ekranı') },
    { label: 'Hesap Ayarları', icon: 'settings-outline' as const, onPress: () => router.push('/profile/settings') },
    { label: 'Bildirim Ayarları', icon: 'notifications-outline' as const, onPress: () => alert('Bildirim Ayarları') },
  ];

  const supportItems = [
    { label: 'Destek & Yardım Merkezi', icon: 'help-circle-outline' as const, onPress: () => alert('Destek Ekranı') },
    { label: 'Uygulama Hakkında', icon: 'information-circle-outline' as const, onPress: () => alert('Uygulama Hakkında Ekranı') },
    { label: 'Gizlilik Politikası', icon: 'shield-checkmark-outline' as const, onPress: () => alert('Gizlilik Politikası') },
  ];

  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor as string} />
      <LinearGradient colors={['#E6E9F0', '#F4F6F8', '#F4F6F8']} style={styles.gradientBackground}>
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Profil Bilgisi */}
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={userAvatar} style={styles.avatar} />
              <TouchableOpacity style={styles.avatarEditButton} onPress={() => alert('Avatar Düzenle')}>
                <Ionicons name="camera-outline" size={18} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>{username}</Text>
            <Text style={styles.email}>{email}</Text>
          </View>



          {/* Ayarlar Bölümü */}
          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Hesap</Text>
            {settingsItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
                <Ionicons name={item.icon} size={22} color="#555" style={styles.settingIcon} />
                <Text style={styles.settingText}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#B0BEC5" />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.settingsSection}>
            <Text style={styles.sectionTitle}>Destek & Bilgi</Text>
            {supportItems.map((item, index) => (
              <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress}>
                <Ionicons name={item.icon} size={22} color="#555" style={styles.settingIcon} />
                <Text style={styles.settingText}>{item.label}</Text>
                <Ionicons name="chevron-forward-outline" size={20} color="#B0BEC5" />
              </TouchableOpacity>
            ))}
          </View>

          {/* Çıkış Yap Butonu */}
          <TouchableOpacity style={styles.logoutButton} onPress={() => alert('Çıkış Yapıldı')}>
            <Ionicons name="log-out-outline" size={22} color="#D32F2F" style={styles.settingIcon} />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>

        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const StatCard = ({ label, value, icon, color }: { label: string; value: number | string; icon: keyof typeof Ionicons.glyphMap; color: string }) => (
  <View style={[styles.statCard, { backgroundColor: color + '20' }]}> {/* Hafif arka plan */}
    <Ionicons name={icon} size={28} color={color} style={{ marginBottom: 8 }} />
    <Text style={[styles.statValue, { color: color }]}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  container: {
    backgroundColor: '#F4F6F8',
  },
  scrollContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 + 20 : 60,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  avatarEditButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#6A5ACD',
    padding: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    borderRadius: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    marginTop: 2,
    textAlign: 'center',
  },
  settingsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7F8C8D',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#34495E',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FFF0F0',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  logoutText: {
    color: '#D32F2F',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});