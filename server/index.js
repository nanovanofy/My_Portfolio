import express from "express";
import multer from "multer";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 4000;

const uploadsDir = path.join(__dirname, "uploads");
if (!existsSync(uploadsDir)) mkdirSync(uploadsDir, { recursive: true });

const app = express();
app.use(express.json());

const UPLOAD_LIMIT = 20 * 1024 * 1024; // 20 Mo

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || ".bin";
    const name = `${Date.now().toString(36)}_${randomBytes(6).toString("hex")}${ext}`;
    cb(null, name);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: UPLOAD_LIMIT },
  fileFilter: (_req, file, cb) => {
    const type = file.mimetype || "";
    const ok =
      type.startsWith("image/") ||
      type.startsWith("video/");
    cb(ok ? null : new Error("Type de fichier non autorisé"), ok);
  },
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "Aucun fichier reçu" });
  res.json({ url: `/uploads/${req.file.filename}`, size: req.file.size });
});

app.post("/api/upload", (req, res) => {
  res.status(400).json({ error: "Upload échoué" });
});

app.use(
  "/uploads",
  express.static(uploadsDir, {
    maxAge: "7d",
    setHeaders: (res, filePath) => {
      if (/\.(mp4|webm|ogg)$/i.test(filePath)) {
        res.setHeader("Content-Type", "video/mp4");
      }
    },
  })
);

const distDir = path.join(__dirname, "..", "dist");
if (existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get(/^\/(?!api|uploads).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"));
  });
}

app.use((err, _req, res, _next) => {
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ error: "Fichier trop lourd (20 Mo max)" });
  }
  res.status(400).json({ error: err.message || "Erreur serveur" });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});