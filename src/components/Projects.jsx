import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import { flashGlitch } from "../glitch";
import { usePortfolioData } from "../data/store";
import VideoModal from "./VideoModal";

function Projects() {
  const ref = useReveal();
  const [data] = usePortfolioData();
  const [openVideo, setOpenVideo] = useState(null);

  return (
    <section id="projects" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">03</span>
        <h2>Projets</h2>
        <span className="section-line"></span>
      </div>
      <div className="projects-grid">
        {data.projects.map((p) => (
          <article
            className="project-card"
            key={p.id}
            onMouseEnter={() => flashGlitch(2, 55)}
          >
            <div className="project-thumb">
              {p.image ? (
                <img className="project-img" src={p.image} alt={p.title} />
              ) : (
                <div className="thumb-code">
                  {p.title}
                  <br />
                  <span className="thumb-ok">● en ligne</span>
                </div>
              )}
              {p.video && (
                <button
                  className="project-play"
                  onClick={() => setOpenVideo({ video: p.video, title: p.title })}
                  aria-label={`Regarder la démo de ${p.title}`}
                >
                  ▶
                </button>
              )}
              {(p.video || p.demoUrl) && (
                <a
                  className="project-live"
                  href={!p.video && p.demoUrl ? p.demoUrl : undefined}
                  target={!p.video && p.demoUrl ? "_blank" : undefined}
                  rel="noreferrer"
                  onClick={(e) => {
                    if (p.video) {
                      e.preventDefault();
                      setOpenVideo({ video: p.video, title: p.title });
                    }
                  }}
                  title={p.video ? "Regarder la démo vidéo" : "Voir la démo en direct"}
                >
                  <span className="live-dot"></span> live{p.video ? " ▶" : ""}
                </a>
              )}
            </div>
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="project-links">
                {p.video ? (
                  <button
                    className="link-btn"
                    onClick={() => setOpenVideo({ video: p.video, title: p.title })}
                  >
                    démo ▶
                  </button>
                ) : (
                  <a
                    href={p.demoUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={!p.demoUrl ? "is-disabled" : ""}
                  >
                    démo →
                  </a>
                )}
                <a href={p.codeUrl || "#"} target="_blank" rel="noreferrer">
                  code ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {openVideo && (
        <VideoModal
          video={openVideo.video}
          title={openVideo.title}
          onClose={() => setOpenVideo(null)}
        />
      )}
    </section>
  );
}

export default Projects;