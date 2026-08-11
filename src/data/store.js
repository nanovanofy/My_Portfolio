import { useEffect, useState } from "react";
import profileImg from "../assets/profile.jpg";
import html from "../assets/html.png";
import css3 from "../assets/css-3.png";
import js from "../assets/js.png";
import atom from "../assets/atom.png";
import bootstrap from "../assets/bootstrap.png";
import git from "../assets/git.png";
import github from "../assets/github.png";
import express from "../assets/express.png";
import nodejs from "../assets/nodejs.png";
import php from "../assets/php.png";
import python from "../assets/python.png";
import mysql from "../assets/mysql.png";
import emailIcon from "../assets/email.png";
import mobile from "../assets/mobile.png";
import facebook from "../assets/facebook.png";

const STORAGE_KEY = "portfolio_data_v1";
const CHANGE_EVENT = "portfolio-data-changed";

let cache = null;

export const DEFAULT_DATA = {
  hero: {
    greeting: "Bonjour, je suis",
    name: "Nanovanofy Fabien",
    role: "Développeur Full-stack",
    desc: "J'aime transformer des idées en applications web modernes, sécurisées et intuitives grâce aux technologies du développement web.",
    profileImage: profileImg,
  },
  about: {
    text: "Étudiant en L2 Informatique à l'École de Management et d'Innovation Technologique (EMIT), Université de Fianarantsoa, je suis passionné par le développement Full-Stack.\nCurieux, autonome et motivé, Toujours motivé à apprendre de nouvelles technologies, je cherche à développer des solutions innovantes tout en améliorant continuellement mes compétences.",
    chips: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React",
      "Boostrap",
      "Git&Github",
      "Express",
      "Node.js",
      "PHP",
      "Python",
      "MySQL & PostgreSQL",
    ],
    cvUrl: "",
  },
  skills: [
    { id: "sk1", name: "HTML5", desc: "Sémantique, structure, responsive.", image: html },
    { id: "sk2", name: "CSS3", desc: "Flexbox, grid, animations, responsive.", image: css3 },
    { id: "sk3", name: "JavaScript", desc: "ES6+, DOM, async, fonctionnel.", image: js },
    { id: "sk4", name: "React", desc: "Composants, hooks, état, SPA.", image: atom },
    { id: "sk5", name: "Bootstrap", desc: "Design responsive rapide, composants.", image: bootstrap },
    { id: "sk6", name: "Git & GitHub", desc: "Workflow, branches, collaboration, CI.", image: git },
    { id: "sk7", name: "Express", desc: "API REST, middleware, serveur Node.", image: express },
    { id: "sk8", name: "Node.js", desc: "API REST, scripts, outils CLI.", image: nodejs },
    { id: "sk9", name: "PHP", desc: "Backend, sessions, formulaires, SQL.", image: php },
    { id: "sk10", name: "Python", desc: "Scripts, automatisation, analyse.", image: python },
    { id: "sk11", name: "MySQL & PostgreSQL", desc: "Conception, requêtes, optimisation.", image: mysql },
  ],
  projects: [
    {
      id: "pj1",
      title: "Terminal Portfolio",
      desc: "Portfolio interactif en style terminal avec commandes, historique et effets glitch.",
      image: "",
      video: "",
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: "pj2",
      title: "Glitch UI",
      desc: "Mini-librairie d'effets glitch et animations réutilisables pour sites web.",
      image: "",
      video: "",
      demoUrl: "",
      codeUrl: "",
    },
    {
      id: "pj3",
      title: "Task CLI",
      desc: "Gestionnaire de tâches en ligne de commande avec stockage JSON et export.",
      image: "",
      video: "",
      demoUrl: "",
      codeUrl: "",
    },
  ],
  contact: {
    email: "nanovanofyrakinsis@gmail.com",
    github: "https://github.com/nanovanofy",
    phone: "+261387556687",
    facebookName: "Nanovanofy Fabien",
    facebookUrl: "https://facebook.com",
    emailIcon,
    mobileIcon: mobile,
    githubIcon: github,
    facebookIcon: facebook,
  },
};

function mergeDefaults(saved) {
  if (!saved || typeof saved !== "object") return structuredClone(DEFAULT_DATA);
  return {
    hero: { ...DEFAULT_DATA.hero, ...(saved.hero || {}) },
    about: { ...DEFAULT_DATA.about, ...(saved.about || {}) },
    skills: Array.isArray(saved.skills)
      ? saved.skills.map((s, i) => ({
          id: s.id || `sk_${i}`,
          name: s.name || "Compétence",
          desc: s.desc || "",
          image: s.image || "",
        }))
      : structuredClone(DEFAULT_DATA.skills),
    projects: Array.isArray(saved.projects)
      ? saved.projects.map((p, i) => ({
          id: p.id || `pj_${i}`,
          title: p.title || "Sans titre",
          desc: p.desc || "",
          image: p.image || "",
          video: p.video || "",
          demoUrl: p.demoUrl || "",
          codeUrl: p.codeUrl || "",
        }))
      : structuredClone(DEFAULT_DATA.projects),
    contact: { ...DEFAULT_DATA.contact, ...(saved.contact || {}) },
  };
}

export function loadData() {
  if (cache) return cache;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cache = mergeDefaults(raw ? JSON.parse(raw) : null);
  } catch {
    cache = structuredClone(DEFAULT_DATA);
  }
  return cache;
}

export function saveData(data) {
  cache = data;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
      return true;
    } catch {
      return false;
    }
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  return true;
}

export function resetData() {
  cache = structuredClone(DEFAULT_DATA);
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorer
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
  return cache;
}

export function usePortfolioData() {
  const [data, setData] = useState(loadData);

  useEffect(() => {
    function onChange() {
      setData(loadData());
    }
    window.addEventListener(CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CHANGE_EVENT, onChange);
  }, []);

  return [data, saveData, resetData];
}

export function uid() {
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
