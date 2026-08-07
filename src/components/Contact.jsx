import { useState } from "react";
import { useReveal } from "../hooks/useReveal";
import email from "../assets/email.png";
import mobile from "../assets/mobile.png";
import github from "../assets/github.png";
import facebook from "../assets/facebook.png";

function Contact() {
  const ref = useReveal();
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("✓ message envoyé ! je vous réponds rapidement.");
    e.currentTarget.reset();
    setTimeout(() => setStatus(""), 5000);
  }

  return (
    <section id="contact" className="section reveal" ref={ref}>
      <div className="section-head">
        <span className="section-num">04</span>
        <h2>Contact</h2>
        <span className="section-line"></span>
      </div>
      <div className="contact-grid">
        <div className="contact-info">
          <h3>Travaillons ensemble</h3>
          <p>
            Vous avez un projet ? Envoyez-moi un message, je réponds rapidement.
          </p>
          <div className="contact-item">
            <span className="ci-icon"><img src={email} alt="icon email" /></span>
            <div>
              <small>email</small>
              <a href="mailto:nanovanofyrakinsis@gmail.com">nanovanofyrakinsis@gmail.com</a>
            </div>
          </div>
          <div className="contact-item">
            <span className="ci-icon"><img src={github} alt="icon github" /></span>
            <div>
              <small>github</small>
              <a href="https://github.com/nanovanofy" target="_blank" rel="noreferrer">
                github.com/nanovanofy
              </a>
            </div>
          </div>
          <div className="contact-item">
            <span className="ci-icon"><img src={mobile} alt="icon phone" /></span>
            <div>
              <small>Telephone</small>
              <a href="" target="_blank" rel="noreferrer">
                +261387556687
              </a>
            </div>
          </div>
           <div className="contact-item">
            <span className="ci-icon"><img src={facebook} alt="icon fb" /></span>
            <div>
              <small>Facebook</small>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Nanovanofy Fabien 
              </a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="cf-name">nom</label>
            <input type="text" id="cf-name" placeholder="Votre nom" required />
          </div>
          <div className="form-field">
            <label htmlFor="cf-email">email</label>
            <input type="email" id="cf-email" placeholder="vous@exemple.com" required />
          </div>
          <div className="form-field">
            <label htmlFor="cf-msg">message</label>
            <textarea
              id="cf-msg"
              rows="5"
              placeholder="Parlez-moi de votre projet..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Envoyer
          </button>
          <p className="form-status">{status}</p>
        </form>
      </div>
    </section>
  );
}

export default Contact;