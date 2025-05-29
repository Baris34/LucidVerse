import React, { useState, useEffect} from "react";
import Layout from "../components/layout";
import { marked } from "marked";

import { FiSearch, FiPlayCircle, FiMessageSquare, FiClock, FiChevronRight, FiZap } from 'react-icons/fi';
import { FaBrain } from 'react-icons/fa';
import gameLogo from '../assets/gamelogo.png'; 

const BASE_URL = "http://localhost:5000";

const createMarkup = (htmlString) => {
    return { __html: htmlString };
};

export default function DreamAnalysisPage() {
  const [dreamText, setDreamText] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pastDreams, setPastDreams] = useState([]);
  const [isFetchingPast, setIsFetchingPast] = useState(true);

  useEffect(() => {
    const fetchPastDreams = async () => {
      setIsFetchingPast(true);
      try {
        const res = await fetch(`${BASE_URL}/dreams`);
        if (!res.ok) throw new Error('Geçmiş rüyalar çekilemedi');
        const data = await res.json();
        setPastDreams(Array.isArray(data) ? data.slice(0, 5) : []); 
      } catch (err) {
        console.error("Geçmiş rüya çekme hatası:", err);
        setPastDreams([]);
      } finally {
        setIsFetchingPast(false);
      }
    };
    fetchPastDreams();
  }, []);

  const handleAnalyze = async () => {
    if (!dreamText.trim()) {
      alert("Lütfen analiz edilecek bir rüya metni girin.");
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      const response = await fetch(`${BASE_URL}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: dreamText }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analiz sırasında bir hata oluştu.');
      }
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("Analiz API Hatası:", error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const sanitizeHtml = (htmlString) => {
    if (!htmlString) return "";
    let clean = htmlString.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
    clean = clean.replace(/onerror\s*=\s*['"].*?['"]/gi, "");
    return clean;
  };


  const navigateToDreamDetail = (dreamId) => {
    window.location.href = `/dream/${dreamId}`;
  };

  const navigateToGame = (gameName) => {
    window.location.href = `/game`;
    alert(`${gameName} oyunu açılıyor...`);
  };


  return (
    <Layout>
      <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-100 to-violet-100 min-h-screen overflow-y-auto">
        {/* Sayfa Başlığı */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <FaBrain size={36} className="text-violet-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Rüya Analizi</h1>
          </div>
          <p className="text-slate-600 text-sm sm:text-base">
            Rüyanı yaz, bilinçaltının derinliklerini keşfet ve sana özel oyun önerileriyle eğlen.
          </p>
        </header>

        {/* Rüya Giriş ve Analiz Alanı */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10">
          <h2 className="text-xl font-semibold text-slate-700 mb-4">Rüyanı Anlat</h2>
          <textarea
            value={dreamText}
            onChange={(e) => setDreamText(e.target.value)}
            placeholder="Gördüğün rüyayı buraya yazarak gizemli yolculuğuna başla..."
            className="w-full h-48 p-4 rounded-lg border border-slate-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none resize-none text-slate-700 text-base leading-relaxed"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !dreamText.trim()}
            className={`mt-5 w-full flex items-center justify-center gap-2 ${isLoading || !dreamText.trim() ? 'bg-slate-400 cursor-not-allowed' : 'bg-violet-600 hover:bg-violet-700'} text-white py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-semibold text-base`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analiz Ediliyor...
              </>
            ) : (
              <>
                <FiSearch size={20} className="mr-2" /> Rüyayı Analiz Et
              </>
            )}
          </button>
        </div>

        {/* Analiz Sonucu ve Oyun Önerisi (yan yana veya alt alta olabilir) */}
        {analysisResult && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            {/* Analiz Sonucu Kartı */}
            <div className="bg-white p-6 rounded-2xl shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <FiMessageSquare size={28} className="text-purple-600" />
                <h2 className="text-xl font-semibold text-slate-700">Analiz Sonucun</h2>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{analysisResult.title || "Rüya Başlığı"}</h3>
              <div
                className="prose prose-sm sm:prose-base text-slate-600 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100"
                dangerouslySetInnerHTML={createMarkup(sanitizeHtml(marked.parse(analysisResult.analysis || "")))}
              ></div>
              <p className="mt-4 text-sm text-purple-700 font-semibold">
                <span className="font-normal text-slate-500">Ana Tema:</span> {analysisResult.theme || "Belirlenemedi"}
              </p>
            </div>

            {/* Oyun Önerisi Kartı */}
            <div className="bg-gradient-to-br from-teal-50 to-green-50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-white rounded-full shadow-lg mb-4">
                <FiZap size={32} className="text-teal-500" />
              </div>
              <h3 className="font-semibold text-xl text-teal-700 mb-2">Sana Özel Oyun Önerisi!</h3>
              <p className="text-sm text-teal-600 mb-3">"{analysisResult.title}" rüyanın temasına uygun:</p>
              <img src={gameLogo} alt="Dream Runner" className="w-24 h-24 rounded-lg mb-3 object-cover shadow-md"/>
              <h4 className="text-lg font-bold text-teal-800">Dream Runner</h4>
              <button
                onClick={() => navigateToGame("Dream Runner")}
                className="mt-4 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all font-semibold"
              >
                <FiPlayCircle size={20} className="inline mr-2 mb-0.5" /> Oyunu Oyna
              </button>
            </div>
          </div>
        )}

        {/* Geçmiş Analizler */}
        {(isFetchingPast || pastDreams.length > 0) && (
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
                <div className="flex items-center gap-3 mb-5">
                    <FiClock size={28} className="text-indigo-600" />
                    <h2 className="text-xl font-semibold text-slate-700">Geçmiş Rüya Analizlerin</h2>
                </div>
                {isFetchingPast ? (
                    <div className="flex justify-center items-center h-24">
                        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                ) : pastDreams.length > 0 ? (
                    <div className="space-y-4">
                        {pastDreams.map((dream) => (
                            <button 
                            key={dream.id}
                            onClick={() => navigateToDreamDetail(dream.id)}
                            className="w-full text-left bg-slate-50 p-4 rounded-xl shadow-sm hover:bg-slate-100 hover:shadow-md transition-all duration-200 flex justify-between items-center"
                            >
                            <div>
                                <h3 className="font-semibold text-slate-800 text-base">{dream.title || "Başlıksız Rüya"}</h3>
                                <p className="text-sm text-slate-500 mt-1">Ana Tema: {dream.theme || "Belirsiz"}</p>
                            </div>
                            <FiChevronRight size={20} className="text-slate-400" />
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-center py-5">Henüz analiz edilmiş bir rüyan bulunmuyor.</p>
                )}
            </div>
        )}
      </div>
    </Layout>
  );
}