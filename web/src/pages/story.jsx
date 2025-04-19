import { useEffect, useState } from "react";
import Layout from "../components/layout";
export default function StoryPage() {
  const [input, setInput] = useState("");
  const [currentStory, setCurrentStory] = useState(null);
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/stories")
      .then((res) => res.json())
      .then((data) => setStories(data.slice(0, 5)))
      .catch((err) => console.error("Hikayeler alınamadı", err));
  }, []);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    const res = await fetch("http://localhost:5000/generate-story", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input }),
    });

    const data = await res.json();
    setCurrentStory(data);
    setInput("");
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">AI Destekli Hikaye Üretici</h1>

        <textarea
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
          rows={5}
          placeholder="Bir rüya metni girin..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>

        <button
          onClick={handleGenerate}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white py-3 rounded-xl font-semibold mb-6"
        >
          Hikaye Üret
        </button>

        {currentStory && (
          <div className="bg-purple-100 p-6 rounded-2xl shadow-inner mb-8">
            <h2 className="text-2xl font-bold text-purple-700">{currentStory.title}</h2>
            <p className="mt-3 text-gray-700 whitespace-pre-wrap leading-relaxed">{currentStory.story}</p>
            <p className="italic mt-4 text-sm text-purple-600">Ana Tema: {currentStory.theme}</p>
          </div>
        )}

        <h2 className="text-xl font-semibold text-gray-800 mb-4">Eski Hikayeler</h2>
        <div className="space-y-4">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-gray-100 p-5 rounded-xl shadow-sm hover:bg-gray-200 hover:shadow-md transition cursor-pointer"
              onClick={() => (window.location.href = `/story/${story.id}`)}
            >
              <h3 className="font-bold text-gray-800">{story.title}</h3>
              <p className="text-sm text-gray-600 mt-1">Ana Tema: {story.theme}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
}
