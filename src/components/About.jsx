import { useReveal } from "../hooks/useReveal";

const LINES = [
  [["c", "const"], [" ", "dev"], [" ", "= {"], [" ", ""]],
  [
    ["i", "  nom      : "],
    ["s", '"Nanovanofy Fabien"'],
    ["n", ","],
  ],
  [
    ["i", "  role     : "],
    ["s", '"Développeur Full-stack"'],
    ["n", ","],
  ],

  [
    ["i", "  stack    : ["],
    ["s", '"HTML"'],
    ["n", ","],
    ["s", '"CSS"'],
    ["n", ","],
    ["s", '"Boostrap"'],
    ["n", ", "],
    ["s", '"JS"'],
    ["n", ","],
    ["s", '"React"'],
  ],
  [
    ["n", ","],
    ["s", '"Express"'],
    ["n", ","],
    ["s", '"Node.js"'],
    ["n", ","],
    ["s", '"PHP"'],
    ["n", ","],
    ["s", '"MySQL,PostgreSQL"'],
    ["n", ","],
    ["s", '"Python"'],
    ["n", "]"],
  ],
  [
    ["i", "  "],
    ["a", "code"],
    ["n", ": () => "],
    ["s", '"clean & créatif"'],
  ],
  [["n", "};"]],
];

function CodeLine({ line }) {
  return (
    <>
      {line.map((tok, i) => {
        const [type, text] = tok;
        const clsMap = { c: "tk", k: "tk", s: "tk-s", i: "", a: "tk-fn", n: "tk" };
        return (
          <span key={i} className={clsMap[type]}>
            {text}
          </span>
        );
      })}
    </>
  );
}

function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">01</span>
        <h2>À propos</h2>
        <span className="section-line"></span>
      </div>
      <div className="about-grid">
        <div className="terminal-card">
          <div className="term-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <pre className="term-code">
            {LINES.map((line, i) => (
              <div key={i}>
                <CodeLine line={line} />
              </div>
            ))}
          </pre>
        </div>
        <div className="about-text">
          <p>
            Étudiant en L2 Informatique à l'École de Management et d'Innovation Technologique (EMIT),
            Université de Fianarantsoa, je suis passionné par le développement Full-Stack. 
            Curieux, autonome et motivé, Toujours motivé à apprendre de nouvelles technologies, 
            je cherche à développer des solutions innovantes tout en améliorant continuellement mes compétences.
          </p>
          <div className="about-chips">
              <span>HTML5</span>
              <span>CSS3</span>
              <span>JavaScript</span>
              <span>React</span>
              <span>Boostrap</span>
              <span>Git&Github</span>
              <span>Express</span>
              <span>Node.js</span>
              <span>PHP</span>
              <span>Python</span>
              <span>MySQL & PostgreSQL</span>
          </div>
          <a href="#" className="btn btn-ghost btn-sm">
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;