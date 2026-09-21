import { useEffect, useState } from "react";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, toggleTheme] = useTheme();

  useEffect(() => {
    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="navbar">
      <div className="scroll-progress" style={{ width: `${progress}%` }} />
      <a href="#home" className="logo">
        &gt;_YR
      </a>
      <ul className={`nav-links ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <button
            className="theme-toggle"
            onClick={() => {
              toggleTheme();
              setOpen(false);
            }}
            aria-label={theme === "dark" ? "Activer le mode jour" : "Activer le mode nuit"}
            title={theme === "dark" ? "Mode jour" : "Mode nuit"}
          >
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </li>
      </ul>
      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;