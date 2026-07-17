import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Resume from "./pages/Resume";
import Chat from "./pages/Chat";
import Interview from "./pages/Interview";
import History from "./pages/History";
import Analytics from "./pages/Analytics";

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/chat"
          element={<Chat />}
        />

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;