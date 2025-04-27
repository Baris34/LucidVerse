import React, { useState,useEffect } from "react";
import Layout from "../components/layout";
import { marked } from "marked";

export default function DreamAnalysisPage() {
  const [dreamText, setDreamText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [dreams, setDreams] = useState([]);


  useEffect(() => {
    fetch("http://localhost:5000/dreams")
      .then((res) => res.json())
      .then((data) => setDreams(data.slice(0, 5)))
      .catch((err) => console.error("Hikayeler alınamadı", err));
  }, []);

  const handleAnalyze = async () => {
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: dreamText }),
      });
  
      const data = await response.json();
      setAnalysis(data.analysis); 
    } catch (error) {
      console.error("Hata oluştu:", error);
    }
  };
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

        <button className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded shadow transition"onClick={handleAnalyze}>
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
        <div
        className="text-gray-700 space-y-4"
        dangerouslySetInnerHTML={{
            __html: marked.parse(
            analysis
                .replace(/^\* /gm, '') 
                .replace(/\*\*/g, '**')
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            ),
        }}
        ></div>

        <h3 className="text-lg font-semibold mt-8 mb-2">🕓 Geçmiş Analizler</h3>
        
          <div className="space-y-4">
          {dreams.map((dream) => (
            <div
              key={dream.id}
              className="bg-gray-100 p-5 rounded-xl shadow-sm hover:bg-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={() => (window.location.href = `/dream/${dream.id}`)}
            >
              <h3 className="font-bold text-gray-800">{dream.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Ana Tema: {dream.theme}</p>
            </div>
          ))}
          {/* Daha fazlası buraya eklenebilir */}
        </div>
      </div>
    </div>
    </Layout>
  );
}
