import { useRef, useState } from "react";
import { usePortfolioData, uid } from "../data/store";

const EMPTY = {
  id: "",
  title: "",
  desc: "",
  image: "",
  video: "",
  demoUrl: "",
  codeUrl: "",
};

const MAX_DIM = 1600;
const JPEG_QUALITY = 0.82;
const MAX_FILE_MB = 4;
const MAX_VIDEO_MB = 15;

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function resizeImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const scale = Math.min(MAX_DIM / img.width, MAX_DIM / img.height, 1);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d").drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image invalide"));
    };
    img.src = url;
  });
}

async function uploadToServer(file) {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch("/api/upload", { method: "POST", body: fd });
  if (!res.ok) throw new Error("upload failed");
  const json = await res.json();
  return json.url;
}

function AdminProjects() {
  const [data, saveData] = usePortfolioData();
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY, id: uid() });
  const [uploadError, setUploadError] = useState("");
  const [videoError, setVideoError] = useState("");
  const [savingError, setSavingError] = useState("");
  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingVid, setUploadingVid] = useState(false);
  const fileRef = useRef(null);
  const videoRef = useRef(null);

  const editing = data.projects.find((p) => p.id === editingId);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setSavingError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    const entry = { ...form, title: form.title.trim() || "Sans titre" };
    const exists = data.projects.some((p) => p.id === entry.id);
    const projects = exists
      ? data.projects.map((p) => (p.id === entry.id ? entry : p))
      : [...data.projects, entry];
    saveData({ ...data, projects });
    setForm({ ...EMPTY, id: uid() });
    setEditingId(null);
    setUploadError("");
    setVideoError("");
    setSavingError("");
  }

  async function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setUploadError(`Le fichier dépasse ${MAX_FILE_MB} Mo. Choisissez une image plus légère.`);
      return;
    }
    setUploadError("");
    setUploadingImg(true);
    try {
      const blob = await resizeImage(file);
      try {
        const serverUrl = await uploadToServer(blob);
        set("image", serverUrl);
      } catch {
        const dataUrl = await blobToDataURL(blob);
        set("image", dataUrl);
        setUploadError(
          "Serveur injoignable : image stockée dans le navigateur au lieu du serveur."
        );
      }
    } catch {
      setUploadError("Impossible de lire cette image ou son type n'est pas supporté.");
    } finally {
      setUploadingImg(false);
    }
  }

  async function handleVideo(e) {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (file.size > MAX_VIDEO_MB * 1024 * 1024) {
      setVideoError(
        `Le fichier dépasse ${MAX_VIDEO_MB} Mo (20 Mo max côté serveur). Choisissez une vidéo plus légère.`
      );
      return;
    }
    setVideoError("");
    setUploadingVid(true);
    try {
      const serverUrl = await uploadToServer(file);
      set("video", serverUrl);
    } catch {
      const dataUrl = await blobToDataURL(file);
      set("video", dataUrl);
      setVideoError(
        "Serveur injoignable : vidéo stockée dans le navigateur (repli, petite taille seulement)."
      );
    } finally {
      setUploadingVid(false);
    }
  }

  function startEdit(p) {
    setEditingId(p.id);
    setForm({ ...p });
    setUploadError("");
    setVideoError("");
    setSavingError("");
  }

  function remove(id) {
    saveData({ ...data, projects: data.projects.filter((p) => p.id !== id) });
    if (editingId === id) {
      setEditingId(null);
      setForm({ ...EMPTY, id: uid() });
    }
  }

  function cancel() {
    setEditingId(null);
    setForm({ ...EMPTY, id: uid() });
    setUploadError("");
    setVideoError("");
    setSavingError("");
  }

  const isImageLocal = form.image.startsWith("data:");
  const isVideoLocal = form.video.startsWith("data:");
  const hasImage = Boolean(form.image);
  const hasVideo = Boolean(form.video);

  return (
    <div className="admin-page">
      <h1 className="admin-title">Projets</h1>
      <p className="admin-sub">
        Les projets sont affichés dans la section « Projets » du portfolio. Les images et vidéos
        sont envoyées au serveur (« /uploads »).
      </p>

      <div className="admin-grid">
        <form className="admin-panel" onSubmit={handleSubmit}>
          <h2>{editing ? "Modifier le projet" : "Nouveau projet"}</h2>
          <Field label="Titre" value={form.title} onChange={(v) => set("title", v)} />
          <Field
            label="Description"
            value={form.desc}
            onChange={(v) => set("desc", v)}
            area
          />

          <div className="admin-field">
            <label>Image du projet</label>
            <input
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleFile}
              className="admin-file-input"
            />
            <button
              type="button"
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={() => fileRef.current && fileRef.current.click()}
              disabled={uploadingImg}
            >
              {uploadingImg
                ? "Envoi..."
                : hasImage
                  ? "Changer l'image"
                  : "Choisir une image depuis le PC"}
            </button>
            {uploadError && <small className="admin-error">{uploadError}</small>}
            <small className="admin-hint">
              Image redimensionnée (max 1600px) et envoyée au serveur. Vous pouvez aussi coller une
              URL ci-dessous.
            </small>
            {hasImage && (
              <div className="admin-upload-preview">
                <img src={form.image} alt="Aperçu" />
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-danger"
                  onClick={() => set("image", "")}
                >
                  Retirer
                </button>
                {isImageLocal ? (
                  <small>Stockée en local (repli)</small>
                ) : (
                  <small>Envoyée au serveur</small>
                )}
              </div>
            )}
          </div>

          <Field
            label="Ou URL de l'image"
            value={isImageLocal ? "" : form.image}
            onChange={(v) => set("image", v)}
            placeholder="https://exemple.com/image.png"
          />
          <div className="admin-field">
            <label>Vidéo démo (live)</label>
            <input
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              ref={videoRef}
              onChange={handleVideo}
              className="admin-file-input"
            />
            <button
              type="button"
              className="admin-btn admin-btn-ghost admin-btn-sm"
              onClick={() => videoRef.current && videoRef.current.click()}
              disabled={uploadingVid}
            >
              {uploadingVid
                ? "Envoi..."
                : hasVideo
                  ? "Changer la vidéo"
                  : "Choisir la vidéo depuis le PC"}
            </button>
            {videoError && <small className="admin-error">{videoError}</small>}
            <small className="admin-hint">
              {MAX_VIDEO_MB} Mo max (20 Mo côté serveur), mp4/webm/ogg. La vidéo est envoyée au
              serveur et joue dans une fenêtre quand on clique sur « live ».
            </small>
            {hasVideo && (
              <div className="admin-upload-preview admin-video-preview">
                <video controls src={form.video} />
                <button
                  type="button"
                  className="admin-btn admin-btn-sm admin-btn-danger"
                  onClick={() => set("video", "")}
                >
                  Retirer
                </button>
                {isVideoLocal ? (
                  <small>Stockée en local (repli)</small>
                ) : (
                  <small>Envoyée au serveur</small>
                )}
              </div>
            )}
          </div>

          <Field
            label="Ou URL de la vidéo"
            value={isVideoLocal ? "" : form.video}
            onChange={(v) => set("video", v)}
            placeholder="https://exemple.com/demo.mp4"
          />
          <Field
            label="Lien démo (site web live)"
            value={form.demoUrl}
            onChange={(v) => set("demoUrl", v)}
            hint="Si une vidéo est définie, le badge « live » la joue. Sinon, il ouvre ce lien."
          />
          <Field label="Lien code" value={form.codeUrl} onChange={(v) => set("codeUrl", v)} />

          {savingError && <p className="admin-error admin-error-block">{savingError}</p>}

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
          {data.projects.map((p) => (
            <div className="admin-list-item" key={p.id}>
              <div className="admin-list-skill">
                {p.image ? (
                  <img className="admin-skill-img" src={p.image} alt="" />
                ) : (
                  <span className="skill-fallback">{p.title.slice(0, 1).toUpperCase()}</span>
                )}
                <div>
                  <b>{p.title}</b>
                  <span className="admin-item-meta">
                    {p.desc}
                    {p.video && " · 📹 vidéo démo"}
                  </span>
                </div>
              </div>
              <div className="admin-item-actions">
                {p.demoUrl && (
                  <a
                    className="admin-btn admin-btn-sm admin-btn-ghost"
                    href={p.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="Voir la démo en direct"
                  >
                    live ↗
                  </a>
                )}
                <button className="admin-btn admin-btn-sm" onClick={() => startEdit(p)}>
                  Modifier
                </button>
                <button
                  className="admin-btn admin-btn-sm admin-btn-danger"
                  onClick={() => remove(p.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
          {data.projects.length === 0 && (
            <p className="admin-empty">Aucun projet. Ajoutez-en un.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, area, hint, placeholder }) {
  return (
    <div className="admin-field">
      <label>{label}</label>
      {area ? (
        <textarea rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
      {hint && <small>{hint}</small>}
    </div>
  );
}

export default AdminProjects;