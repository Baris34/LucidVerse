import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md flex flex-col gap-4">
        <h1 className="text-indigo-600 font-bold text-xl mb-4">LucidVerse</h1>
        <Link to="/" className="hover:text-indigo-500">🏠 Ana Sayfa</Link>
        <Link to="/dream" className="hover:text-indigo-500">🌙 Rüya Analizi</Link>
        <Link to="/story" className="hover:text-indigo-500">📖 Hikayeler</Link>
        <Link to="/game" className="hover:text-indigo-500">🎮 Oyunlar</Link>
        <Link to="/profile" className="hover:text-indigo-500">👤 Profil</Link>
      </div>

      {/* Sayfa içeriği */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
