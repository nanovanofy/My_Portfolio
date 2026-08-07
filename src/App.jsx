import { useState, useEffect, useCallback } from "react";
import BootOverlay from "./components/BootOverlay";
import GlitchCanvas from "./components/GlitchCanvas";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { flashGlitch } from "./glitch";

function App() {
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

export default App;