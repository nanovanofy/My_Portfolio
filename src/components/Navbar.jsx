import { useState } from "react";
import { useTheme } from "../hooks/useTheme";

const LINKS = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#projects", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [theme, toggleTheme] = useTheme();

  return (
    <nav className="navbar">
      <a href="#home" className="logo">
        &gt;_Yassal
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