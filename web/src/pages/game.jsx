import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/layout';

import gameLogo from '../assets/gamelogo.png';
import placeholderLogo from '../assets/logo.png';

const categories = [
  { id: 'all', label: 'Tümü', icon: '▦' },
  { id: 'fav', label: 'Favoriler', icon: '♥' },
  { id: 'runner', label: 'Runner', icon: '🏃' },
  { id: 'horror', label: 'Korku', icon: '👻' },
  { id: 'kids', label: 'Çocuk', icon: '😊' },
];

const games = [
  { id: 1, name: 'Dream Runner', image: gameLogo, theme: 'runner', isUnityGame: true, webGLUrl: 'https://statuesque-bublanina-ae9555.netlify.app/', description: "Rüyalarının hızında koş!" },
  { id: 2, name: 'Spooky Sleep', image: placeholderLogo, theme: 'horror', description: "Ürkütücü bir uyku macerası." },
  { id: 3, name: 'Kiddo Jump', image: placeholderLogo, theme: 'kids', description: "Çocuklar için eğlenceli zıplama." },
  { id: 4, name: 'Relax World', image: placeholderLogo, theme: 'fav', description: "Huzurlu bir dünyada rahatla." },
];

const featuredGame = games.find(game => game.id === 1);

export default function GameScreen() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showWebGLGame, setShowWebGLGame] = useState(false);
  const [gameUrl, setGameUrl] = useState('');
  const [isLoadingGame, setIsLoadingGame] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    document.title = "Oyun Dünyası - LucidVerse";
  }, []);


  const filteredGames =
    activeCategory === 'all'
      ? games
      : games.filter((game) => game.theme === activeCategory);

  const handleGamePress = (game) => {
    if (game.isUnityGame && game.webGLUrl) {
      setGameUrl(game.webGLUrl);
      setShowWebGLGame(true);
      setIsLoadingGame(true);
    } else {
      alert(`"${game.name}" oyunu şu anda WebGL olarak mevcut değil.`);
    }
  };

  const handleIframeLoad = () => {
    setIsLoadingGame(false);
  };

  if (showWebGLGame) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-80">
        {isLoadingGame && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
            <p className="mt-4 text-white text-lg">Oyun Yükleniyor...</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={gameUrl}
          title="LucidVerse Game"
          className={`w-full h-full transition-opacity duration-500 ${isLoadingGame ? 'opacity-0' : 'opacity-100'}`}
          frameBorder="0"
          allowFullScreen
          onLoad={handleIframeLoad}
        />
        <button
          onClick={() => {
            setShowWebGLGame(false);
            setIsLoadingGame(false);
          }}
          className="absolute top-4 right-4 p-3 bg-gray-700 bg-opacity-75 rounded-full text-white hover:bg-gray-600 transition-all"
          aria-label="Oyunu Kapat"
        >
          {/* Kapatma ikonu (X) */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <Layout> {/* Ana içeriği Layout ile sar */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-theme(spacing.24))]"> {/* min-h ayarı layout'unuza göre değişebilir */}
        {/* Başlık Alanı */}
        <header className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center bg-purple-100 text-purple-600 p-3 rounded-full mb-4 text-3xl">
            🎮 {/* Emoji ikon */}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-700">Oyun Dünyası</h1>
          <p className="mt-3 text-lg sm:text-xl text-purple-500">Rüyalarından ilham alan maceraları keşfet!</p>
        </header>

        {/* Kategori Filtreleri */}
        <div className="mb-10 sm:mb-12">
          <div className="flex space-x-2 sm:space-x-3 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100"> {/* Scrollbar stilleri (opsiyonel) */}
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out
                  ${activeCategory === category.id
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 ring-1 ring-inset ring-gray-300'
                  }`}
              >
                <span className="mr-2 text-lg">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Öne Çıkan Oyun */}
        {featuredGame && (
          <div
            className="mb-12 sm:mb-16 p-6 sm:p-8 rounded-3xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white shadow-2xl cursor-pointer hover:shadow-indigo-400/50 transition-shadow duration-300"
            onClick={() => handleGamePress(featuredGame)}
          >
            <div className="flex flex-col md:flex-row items-center">
              <img src={featuredGame.image} alt={featuredGame.name} className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover mr-0 md:mr-8 mb-4 md:mb-0 border-4 border-white shadow-lg"/>
              <div className="flex-1 text-center md:text-left">
                <span className="inline-block bg-yellow-400 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                  {featuredGame.theme}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">{featuredGame.name}</h2>
                <p className="text-sm sm:text-base text-indigo-100 mb-4">{featuredGame.description}</p>
                <div className="inline-flex items-center px-6 py-3 bg-white text-purple-700 font-semibold rounded-full text-sm shadow-md hover:bg-gray-100 transition-colors">
                  Oyuna Başla <span className="ml-2 text-xl">▶</span> {/* Play ikonu için emoji */}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Oyun Kartları Izgarası */}
        <h3 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6 sm:mb-8">Tüm Oyunlar</h3>
        {filteredGames.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => handleGamePress(game)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer group transform hover:-translate-y-1 transition-all duration-300"
              >
                <img src={game.image} alt={game.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"/>
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-purple-600 transition-colors">{game.name}</h4>
                  <p className="text-xs text-purple-500 font-medium uppercase tracking-wider">{game.theme}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8 py-10">Bu kategoride henüz oyun bulunmuyor. 🙁</p>
        )}
      </div>
    </Layout>
  );
}