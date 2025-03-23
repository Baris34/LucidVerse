import React, { useState } from "react";
import Layout from "../components/layout";

export default function DreamAnalysisPage() {
  const [dreamText, setDreamText] = useState("");

  return (
    <Layout>
    <div className="flex h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
      {/* Sol Panel - Rüya Giriş */}
      <div className="w-1/2 p-10">
        <h1 className="text-3xl font-bold mb-4">🌙 Rüya Analizi</h1>
        <p className="text-gray-600 mb-6">
          Rüyanı yaz, biz analiz edelim ve sana özel önerilerde bulunalım.
        </p>

        <textarea
          value={dreamText}
          onChange={(e) => setDreamText(e.target.value)}
          placeholder="Rüyanızı buraya yazın..."
          className="w-full h-60 p-4 rounded border border-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
        />

        <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded shadow transition">
          Rüyayı Analiz Et
        </button>

        {/* Oyun Önerisi */}
        <div className="mt-6 bg-white p-4 rounded shadow-md max-w-md">
          <h3 className="font-semibold text-lg mb-1">🎮 Oyun Önerisi</h3>
          <p className="text-sm text-gray-600 mb-2">Dream Runner - Rüyana özel bir kaçış oyunu!</p>
          <button className="bg-purple-500 text-white px-4 py-1 rounded text-sm hover:bg-purple-600">
            Oyunu Oyna
          </button>
        </div>
      </div>

      {/* Sağ Panel - Analiz Sonucu + Geçmiş */}
      <div className="w-1/2 p-10 bg-white rounded-l-3xl shadow-inner">
        <h2 className="text-2xl font-bold mb-4">🔍 Analiz Sonucu</h2>
        <div className="p-4 border rounded bg-gray-50 text-sm text-gray-700 min-h-[120px]">
          {/* Burada analiz sonucu gösterilecek */}
          Burada rüya analizi sonucu görünecek.
        </div>

        <h3 className="text-lg font-semibold mt-8 mb-2">🕓 Geçmiş Analizler</h3>
        <div className="space-y-2 max-h-52 overflow-y-auto">
          {/* Dummy geçmiş analiz */}
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-700">“Gökten düşüyordum ve birden uyanmıştım.”</p>
            <span className="text-xs text-gray-500">→ Tema: Kontrol Kaybı</span>
          </div>
          <div className="p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-700">“Denizde yüzüyordum, her şey huzurluydu.”</p>
            <span className="text-xs text-gray-500">→ Tema: Rahatlama</span>
          </div>
          {/* Daha fazlası buraya eklenebilir */}
        </div>
      </div>
    </div>
    </Layout>
  );
}
