import Layout from "../components/layout";

export default function Home() {
    return (
        <Layout>
      <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100">

        {/* Ana İçerik */}
        <div className="flex-1 p-10">

        <div className="absolute top-4 right-6 flex items-center gap-4">
        <span className="text-gray-700 font-medium">Barış</span>
        <div className="relative group">
            <img
            src="/avatar.png"
            alt="Profil"
            className="w-10 h-10 rounded-full border cursor-pointer"
            />
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                👤 Profili Gör
            </a>
            <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={() => {

                console.log("Çıkış yapılıyor...");
                }}
            >
                🚪 Çıkış Yap
            </button>
            </div>
        </div>
        </div>

          <h1 className="text-3xl font-bold text-indigo-800 mb-6">Hoş Geldin, Barış 👋</h1>
  
          <div className="flex flex-wrap gap-6 mt-4">
            {/* Rüya Analizi */}
            <div className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4">
            <h3 className="font-semibold text-lg mb-1">🧠 Rüya Analizi</h3>
            <p className="text-sm text-gray-600 mb-2">Rüyanı yaz, analizini gör ve sana uygun oyun önerisi al.</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                Rüya Analiz Et
            </button>
            </div>

            {/* Hikaye Üretimi */}
            <div className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4">
            <h3 className="font-semibold text-lg mb-1">📖 Hikaye Üret</h3>
            <p className="text-sm text-gray-600 mb-2">Rüyandan ilham al, hikayeni oluştur.</p>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                Hikaye Oluştur
            </button>
            </div>

              {/* Önerilen oyun kutusu */}
              <div className="bg-white p-4 rounded shadow-md w-full max-w-md mb-4">
                <h4 className="font-semibold text-lg mb-1">✨ Dream Runner</h4>
                <p className="text-sm text-gray-600 mb-2"> Rüya temana uygun, rahatlatıcı bir oyun.</p>
                <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                 Oyunu Oyna
                </button>
  
              {/* Diğer öneriler buraya */}
              
            </div>
          </div>
        </div>
      </div>
      </Layout>
    );
  }
  