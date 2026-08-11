import { useState } from "react";
import { usePortfolioData } from "../data/store";

function AdminContact() {
  const [data, saveData] = usePortfolioData();
  const [contact, setContact] = useState(data.contact);
  const [saved, setSaved] = useState(false);

  function set(field, value) {
    setContact((c) => ({ ...c, [field]: value }));
    setSaved(false);
  }

  function save(e) {
    e.preventDefault();
    saveData({ ...data, contact });
    setSaved(true);
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Contact</h1>
      <p className="admin-sub">
        Les coordonnées affichées dans la section « Contact ».
      </p>

      <form className="admin-panel" onSubmit={save}>
        <h2>Coordonnées</h2>
        <Field label="Email" value={contact.email} onChange={(v) => set("email", v)} />
        <Field label="Lien GitHub" value={contact.github} onChange={(v) => set("github", v)} />
        <Field label="Téléphone" value={contact.phone} onChange={(v) => set("phone", v)} />
        <Field label="Nom Facebook" value={contact.facebookName} onChange={(v) => set("facebookName", v)} />
        <Field label="Lien Facebook" value={contact.facebookUrl} onChange={(v) => set("facebookUrl", v)} />
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

function Field({ label, value, onChange }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}

export default AdminContact;
