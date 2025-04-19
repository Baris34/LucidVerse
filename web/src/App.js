import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Dream from "./pages/dream";
import Game from "./pages/game";
import Story from "./pages/story";
import StoryDetail from "./pages/story/[id]";
import Profile from "./pages/profile";
import Auth from "./pages/auth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dream" element={<Dream />} />
        <Route path="/story" element={<Story />} />
        <Route path="/story/:id" element={<StoryDetail />} />
        <Route path="/game" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
