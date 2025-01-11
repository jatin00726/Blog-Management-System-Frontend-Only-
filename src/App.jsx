import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/HomePage";
import BlogDetails from "./pages/BlogDetails";
import AuthorDashboard from "./pages/AuthorDashboard";
import CreateEditBlog from "./pages/CreateEditBlog";
import LoginPage from "./pages/LoginPage"; // New login page import
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Header />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/blog/:id" element={<BlogDetails />} />
            <Route path="/dashboard" element={<AuthorDashboard />} />
            <Route path="/create" element={<CreateEditBlog />} />
            <Route path="/create/:id" element={<CreateEditBlog />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </AppProvider>
  );
};

export default App;
