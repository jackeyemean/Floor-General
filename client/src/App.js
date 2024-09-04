import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";
import { CreatePlay } from "./pages/create-play";
import { SavedPlays } from "./pages/saved-plays";
import { DefensiveSchemes } from "./pages/defense-schemes";
import { OffensiveSchemes } from "./pages/offense-schemes";
import { Plays } from "./pages/plays";
import { Terminology } from "./pages/terminology";
import { NavBar } from "./components/navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/create-play" element={<CreatePlay />} />
          <Route path="/saved-plays" element={<SavedPlays />} />
          <Route path="/defensive-schemes" element={<DefensiveSchemes />} />
          <Route path="/offensive-schemes" element={<OffensiveSchemes />} />
          <Route path="/plays" element={<Plays />} />
          <Route path="/terminology" element={<Terminology />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
