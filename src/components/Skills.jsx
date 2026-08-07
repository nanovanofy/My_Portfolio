import { useReveal } from "../hooks/useReveal";

const SKILLS = [
  { icon: "◇", name: "HTML & CSS", desc: "Sémantique, responsive, animations avancées." },
  { icon: "▶", name: "JavaScript", desc: "ES6+, DOM, async, fonctionnel." },
  { icon: "⚛", name: "React", desc: "Composants, hooks, état, SPA." },
  { icon: "▦", name: "UI / UX Design", desc: "Figma, maquettes, prototypage, design system." },
  { icon: "⤳", name: "Node.js", desc: "API REST, scripts, outils CLI." },
  { icon: "§", name: "Git & GitHub", desc: "Workflow, branches, collaboration, CI." },
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
              <span className="skill-icon">{s.icon}</span>
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