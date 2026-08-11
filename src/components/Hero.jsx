import { usePortfolioData } from "../data/store";

function Hero() {
  const [data] = usePortfolioData();
  const { hero } = data;

  return (
    <header id="home" className="hero">
      <div className="hero-grid"></div>
      <div className="hero-inner">
        <div className="hero-left">
          <h1 className="glitch-title">
            <span className="glitch" data-text={hero.greeting}>
              {hero.greeting}
            </span>
            <span className="glitch name" data-text={hero.name}>
              {hero.name}
            </span>
          </h1>
          <p className="hero-role">
            {hero.role}
            <span className="caret">_</span>
          </p>
          <p className="hero-desc">{hero.desc}</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              Voir mes projets
            </a>
            <a href="#contact" className="btn btn-ghost">
              Me contacter
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="avatar-frame">
            <div className="avatar-glow"></div>
            <img src={hero.profileImage} alt="Photo de profil" />
            <div className="avatar-corner tl"></div>
            <div className="avatar-corner tr"></div>
            <div className="avatar-corner bl"></div>
            <div className="avatar-corner br"></div>
          </div>
          <p className="avatar-caption">$ whoami → yassal</p>
        </div>
      </div>
      <a href="#about" className="scroll-hint">
        ▼ défilez
      </a>
    </header>
  );
}

export default Hero;
