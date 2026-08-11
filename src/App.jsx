import { useState, useEffect, useCallback } from "react";
import BootOverlay from "./components/BootOverlay";
import GlitchCanvas from "./components/GlitchCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminProjects from "./admin/AdminProjects";
import AdminSkills from "./admin/AdminSkills";
import AdminAbout from "./admin/AdminAbout";
import AdminHero from "./admin/AdminHero";
import AdminContact from "./admin/AdminContact";
import { flashGlitch } from "./glitch";
import { useHashRoute, isAdminRoute } from "./router";

function AdminApp({ path }) {
  let content;
  if (path.startsWith("/admin/projets")) content = <AdminProjects />;
  else if (path.startsWith("/admin/competences")) content = <AdminSkills />;
  else if (path.startsWith("/admin/a-propos")) content = <AdminAbout />;
  else if (path.startsWith("/admin/hero")) content = <AdminHero />;
  else if (path.startsWith("/admin/contact")) content = <AdminContact />;
  else content = <AdminDashboard />;

  return <AdminLayout path={path}>{content}</AdminLayout>;
}

function Site() {
  const [booted, setBooted] = useState(false);

  const handleBootDone = useCallback(() => {
    document.body.classList.remove("lock");
    setBooted(true);
  }, []);

  useEffect(() => {
    document.body.classList.add("lock");
    return () => document.body.classList.remove("lock");
  }, []);

  useEffect(() => {
    let last = 0;
    function onScroll() {
      const now = Date.now();
      if (now - last > 700 && Math.random() < 0.18) {
        last = now;
        flashGlitch(3, 60);
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {!booted && <BootOverlay onDone={handleBootDone} />}
      <GlitchCanvas />
      <div className="scanlines"></div>

      <Navbar />
      <Hero />
      <main>
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="footer">
        <p className="footer-meta">©copyright 2026·Yassal Rakinsis</p>
      </footer>
    </>
  );
}

function App() {
  const path = useHashRoute();

  if (isAdminRoute(path)) {
    return <AdminApp path={path} />;
  }
  return <Site />;
}

export default App;
