import { useState } from "react";
import { usePortfolioData } from "../data/store";

function AdminAbout() {
  const [data, saveData] = usePortfolioData();
  const [about, setAbout] = useState(data.about);
  const [chip, setChip] = useState("");
  const [saved, setSaved] = useState(false);

  function set(field, value) {
    setAbout((a) => ({ ...a, [field]: value }));
    setSaved(false);
  }

  function addChip(e) {
    e.preventDefault();
    const value = chip.trim();
    if (!value || about.chips.includes(value)) return;
    setAbout((a) => ({ ...a, chips: [...a.chips, value] }));
    setChip("");
    setSaved(false);
  }

  function removeChip(c) {
    setAbout((a) => ({ ...a, chips: a.chips.filter((x) => x !== c) }));
    setSaved(false);
  }

  function save(e) {
    e.preventDefault();
    saveData({ ...data, about });
    setSaved(true);
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">À propos</h1>
      <p className="admin-sub">
        Le texte, les chips et le lien CV de la section « À propos ».
      </p>

      <form className="admin-panel" onSubmit={save}>
        <h2>Texte</h2>
        <div className="admin-field">
          <label>Texte (une ligne vide = nouveau paragraphe)</label>
          <textarea rows={6} value={about.text} onChange={(e) => set("text", e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Lien du CV</label>
          <input value={about.cvUrl} onChange={(e) => set("cvUrl", e.target.value)} />
        </div>
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn">
            Enregistrer
          </button>
          {saved && <span className="admin-saved">✓ enregistré</span>}
        </div>
      </form>

      <form className="admin-panel" onSubmit={addChip}>
        <h2>Chips</h2>
        <div className="admin-field admin-field-inline">
          <input
            placeholder="Ajouter une chip..."
            value={chip}
            onChange={(e) => setChip(e.target.value)}
          />
          <button type="submit" className="admin-btn">
            + Ajouter
          </button>
        </div>
        <div className="admin-chips">
          {about.chips.map((c) => (
            <span className="admin-chip" key={c}>
              {c}
              <button type="button" onClick={() => removeChip(c)} title="Supprimer">
                ×
              </button>
            </span>
          ))}
          {about.chips.length === 0 && <p className="admin-empty">Aucune chip.</p>}
        </div>
        <div className="admin-form-actions">
          <button type="button" className="admin-btn" onClick={save}>
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminAbout;
