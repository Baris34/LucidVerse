import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiShare2, FiBookOpen, FiTag, FiCalendar, FiLoader, FiAlertCircle } from 'react-icons/fi'; 

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

export default function StoryDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [story, setStory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = story ? `${story.title} - LucidVerse Hikayesi` : "Hikaye Detayı - LucidVerse";
  }, [story]);

  useEffect(() => {
    if (!id) {
        setError("Geçersiz hikaye ID'si.");
        setIsLoading(false);
        return;
    }
    const fetchStory = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`${BASE_URL}/story/${id}`);
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || `Hikaye detayı alınamadı (HTTP ${res.status})`);
        }
        const data = await res.json();
        setStory(data);
      } catch (err) {
        console.error("Hikaye detay çekme hatası:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, [id]);

  const handleShare = async () => {
    if (!story) return;
    const shareData = {
      title: `LucidVerse Hikayesi: ${story.title}`,
      text: `"${story.title}" adlı hikayeyi LucidVerse'de oku: ${story.story.substring(0,150)}...`,
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
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
        <div className="flex-1 flex flex-col justify-center items-center p-10 bg-gradient-to-br from-slate-100 to-pink-100 min-h-screen">
          <FiLoader className="animate-spin text-pink-500" size={48} />
          <p className="mt-4 text-slate-600">Hikaye yükleniyor...</p>
        </div>
      </Layout>
    );
  }

  if (error || !story) {
    return (
      <Layout>
        <div className="flex-1 flex flex-col justify-center items-center p-10 text-center bg-gradient-to-br from-slate-100 to-pink-100 min-h-screen">
          <FiAlertCircle className="text-red-500 mb-4" size={48} />
          <h2 className="text-xl font-semibold text-slate-700 mb-2">Bir Sorun Oluştu</h2>
          <p className="text-slate-500 mb-6">{error || "Hikaye detayı bulunamadı."}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors flex items-center gap-2"
          >
            <FiArrowLeft size={18}/> Geri Dön
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-100 to-pink-100 min-h-screen overflow-y-auto">
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
            {story.title || "Hikaye"}
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
          {story.created_at && (
            <div className="flex items-center text-sm text-slate-500 mb-5">
              <FiCalendar size={16} className="mr-2 opacity-70" />
              <span>Oluşturulma: {formatDate(story.created_at)}</span>
            </div>
          )}

          {/* Hikaye İçeriği */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-pink-700 mb-3 flex items-center gap-2">
              <FiBookOpen size={20} /> Hikayen
            </h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{story.story || "Hikaye içeriği bulunamadı."}</p>
          </div>
          
          {/* Ana Tema */}
          {story.theme && (
            <div className="pt-6 border-t border-slate-200">
                <div className="bg-pink-50 p-4 rounded-lg flex items-center gap-3">
                <FiTag size={22} className="text-pink-600" />
                <div>
                    <p className="text-xs text-pink-500 font-semibold uppercase">Ana Tema</p>
                    <p className="text-lg font-bold text-pink-700">{story.theme}</p>
                </div>
                </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}