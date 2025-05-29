import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router'; // Üst bar için

export default function PrivacyPolicyScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: 'Gizlilik Politikası' }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Gizlilik Politikası</Text>
        <Text style={styles.paragraph}>
          Bu gizlilik politikası, LucidVerse uygulamasının ("Uygulama")
          kullanıcılarından ("Kullanıcı", "siz") topladığı, kullandığı,
          sakladığı ve ifşa ettiği bilgileri yönetir.
        </Text>
        <Text style={styles.heading}>Kişisel Kimlik Bilgileri</Text>
        <Text style={styles.paragraph}>
          Kullanıcılardan kişisel kimlik bilgilerini çeşitli yollarla toplayabiliriz...
          {/* Buraya gizlilik politikanızın tam metnini ekleyin */}
        </Text>
        {/* Diğer başlıklar ve paragraflar */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F4F6F8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#34495E',
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#34495E',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#4A4A4A',
    marginBottom: 12,
  },
});