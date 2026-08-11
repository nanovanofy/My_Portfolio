import { useState } from "react";
import { usePortfolioData } from "../data/store";

function AdminHero() {
  const [data, saveData] = usePortfolioData();
  const [hero, setHero] = useState(data.hero);
  const [saved, setSaved] = useState(false);

  function set(field, value) {
    setHero((h) => ({ ...h, [field]: value }));
    setSaved(false);
  }

  function save(e) {
    e.preventDefault();
    saveData({ ...data, hero });
    setSaved(true);
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Héros</h1>
      <p className="admin-sub">
        Le titre, le nom, le rôle et la description affichés en haut du site.
      </p>

      <form className="admin-panel" onSubmit={save}>
        <h2>Contenu</h2>
        <Field label="Salutation" value={hero.greeting} onChange={(v) => set("greeting", v)} />
        <Field label="Nom" value={hero.name} onChange={(v) => set("name", v)} />
        <Field label="Rôle" value={hero.role} onChange={(v) => set("role", v)} />
        <Field label="Description" value={hero.desc} onChange={(v) => set("desc", v)} area />
        <Field
          label="Photo de profil (URL)"
          value={hero.profileImage}
          onChange={(v) => set("profileImage", v)}
          hint="Collez une URL d'image. Laissez la valeur actuelle si vous ne changez rien."
        />
        <div className="admin-form-actions">
          <button type="submit" className="admin-btn">
            Enregistrer
          </button>
          {saved && <span className="admin-saved">✓ enregistré</span>}
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, area, hint }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {area ? (
        <textarea rows={4} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </div>
  );
}

export default AdminHero;
