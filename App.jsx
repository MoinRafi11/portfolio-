import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import HomePage from "./HomePage";
import AboutPage from "./AboutPage";
import SkillsPage from "./SkillsPage";
import ContactPage from "./ContactPage";
import AuthPage from "./AuthPage";
import AdminPage from "./AdminPage";
import { apiRequest } from "./api";
import { fallbackPortfolio } from "./fallbackContent";
import "./globals.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [portfolio, setPortfolio] = useState(fallbackPortfolio);
  const [contentStatus, setContentStatus] = useState("loading");
  const [authUser, setAuthUser] = useState(() => {
    const role = localStorage.getItem("portfolioUserRole");
    const name = localStorage.getItem("portfolioUserName");
    return role ? { role, name } : null;
  });

  const refreshPortfolio = async () => {
    try {
      const data = await apiRequest("/portfolio");
      setPortfolio({
        profile: data.profile || fallbackPortfolio.profile,
        projects: data.projects?.length ? data.projects : fallbackPortfolio.projects,
        skillCategories: data.skillCategories?.length ? data.skillCategories : fallbackPortfolio.skillCategories,
        services: data.services?.length ? data.services : fallbackPortfolio.services,
        timeline: data.timeline?.length ? data.timeline : fallbackPortfolio.timeline,
      });
      setContentStatus("ready");
    } catch {
      setPortfolio(fallbackPortfolio);
      setContentStatus("offline");
    }
  };

  useEffect(() => {
    refreshPortfolio();
  }, []);

  const navigate = (page) => {
    if (page === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsTransitioning(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":     return <HomePage navigate={navigate} portfolio={portfolio} />;
      case "about":    return <AboutPage navigate={navigate} portfolio={portfolio} />;
      case "skills":   return <SkillsPage navigate={navigate} portfolio={portfolio} />;
      case "contact":  return <ContactPage portfolio={portfolio} />;
      case "login":    return <AuthPage mode="login" navigate={navigate} onAuthChange={setAuthUser} />;
      case "signup":   return <AuthPage mode="signup" navigate={navigate} onAuthChange={setAuthUser} />;
      case "admin":    return <AdminPage navigate={navigate} portfolio={portfolio} refreshPortfolio={refreshPortfolio} onAuthChange={setAuthUser} />;
      default:         return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="app-root">
      <Header currentPage={currentPage} navigate={navigate} contentStatus={contentStatus} authUser={authUser} onAuthChange={setAuthUser} />
      <main className={`page-main ${isTransitioning ? "page-exit" : "page-enter"}`}>
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
