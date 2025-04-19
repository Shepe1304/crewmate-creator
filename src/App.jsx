import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCrewmate from "./pages/CreateCrewmate";
import CrewmateGallery from "./pages/CrewmateGallery";
import CrewmateDetails from "./pages/CrewmateDetails";
import UpdateCrewmate from "./pages/UpdateCrewmate";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateCrewmate />} />
            <Route path="/gallery" element={<CrewmateGallery />} />
            <Route path="/crewmate/:id" element={<CrewmateDetails />} />
            <Route path="/update/:id" element={<UpdateCrewmate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
