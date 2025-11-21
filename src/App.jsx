import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/navbar";

import Home from "./pages/Homepage";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import GalleryPage from "./pages/GalleryPage";
import AdminGate from "./pages/AdminGate";
import Upload from "./pages/upload";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          {/* PUBLIC PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* ADMIN ENTRY (Password Protected) */}
          <Route path="/admin" element={<AdminGate />} />

          {/* ADMIN UPLOAD PANEL */}
          <Route path="/upload" element={<Upload />} />

          {/* UNKNOWN ROUTES */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;