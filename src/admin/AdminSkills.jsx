import { useState } from "react";
import { usePortfolioData, uid } from "../data/store";

const EMPTY = { id: "", name: "", desc: "", image: "" };

function AdminSkills() {
  const [data, saveData] = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY, id: uid() });

  const editing = data.skills.find((s) => s.id === editingId);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const entry = { ...form, name: form.name.trim() || "Compétence" };
    const exists = data.skills.some((s) => s.id === entry.id);
    const skills = exists
      ? data.skills.map((s) => (s.id === entry.id ? entry : s))
      : [...data.skills, entry];
    saveData({ ...data, skills });
    setForm({ ...EMPTY, id: uid() });
    setEditingId(null);
  }

  function startEdit(s) {
    setEditingId(s.id);
    setForm({ ...s });
  }

  function remove(id) {
    saveData({ ...data, skills: data.skills.filter((s) => s.id !== id) });
    if (editingId === id) {
      setEditingId(null);
      setForm({ ...EMPTY, id: uid() });
    }
  }

  function cancel() {
    setEditingId(null);
    setForm({ ...EMPTY, id: uid() });
  }

  return (
    <div className="admin-page">
      <h1 className="admin-title">Compétences</h1>
      <p className="admin-sub">
        Les compétences sont affichées dans la section « Compétences » et servent
        de stack dans le terminal « À propos ».
      </p>

      <div className="admin-grid">
        <form className="admin-panel" onSubmit={handleSubmit}>
          <h2>{editing ? "Modifier la compétence" : "Nouvelle compétence"}</h2>
          <Field label="Nom" value={form.name} onChange={(v) => set("name", v)} />
          <Field label="Description" value={form.desc} onChange={(v) => set("desc", v)} area />
          <Field
            label="Icône (URL ou laisser vide)"
            value={form.image}
            onChange={(v) => set("image", v)}
            hint="Si vide, une lettre est affichée à la place."
          />
          <div className="admin-form-actions">
            <button type="submit" className="admin-btn">
              {editing ? "Enregistrer" : "Ajouter"}
            </button>
            {editing && (
              <button type="button" className="admin-btn admin-btn-ghost" onClick={cancel}>
                Annuler
              </button>
            )}
          </div>
        </form>

        <div className="admin-list">
          {data.skills.map((s) => (
            <div className="admin-list-item" key={s.id}>
              <div className="admin-list-skill">
                {s.image ? (
                  <img className="admin-skill-img" src={s.image} alt="" />
                ) : (
                  <span className="skill-fallback">{s.name.slice(0, 1).toUpperCase()}</span>
                )}
                <div>
                  <b>{s.name}</b>
                  <span className="admin-item-meta">{s.desc}</span>
                </div>
              </div>
              <div className="admin-item-actions">
                <button className="admin-btn admin-btn-sm" onClick={() => startEdit(s)}>
                  Modifier
                </button>
                <button
                  className="admin-btn admin-btn-sm admin-btn-danger"
                  onClick={() => remove(s.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {data.skills.length === 0 && (
            <p className="admin-empty">Aucune compétence. Ajoutez-en une.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, area, hint }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {area ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {hint && <small>{hint}</small>}
    </div>
  );
}

export default AdminSkills;
