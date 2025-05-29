import Layout from '../components/layout';
import { FiUser, FiEdit, FiMoon, FiBookOpen, FiPlayCircle, FiBell, FiShield, FiHelpCircle, FiInfo, FiLogOut,FiChevronRight} from 'react-icons/fi';
import avatarUrl from "../assets/avatar.png";
const userProfile = {
  name: "Barış",
  email: "baris@example.com",
  dreamCount: 28,
  storyCount: 15,
  gamesPlayed: 7,
  joinDate: "Mayıs 2024",
};

export default function ProfilePage() {

  const navigateTo = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    console.log("Çıkış yapılıyor...");
    navigateTo('/login');
  };

  const statItems = [
    { label: "Rüya Kaydı", value: userProfile.dreamCount, Icon: FiMoon, color: "text-indigo-500", bgColor: "bg-indigo-100" },
    { label: "Hikaye", value: userProfile.storyCount, Icon: FiBookOpen, color: "text-purple-500", bgColor: "bg-purple-100" },
    { label: "Oyun", value: userProfile.gamesPlayed, Icon: FiPlayCircle, color: "text-teal-500", bgColor: "bg-teal-100" },
  ];

  const settingsMenu = [
    { label: "Hesap Bilgileri", Icon: FiUser, path: "/profile/edit-account" },
    { label: "Şifre Değiştir", Icon: FiShield, path: "/profile/change-password" },
    { label: "Bildirim Ayarları", Icon: FiBell, path: "/profile/notifications" },
  ];

  const aboutMenu = [
    { label: "Destek & Yardım", Icon: FiHelpCircle, path: "/support" },
    { label: "Uygulama Hakkında", Icon: FiInfo, path: "/about" },
  ];

  return (
    <Layout>
      <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-100 to-violet-100 min-h-screen overflow-y-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">Profilim</h1>
          <p className="text-slate-500 mt-1">LucidVerse yolculuğunu buradan yönet.</p>
        </header>

        {/* Profil Bilgileri Kartı */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl mb-10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <img
              src={avatarUrl}
              alt={userProfile.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-violet-300 object-cover shadow-lg"
            />
            <button
              onClick={() => alert("Profil resmi düzenleme özelliği yakında!")}
              className="absolute -bottom-1 -right-1 bg-violet-500 hover:bg-violet-600 text-white p-2.5 rounded-full shadow-md transition-transform transform hover:scale-110"
            >
              <FiEdit size={16} />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">{userProfile.name}</h2>
            <p className="text-slate-500 text-sm">{userProfile.email}</p>
            <p className="text-xs text-slate-400 mt-1">Katılım Tarihi: {userProfile.joinDate}</p>
          </div>
        </div>

        {/* İstatistikler */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold text-slate-700 mb-4">Rüya İstatistiklerin</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {statItems.map((item, index) => (
              <div key={index} className={`p-5 rounded-xl shadow-lg flex flex-col items-center ${item.bgColor}`}>
                <div className={`p-3 rounded-full bg-white mb-3 shadow`}>
                  <item.Icon size={24} className={item.color} />
                </div>
                <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-sm text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ayarlar ve Bilgi Menüleri */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 px-1">Ayarlar</h3>
            <div className="bg-white rounded-xl shadow-lg">
              {settingsMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo(item.path)}
                  className={`w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${index === 0 ? 'rounded-t-xl' : ''} ${index === settingsMenu.length - 1 ? 'border-b-0 rounded-b-xl' : 'border-b border-slate-200'}`}
                >
                  <item.Icon size={20} className="text-slate-500" />
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <FiChevronRight size={20} className="text-slate-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-700 mb-3 px-1">Hakkında</h3>
            <div className="bg-white rounded-xl shadow-lg">
              {aboutMenu.map((item, index) => (
                <button
                  key={index}
                  onClick={() => navigateTo(item.path)}
                  className={`w-full text-left flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${index === 0 ? 'rounded-t-xl' : ''} ${index === aboutMenu.length - 1 ? 'border-b-0 rounded-b-xl' : 'border-b border-slate-200'}`}
                >
                  <item.Icon size={20} className="text-slate-500" />
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <FiChevronRight size={20} className="text-slate-400 ml-auto" />
                </button>
              ))}
            </div>
          </div>

          {/* Çıkış Yap Butonu */}
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center gap-3 bg-red-50 hover:bg-red-100 text-red-600 px-5 py-3.5 rounded-xl font-semibold shadow-sm hover:shadow-md transition-all"
          >
            <FiLogOut size={20} />
            Çıkış Yap
          </button>
        </div>

      </div>
    </Layout>
  );
}