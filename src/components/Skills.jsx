import { useReveal } from "../hooks/useReveal";
import { usePortfolioData } from "../data/store";

function Skills() {
  const ref = useReveal();
  const [data] = usePortfolioData();

  return (
    <section id="skills" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">02</span>
        <h2>Compétences</h2>
        <span className="section-line"></span>
      </div>
      <div className="skills-grid">
        {data.skills.map((s) => (
          <div className="skill-card" key={s.id}>
            <div className="skill-top">
              <span className="skill-icon">
                {s.image ? (
                  <img src={s.image} alt={`${s.name} logo`} />
                ) : (
                  <span className="skill-fallback">{s.name.slice(0, 1).toUpperCase()}</span>
                )}
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
