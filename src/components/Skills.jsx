import { useReveal } from "../hooks/useReveal";
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
import postgresql from "../assets/postgresql.png";

const SKILLS = [
  { imgs: [html], name: "HTML5", desc: "Sémantique, structure, responsive." },
  { imgs: [css3], name: "CSS3", desc: "Flexbox, grid, animations, responsive." },
  { imgs: [js], name: "JavaScript", desc: "ES6+, DOM, async, fonctionnel." },
  { imgs: [atom], name: "React", desc: "Composants, hooks, état, SPA." },
  { imgs: [bootstrap], name: "Bootstrap", desc: "Design responsive rapide, composants." },
  { imgs: [git, github], name: "Git & GitHub", desc: "Workflow, branches, collaboration, CI." },
  { imgs: [express], name: "Express", desc: "API REST, middleware, serveur Node." },
  { imgs: [nodejs], name: "Node.js", desc: "API REST, scripts, outils CLI." },
  { imgs: [php], name: "PHP", desc: "Backend, sessions, formulaires, SQL." },
  { imgs: [python], name: "Python", desc: "Scripts, automatisation, analyse." },
  { imgs: [mysql, postgresql], name: "MySQL & PostgreSQL", desc: "Conception, requêtes, optimisation." },
];

function Skills() {
  const ref = useReveal();

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">02</span>
        <h2>Compétences</h2>
        <span className="section-line"></span>
      </div>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div className="skill-card" key={s.name}>
            <div className="skill-top">
              <span className="skill-icon">
                {s.imgs.map((src, i) => (
                  <img key={i} src={src} alt={`${s.name} logo ${i + 1}`} />
                ))}
              </span>
            </div>
            <h3>{s.name}</h3>
            <p className="skill-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;