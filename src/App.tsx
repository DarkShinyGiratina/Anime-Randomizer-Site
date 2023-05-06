import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import MainRandomizer from "./pages/MainRandomizer";
import Loading from "./pages/Loading";
import Output from "./pages/Output";
import Options from "./pages/Options";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainRandomizer />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/output" element={<Output />} />
        <Route path="/options" element={<Options />} />
      </Routes>
    </Router>
  );
}

export default App;
