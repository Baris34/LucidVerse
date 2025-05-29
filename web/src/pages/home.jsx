import Layout from "../components/layout";


import { FiMoon, FiEdit3, FiPlay,} from 'react-icons/fi';

export default function Home() {

    const userName = "Barış";

    const navigateToPage = (path) => {
        window.location.href = path; 
    };

    const features = [
        {
            title: "Rüya Analizi",
            description: "Rüyanı yaz, derinlemesine analizini gör ve sana özel oyun önerisi al.",
            icon: <FiMoon size={32} className="text-indigo-500" />,
            buttonText: "Analiz Et",
            path: "/dream",
            bgColor: "bg-indigo-50",
            buttonColor: "bg-indigo-500 hover:bg-indigo-600",
        },
        {
            title: "Hikaye Üret",
            description: "Rüyalarından veya kelimelerinden ilham alarak eşsiz hikayeler oluştur.",
            icon: <FiEdit3 size={32} className="text-purple-500" />,
            buttonText: "Hikaye Oluştur",
            path: "/story",
            bgColor: "bg-purple-50",
            buttonColor: "bg-purple-500 hover:bg-purple-600",
        },
        {
            title: "Dream Runner",
            description: "Rüya temanla eşleşen, bilinçaltının derinliklerinde keyifli bir koşu.",
            icon: <FiPlay size={32} className="text-teal-500" />,
            buttonText: "Oyunu Oyna",
            path: "/game", 
            bgColor: "bg-teal-50",
            buttonColor: "bg-teal-500 hover:bg-teal-600",
        },
    ];

    return (
        <Layout>
            <div className="flex-1 p-6 sm:p-10 bg-gradient-to-br from-slate-50 to-violet-100 min-h-screen">
                <header className="flex justify-between items-center mb-8 sm:mb-12">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800">
                            Hoş Geldin, <span className="text-violet-600">{userName}</span> 👋
                        </h1>
                        <p className="text-slate-500 mt-1 text-sm sm:text-base">LucidVerse'deki yeni maceralarını keşfet!</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between ${feature.bgColor}`}
                        >
                            <div>
                                <div className="flex items-center mb-4">
                                    <div className="p-3 bg-white rounded-full shadow-md mr-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-slate-700">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-slate-600 mb-5 leading-relaxed">{feature.description}</p>
                            </div>
                            {feature.illustration && (
                                <img src={feature.illustration} alt={feature.title} className="w-full h-40 object-contain mb-5 rounded-lg"/>
                            )}
                            {/* Eğer react-router-dom kullanıyorsanız Link component'i ile:
                            <Link to={feature.path}>
                                <span className={`block w-full text-center ${feature.buttonColor} text-white px-5 py-3 rounded-lg font-semibold text-sm transition-transform transform hover:scale-105`}>
                                    {feature.buttonText}
                                </span>
                            </Link>
                            */}
                            <button
                                onClick={() => navigateToPage(feature.path)}
                                className={`block w-full text-center ${feature.buttonColor} text-white px-5 py-3 rounded-lg font-semibold text-sm transition-transform transform hover:scale-105`}
                            >
                                {feature.buttonText}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold text-slate-700 mb-6">Son Etkileşimlerin</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <p className="text-sm text-slate-500 mb-1">Son Analiz Edilen Rüya</p>
                            <h4 className="font-medium text-slate-800">Kayıp Anahtar ve Gizemli Kapı</h4>
                        </div>
                        <div className="bg-white p-5 rounded-xl shadow-md">
                            <p className="text-sm text-slate-500 mb-1">Son Oluşturulan Hikaye</p>
                            <h4 className="font-medium text-slate-800">Yıldız Tozu Macerası</h4>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}