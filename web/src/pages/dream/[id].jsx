import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShare2, FiMoon, FiTag, FiCalendar, FiLoader, FiAlertCircle,FiMessageSquare } from 'react-icons/fi';

const BASE_URL = "http://localhost:5000";


const formatDate = (dateString) => {
    if (!dateString) return "Bilinmiyor";
    try {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric', month: 'long', day: 'numeric', 
        });
    } catch (e) {
        return dateString;
    }
};


export default function DreamDetail() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = dream ? `${dream.title} - LucidVerse` : "Rüya Detayı - LucidVerse";
  }, [dream]);

  useEffect(() => {
    if (!id) {
        setError("Geçersiz rüya ID'si.");
        setIsLoading(false);
        return;
    }
    const fetchDream = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/dream/${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Rüya detayı alınamadı (HTTP ${res.status})`);
        }
        const data = await res.json();
        setDream(data);
      } catch (err) {
        console.error("Rüya detay çekme hatası:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDream();
  }, [id]);

  const handleShare = async () => {
    if (!dream) return;
    const shareData = {
      title: `LucidVerse Rüya: ${dream.title}`,
      text: `Rüyamın teması "${dream.theme}" ve yorumu: ${dream.analysis.substring(0,100)}...\nLucidVerse'de keşfet!`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log('İçerik başarıyla paylaşıldı');
      } else {
        alert('Tarayıcınız bu paylaşım özelliğini desteklemiyor.');
      }
    } catch (err) {
      console.error('Paylaşım hatası:', err);
    }
  };


  if (isLoading) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-slate-100 to-violet-100 min-h-screen">
          <FiLoader className="animate-spin text-violet-500" size={48} />
          <p className="mt-4 text-slate-600">Rüya yükleniyor...</p>
        </div>
      </Layout>
    );
  }

  if (error || !dream) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col justify-center items-center p-10 text-center bg-gradient-to-br from-slate-100 to-violet-100 min-h-screen">
          <FiAlertCircle className="text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Bir Sorun Oluştu</h2>
          <p className="text-slate-500 mb-6">{error || "Rüya detayı bulunamadı."}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={18}/> Geri Dön
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-100 to-violet-100 min-h-screen overflow-y-auto">
        {/* Üst Bar */}
        <header className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Geri"
          >
            <FiArrowLeft size={24} className="text-slate-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 text-center truncate max-w-[70%]">
            {dream.title || "Rüya Detayı"}
          </h1>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors"
            aria-label="Paylaş"
          >
            <FiShare2 size={22} className="text-slate-700" />
          </button>
        </header>

        {/* Ana İçerik Kartı */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl">
          {/* Tarih Bilgisi (varsa) */}
          {dream.created_at && (
            <div className="flex items-center text-sm text-slate-500 mb-5">
              <FiCalendar size={16} className="mr-2 opacity-70" />
              <span>Görülme Tarihi: {formatDate(dream.created_at)}</span>
            </div>
          )}

          {/* Rüya Yorumu */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-violet-700 mb-3 flex items-center gap-2">
              <FiMessageSquare size={20} /> Rüya Yorumu
            </h2>
            {/* Eğer markdown kullanıyorsanız:
            */}
            {/* Düz metin için: */}
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{dream.analysis || "Yorum bulunamadı."}</p>
          </div>
          
          {/* Orijinal Rüya Metni (varsa) */}
          {dream.dream_text && (
            <div className="mb-6 pt-6 border-t border-slate-200">
              <h2 className="text-lg font-semibold text-indigo-700 mb-3 flex items-center gap-2">
                <FiMoon size={20} /> Senin Rüyan
              </h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line italic bg-indigo-50 p-4 rounded-lg">
                {dream.dream_text}
              </p>
            </div>
          )}

          {/* Ana Tema */}
          <div className="pt-6 border-t border-slate-200">
            <div className="bg-violet-50 p-4 rounded-lg flex items-center gap-3">
              <FiTag size={22} className="text-violet-600" />
              <div>
                <p className="text-xs text-violet-500 font-semibold uppercase">Ana Tema</p>
                <p className="text-lg font-bold text-violet-700">{dream.theme || "Belirlenemedi"}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}