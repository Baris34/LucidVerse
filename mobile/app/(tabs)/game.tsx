import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { LinearGradient } from 'expo-linear-gradient';

const categories = [
  { id: 'all', label: 'Tümü', icon: 'apps-outline' as const },
  { id: 'fav', label: 'Favoriler', icon: 'heart-outline' as const },
  { id: 'runner', label: 'Runner', icon: 'walk-outline' as const },
  { id: 'horror', label: 'Korku', icon: 'skull-outline' as const },
  { id: 'kids', label: 'Çocuk', icon: 'happy-outline' as const },
];

const games = [
  { id: 1, name: 'Dream Runner', image: require('../../assets/gamelogo.png'), theme: 'runner', isUnityGame: true, webGLUrl: 'https://statuesque-bublanina-ae9555.netlify.app/', description: "Rüyalarının hızında koş!" },
  { id: 2, name: 'Spooky Sleep', image: require('../../assets/logo.png'), theme: 'horror', description: "Ürkütücü bir uyku macerası." },
  { id: 3, name: 'Kiddo Jump', image: require('../../assets/logo.png'), theme: 'kids', description: "Çocuklar için eğlenceli zıplama." },
  { id: 4, name: 'Relax World', image: require('../../assets/logo.png'), theme: 'fav', description: "Huzurlu bir dünyada rahatla." },
];

const featuredGame = games.find(game => game.id === 1);

export default function GameScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showWebView, setShowWebView] = useState(false);
  const [gameUrl, setGameUrl] = useState('');
  const [webViewLoading, setWebViewLoading] = useState(false);
  const webViewRef = useRef<WebView>(null);

  const filteredGames =
    activeCategory === 'all'
      ? games
      : games.filter((game) => game.theme === activeCategory);

  const handleGamePress = (game: (typeof games)[0]) => {
    if (game.isUnityGame && game.webGLUrl) {
      setGameUrl(game.webGLUrl);
      setShowWebView(true);
    } else {
      alert(`Şu anlık sadece "${game.name}" Unity oyunu aktif.`);
    }
  };

  const onMessageFromWebView = (event: any) => { /* ... (önceki gibi) ... */ };
  const sendMessageToWebGL = (message: object | string) => { /* ... (önceki gibi) ... */ };

  if (showWebView) {
    return (
      <View style={styles.unityContainer}>
        <StatusBar barStyle="light-content" />
        <WebView
          ref={webViewRef}
          source={{ uri: gameUrl }}
          style={styles.unityView}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          originWhitelist={['*']}
          onLoadStart={() => setWebViewLoading(true)}
          onLoadEnd={() => setWebViewLoading(false)}
          onError={(syntheticEvent) => {
            console.warn('WebView Error: ', syntheticEvent.nativeEvent);
            setWebViewLoading(false);
          }}
          onMessage={onMessageFromWebView}
          androidHardwareAccelerationDisabled={false}
        />
        {webViewLoading && (
          <ActivityIndicator style={styles.loadingIndicator} size="large" color="#FFFFFF" />
        )}
        <TouchableOpacity style={styles.closeUnityButton} onPress={() => setShowWebView(false)}>
          <Ionicons name="close-circle" size={40} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={styles.container.backgroundColor} />
      <View style={styles.headerContainer}>
        <Ionicons name="game-controller-outline" size={32} color="#5D3FD3" />
        <Text style={styles.header}>Oyun Dünyası</Text>
      </View>
      <Text style={styles.subtext}>Rüyalarından ilham alan oyunları keşfet!</Text>

      {/* Kategori Filtreleri */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
        {categories.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.categoryButton,
              activeCategory === item.id && styles.activeCategoryButton,
            ]}
            onPress={() => setActiveCategory(item.id)}
          >
            <Ionicons
              name={item.icon}
              size={18}
              color={activeCategory === item.id ? '#FFFFFF' : '#5D3FD3'}
            />
            <Text style={[
              styles.categoryLabel,
              activeCategory === item.id && styles.activeCategoryLabel,
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Öne Çıkan Oyun Kartı */}
      {featuredGame && (
        <TouchableOpacity onPress={() => handleGamePress(featuredGame)}>
          <LinearGradient
            colors={['#7F00FF', '#E100FF']}
            style={styles.featuredGameCard}
          >
            <Image source={featuredGame.image} style={styles.featuredGameImage} />
            <View style={styles.featuredGameTextContainer}>
              <Text style={styles.featuredGameBadge}>{featuredGame.theme.toUpperCase()}</Text>
              <Text style={styles.featuredGameTitle}>{featuredGame.name}</Text>
              <Text style={styles.featuredGameDesc}>{featuredGame.description}</Text>
            </View>
            <View style={styles.playButtonContainer}>
              <Ionicons name="play-circle" size={50} color="rgba(255,255,255,0.8)" />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {/* Oyun Kartları Izgarası */}
      <Text style={styles.gridTitle}>Tüm Oyunlar</Text>
      <View style={styles.grid}>
        {filteredGames.map((game) => (
          <TouchableOpacity
            key={game.id}
            style={styles.gameCard}
            onPress={() => handleGamePress(game)}
          >
            <Image source={game.image} style={styles.gameImage} />
            <View style={styles.gameTextContainer}>
              <Text style={styles.gameName} numberOfLines={1}>{game.name}</Text>
              <Text style={styles.gameTheme} numberOfLines={1}>{game.theme.toUpperCase()}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredGames.length === 0 && activeCategory !== 'all' && (
          <Text style={styles.noGamesText}>Bu kategoride henüz oyun bulunmuyor.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  contentContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 20 + 10 : 40,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
    marginLeft: 10,
  },
  subtext: {
    fontSize: 15,
    color: '#7F8C8D',
    marginBottom: 24,
  },
  categoryRow: {
    marginBottom: 24,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  activeCategoryButton: {
    backgroundColor: '#5D3FD3',
    borderColor: '#5D3FD3',
  },
  categoryLabel: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#5D3FD3',
  },
  activeCategoryLabel: {
    color: '#FFFFFF',
  },
  featuredGameCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#6A0DAD',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  featuredGameImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  featuredGameTextContainer: {
    flex: 1,
  },
  featuredGameBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  featuredGameTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  featuredGameDesc: {
    fontSize: 13,
    color: '#E0E0E0',
    marginBottom: 8,
  },
  playButtonContainer: {
    marginLeft: 'auto',
    padding: 10,
  },
  gridTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#B0BEC5',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  gameImage: {
    width: '100%',
    height: 110,
  },
  gameTextContainer: {
    padding: 12,
  },
  gameName: {
    fontWeight: '600',
    fontSize: 15,
    color: '#34495E',
    marginBottom: 4,
  },
  gameTheme: {
    fontSize: 11,
    color: '#7F8C8D',
    textTransform: 'uppercase',
  },
  noGamesText: {
    width: '100%',
    textAlign: 'center',
    marginTop: 20,
    color: '#7F8C8D',
    fontSize: 15,
  },
  unityContainer: { flex: 1, position: 'relative', backgroundColor: 'black' },
  unityView: { flex: 1 },
  loadingIndicator: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)'},
  closeUnityButton: { position: 'absolute', top: Platform.OS === 'ios' ? 50 : 25, right: 15, zIndex: 10, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 25, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' },
});