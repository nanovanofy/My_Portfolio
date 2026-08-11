import { navigate } from "../router";
import { usePortfolioData } from "../data/store";

function StatCard({ label, count, to }) {
  return (
    <button className="admin-stat" onClick={() => navigate(to)}>
      <b>{count}</b>
      <span>{label}</span>
    </button>
  );
}

function AdminDashboard() {
  const [data, , resetData] = usePortfolioData();

  return (
    <div className="admin-page">
      <h1 className="admin-title">Tableau de bord</h1>
      <p className="admin-sub">
        Gérez le contenu de votre portfolio. Les changements sont enregistrés
        automatiquement dans votre navigateur.
      </p>

      <div className="admin-stats">
        <StatCard label="Projets" count={data.projects.length} to="/admin/projets" />
        <StatCard label="Compétences" count={data.skills.length} to="/admin/competences" />
        <StatCard label="Tags / chips" count={data.about.chips.length} to="/admin/a-propos" />
      </div>

      <div className="admin-panel">
        <h2>Actions</h2>
        <div className="admin-actions">
          <button className="admin-btn" onClick={() => navigate("/admin/projets")}>
            + Ajouter un projet
          </button>
          <button className="admin-btn" onClick={() => navigate("/admin/competences")}>
            + Ajouter une compétence
          </button>
          <button className="admin-btn admin-btn-danger" onClick={resetData}>
            Réinitialiser toutes les données
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
