import { useReveal } from "../hooks/useReveal";
import { flashGlitch } from "../glitch";

const PROJECTS = [
  {
    bg: "linear-gradient(135deg,#0f0f13,#1a2e1a)",
    code: "$ npm run portfolio",
    ok: "✓ ready in 0.42s",
    tags: ["HTML", "CSS", "JS"],
    title: "Terminal Portfolio",
    desc: "Portfolio interactif en style terminal avec commandes, historique et effets glitch.",
  },
  {
    bg: "linear-gradient(135deg,#0f0f13,#16233a)",
    code: "$ glitch-ui --init",
    ok: "✓ 12 composants générés",
    tags: ["CSS", "Library"],
    title: "Glitch UI",
    desc: "Mini-librairie d'effets glitch et animations réutilisables pour sites web.",
  },
  {
    bg: "linear-gradient(135deg,#0f0f13,#2a1a3a)",
    code: "$ task-cli list",
    ok: "✓ 3 tâches terminées",
    tags: ["Node.js", "CLI"],
    title: "Task CLI",
    desc: "Gestionnaire de tâches en ligne de commande avec stockage JSON et export.",
  },
];

function Projects() {
  const ref = useReveal();

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">03</span>
        <h2>Projets</h2>
        <span className="section-line"></span>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((p) => (
          <article
            className="project-card"
            key={p.title}
            onMouseEnter={() => flashGlitch(2, 55)}
          >
            <div className="project-thumb" style={{ background: p.bg }}>
              <div className="thumb-code">
                {p.code}
                <br />
                <span className="thumb-ok">{p.ok}</span>
              </div>
            </div>
            <div className="project-body">
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-links">
                <a href="#" target="_blank" rel="noreferrer">
                  démo →
                </a>
                <a href="#" target="_blank" rel="noreferrer">
                  code ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Projects;