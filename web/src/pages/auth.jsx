// src/pages/Auth.jsx (veya LoginRegister.jsx)
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Auth işlemleri burada yapılabilir
    navigate('/home'); // Giriş başarılıysa yönlendirme
  };
  return (
    <div className="min-h-screen flex">
      {/* Sağ taraf (sadece büyük ekranlarda) */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-indigo-400 to-purple-300 justify-center items-center p-12">
        <div className="text-white text-center">
          <h2 className="text-4xl font-bold mb-4">LucidVerse’e Hoş Geldin</h2>
          <p className="text-lg">Rüyalarını analiz et, hikayelere dönüştür, oyunlarla keşfet.</p>
        </div>
      </div>

      {/* Sol taraf - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <h2 className="text-3xl font-bold mb-2">{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {isLogin ? "Devam etmek için giriş yap" : "Hesap oluştur ve keşfe başla"}
        </p>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Adınız"
              className="mb-4 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
          <input
            type="password"
            placeholder="Şifre"
            className="mb-6 w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded transition duration-300"
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          {isLogin ? "Henüz hesabın yok mu?" : "Zaten hesabın var mı?"}
          <button
            className="ml-1 text-indigo-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Kayıt Ol" : "Giriş Yap"}
          </button>
        </p>
      </div>
    </div>
  );
}
