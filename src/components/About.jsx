import { useReveal } from "../hooks/useReveal";
import { usePortfolioData } from "../data/store";

function buildLines(name, role, stack) {
  return [
    [["c", "const"], [" ", "dev"], [" ", "= {"], [" ", ""]],
    [
      ["i", "  nom      : "],
      ["s", `"${name}"`],
      ["n", ","],
    ],
    [
      ["i", "  role     : "],
      ["s", `"${role}"`],
      ["n", ","],
    ],
    [
      ["i", "  stack    : ["],
      ...stack.flatMap((s, i) => [
        ["s", `"${s}"`],
        ["n", i === stack.length - 1 ? "" : ", "],
      ]),
    ],
    [
      ["i", "  "],
      ["a", "code"],
      ["n", ": () => "],
      ["s", '"clean & créatif"'],
    ],
    [["n", "};"]],
  ];
}

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
  const [data] = usePortfolioData();
  const { hero, about } = data;
  const lines = buildLines(
    hero.name,
    hero.role,
    data.skills.map((s) => s.name)
  );
  const paragraphs = about.text.split(/\n+/).filter(Boolean);

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
            {lines.map((line, i) => (
              <div key={i}>
                <CodeLine line={line} />
              </div>
            ))}
          </pre>
        </div>
        <div className="about-text">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="about-chips">
            {about.chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <a
            href={about.cvUrl || "#"}
            className="btn btn-ghost btn-sm"
            target={about.cvUrl ? "_blank" : undefined}
            rel={about.cvUrl ? "noreferrer" : undefined}
          >
            Télécharger mon CV
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;
