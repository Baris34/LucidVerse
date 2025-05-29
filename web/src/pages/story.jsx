import React, { useState, useEffect } from "react";
import Layout from "../components/layout";

import { FiEdit3, FiFeather, FiBookOpen, FiClock, FiChevronRight, FiLoader } from 'react-icons/fi';

const BASE_URL = "http://localhost:5000";

export default function StoryPage() {
  const [inputText, setInputText] = useState("");
  const [generatedStory, setGeneratedStory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pastStories, setPastStories] = useState([]);
  const [isFetchingPast, setIsFetchingPast] = useState(true);

  useEffect(() => {
    document.title = "Hikaye Atölyesi - LucidVerse";
    const fetchPastStories = async () => {
      setIsFetchingPast(true);
      try {
        const res = await fetch(`${BASE_URL}/stories`);
        if (!res.ok) throw new Error('Geçmiş hikayeler çekilemedi');
        const data = await res.json();
        setPastStories(Array.isArray(data) ? data.map(s => ({id: s.id, title: s.title, theme: s.theme})).slice(0, 5) : []);
      } catch (err) {
        console.error("Geçmiş hikaye çekme hatası:", err);
        setPastStories([]);
      } finally {
        setIsFetchingPast(false);
      }
    };
    fetchPastStories();
  }, []);

  const handleGenerateStory = async () => {
    if (!inputText.trim()) {
      alert("Lütfen hikaye üretmek için bir metin veya anahtar kelimeler girin.");
      return;
    }
    setIsLoading(true);
    setGeneratedStory(null);

    try {
      const response = await fetch(`${BASE_URL}/generate-story`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Hikaye üretimi sırasında bir hata oluştu.');
      }
      const data = await response.json();
      setGeneratedStory(data);
      setInputText("");
    } catch (error) {
      console.error("Hikaye Üretim API Hatası:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToStoryDetail = (storyId) => {
    window.location.href = `/story/${storyId}`;
  };

  return (
    <Layout>
      <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-100 to-pink-100 min-h-screen overflow-y-auto">
        {/* Sayfa Başlığı */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FiFeather size={36} className="text-pink-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Hikaye Atölyesi</h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-base">
            Kelimelerden rüyalarına, rüyalarından eşsiz hikayelere bir yolculuk...
          </p>
        </header>

        {/* Hikaye Giriş Alanı */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-xl font-semibold text-slate-700 mb-1">İlham Kaynağın Nedir?</h2>
          <p className="text-sm text-slate-500 mb-4">Birkaç kelime, bir cümle veya rüyandan bir kesit yaz.</p>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Örn: Uçan bir fil, kayıp bir hazine, konuşan bir kedi..."
            className="w-full h-36 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none resize-none text-slate-700 text-base leading-relaxed"
          />
          <button
            onClick={handleGenerateStory}
            disabled={isLoading || !inputText.trim()}
            className={`mt-5 w-full flex items-center justify-center gap-2 ${isLoading || !inputText.trim() ? 'bg-slate-400 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'} text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-base`}
          >
            {isLoading ? (
              <>
                <FiLoader size={20} className="animate-spin mr-2" />
                Hikaye Oluşturuluyor...
              </>
            ) : (
              <>
                <FiEdit3 size={20} className="mr-2" /> Hikayemi Oluştur
              </>
            )}
          </button>
        </div>

        {/* Üretilen Hikaye Gösterimi */}
        {generatedStory && !isLoading && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10">
            <div className="flex items-center gap-3 mb-4 border-b border-slate-200 pb-4">
              <FiBookOpen size={28} className="text-purple-600" />
              <h2 className="text-xl font-semibold text-slate-700">{generatedStory.title || "İşte Yeni Hikayen!"}</h2>
            </div>
            <div className="prose prose-sm sm:prose-base text-slate-600 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 whitespace-pre-wrap leading-relaxed">
              {generatedStory.story}
            </div>
            <p className="mt-5 text-sm text-purple-700 font-semibold">
              <span className="font-normal text-slate-500">Ana Tema:</span> {generatedStory.theme || "Belirlenemedi"}
            </p>
          </div>
        )}

        {/* Geçmiş Hikayeler */}
        {(isFetchingPast || pastStories.length > 0) && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-5">
                    <FiClock size={28} className="text-indigo-600" />
                    <h2 className="text-xl font-semibold text-slate-700">Daha Önce Oluşturulan Hikayeler</h2>
                </div>
                {isFetchingPast ? (
                    <div className="flex justify-center items-center h-24">
                        <FiLoader size={32} className="animate-spin text-indigo-500" />
                    </div>
                ) : pastStories.length > 0 ? (
                    <div className="space-y-3">
                        {pastStories.map((story) => (
                            <button
                            key={story.id}
                            onClick={() => navigateToStoryDetail(story.id)}
                            className="w-full text-left bg-slate-50 p-4 rounded-lg shadow-sm hover:bg-slate-100 hover:shadow-md transition-all duration-200 flex justify-between items-center"
                            >
                            <div>
                                <h3 className="font-semibold text-slate-800 text-base">{story.title || "Başlıksız Hikaye"}</h3>
                                <p className="text-xs text-slate-500 mt-1">Tema: {story.theme || "Belirsiz"}</p>
                            </div>
                            <FiChevronRight size={20} className="text-slate-400" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-center py-5">Henüz oluşturulmuş bir hikayen bulunmuyor.</p>
                )}
            </div>
        )}
      </div>
    </Layout>
  );
}