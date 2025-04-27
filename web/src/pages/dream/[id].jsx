import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function DreamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchDream = async () => {
      try {
        const res = await fetch(`http://localhost:5000/dream/${id}`);
        const data = await res.json();
        setDream(data);
      } catch (err) {
        console.error("Hikaye detay çekme hatası:", err);
      }
    };
    fetchDream();
  }, [id]);

  if (!dream) {
    return <div className="p-10 text-center text-gray-500">Yükleniyor...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 p-6 flex flex-col items-center">
      <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-md w-full">
        <h1 className="text-3xl font-bold text-indigo-700 mb-4">{dream.title}</h1>
        <p className="text-gray-700 whitespace-pre-line mb-6">{dream.analysis}</p>
        <div className="text-sm text-purple-700 font-semibold">Tema: {dream.theme}</div>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="mt-6 px-4 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
      >
        ← Geri Dön
      </button>
    </div>
  );
}
