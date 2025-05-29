import { NavLink, Link} from "react-router-dom";
import { FiHome, FiMoon, FiBookOpen, FiPlayCircle, FiUser, FiLogOut } from 'react-icons/fi';


export default function Layout({ children }) {
  const navItems = [
    { name: "Ana Sayfa", path: "/home", Icon: FiHome },
    { name: "Rüya Analizi", path: "/dream", Icon: FiMoon },
    { name: "Hikayeler", path: "/story", Icon: FiBookOpen },
    { name: "Oyunlar", path: "/game", Icon: FiPlayCircle }, 
  ];

  const handleLogout = () => {
    console.log("Çıkış yapılıyor...");
    window.location.href = '/';
  };

  return (
    <div className="flex h-screen bg-slate-100"> {/* Ana sayfa ile uyumlu arka plan */}
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-violet-700 to-indigo-800 text-slate-100 p-6 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Logo ve Uygulama Adı */}
          <Link to="/home" className="flex items-center gap-3 mb-10 group">
            {/* <img src={AppLogo} alt="LucidVerse Logo" className="h-10 w-10" /> */}
            <div className="p-2 bg-white/20 rounded-lg"> {/* Logo için arka plan */}
                 <FiMoon size={24} className="text-violet-300 group-hover:text-white transition-colors" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight group-hover:text-violet-200 transition-colors">
              Lucid<span className="font-light">Verse</span>
            </h1>
          </Link>

          {/* Navigasyon Linkleri */}
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                   hover:bg-white/20 hover:text-white group
                   ${isActive
                     ? "bg-white/25 text-white shadow-md font-semibold"
                     : "text-violet-200 hover:text-white"
                   }`
                }
              >
                <item.Icon size={20} className="opacity-80 group-hover:opacity-100 transition-opacity" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Alt Kısım */}
        <div className="mt-auto pt-6 border-t border-white/20">
          <button
            onClick={() => window.location.href = "/profile"}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-violet-200 hover:bg-white/20 hover:text-white transition-colors group mb-2"
          >
            <FiUser size={20} className="opacity-80 group-hover:opacity-100" />
            <span>Profil</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-300 hover:bg-red-700/50 hover:text-white transition-colors group"
          >
            <FiLogOut size={20} className="opacity-80 group-hover:opacity-100" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Sayfa İçeriği */}
      <main className="flex-1 overflow-y-auto"> {/* Dikeyde scroll */}
        {children}
      </main>
    </div>
  );
}