import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiLogIn, FiUserPlus, FiMoon, FiLoader } from 'react-icons/fi';

const BASE_URL = "http://localhost:5000";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const endpoint = isLogin ? `${BASE_URL}/login` : `${BASE_URL}/signup`;
    const payload = isLogin
      ? { email: email.trim().toLowerCase(), password }
      : { username: username.trim(), email: email.trim().toLowerCase(), password };

    if (!isLogin && !username.trim()) {
      setError("Kullanıcı adı boş bırakılamaz.");
      setIsLoading(false);
      return;
    }
    if (!email.trim()) {
      setError("E-posta boş bırakılamaz.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setError("Şifre boş bırakılamaz.");
      setIsLoading(false);
      return;
    }
    if (!isLogin && password.length < 6) {
        setError("Şifre en az 6 karakter olmalıdır.");
        setIsLoading(false);
        return;
    }


    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || (isLogin ? 'Giriş başarısız oldu.' : 'Kayıt başarısız oldu.'));
      }

      console.log(isLogin ? 'Giriş başarılı:' : 'Kayıt başarılı:', data);

      if (isLogin) {
        alert(data.message || "Giriş başarılı!");
        navigate('/home');
      } else {
        alert(data.message || "Hesabınız başarıyla oluşturuldu! Lütfen giriş yapın.");
        setIsLogin(true); 
        setUsername('');
        setEmail('');
        setPassword('');
      }

    } catch (err) {
      setError(err.message || "Bir şeyler ters gitti. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sol Taraf - Görsel ve Karşılama */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 justify-center items-center p-12 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-500/30 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-10 w-80 h-80 bg-indigo-500/30 rounded-full filter blur-3xl opacity-60 animate-pulse delay-1000"></div>
        <div className="text-white text-center z-10">
          <FiMoon size={64} className="mx-auto mb-6 text-pink-300 opacity-80" />
          <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
            Lucid<span className="font-light">Verse</span>
          </h1>
          <p className="text-xl text-indigo-100 opacity-90 max-w-md mx-auto">
            Rüyalarının sınırsız evrenine adım at. Anlamlandır, yarat ve keşfet.
          </p>
        </div>
      </div>

      {/* Sağ Taraf - Form Alanı */}
      <div className="w-full md:w-1/2 lg:w-2/5 flex flex-col justify-center items-center p-8 sm:p-12 bg-slate-50">
        <div className="w-full max-w-sm"> {/* max-w-sm daha iyi olabilir */}
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{isLogin ? "Tekrar Hoş Geldin!" : "Maceraya Katıl!"}</h2>
            <p className="text-sm text-slate-500">
              {isLogin ? "LucidVerse hesabına giriş yap." : "Yeni bir hesap oluşturarak rüyalarının kapısını arala."}
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="relative">
                <FiUser className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Kullanıcı Adı"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required={!isLogin}
                  className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
            )}
            <div className="relative">
              <FiMail className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="email"
                placeholder="E-posta Adresi"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 w-full p-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>

            {error && <p className="text-xs text-red-600 text-center py-1 bg-red-100 rounded">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700 active:bg-purple-800'} text-white p-3.5 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300 font-semibold text-base`}
            >
              {isLoading ? (
                <>
                  <FiLoader className="animate-spin" size={20}/> Yükleniyor...
                </>
              ) : isLogin ? (
                <>
                  <FiLogIn size={20}/> Giriş Yap
                </>
              ) : (
                <>
                  <FiUserPlus size={20}/> Kayıt Ol
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-sm text-slate-600 text-center">
            {isLogin ? "Henüz bir hesabın yok mu?" : "Zaten bir hesabın var mı?"}
            <button
              className="ml-1.5 font-semibold text-purple-600 hover:text-purple-700 hover:underline focus:outline-none"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setEmail('');
                setPassword('');
                setUsername('');
              }}
            >
              {isLogin ? "Hemen Kayıt Ol" : "Giriş Yap"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}