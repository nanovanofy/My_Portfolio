import { navigate } from "../router";
import { useTheme } from "../hooks/useTheme";
import "./admin.css";

const NAV = [
  { path: "/admin", label: "Tableau de bord", exact: true },
  { path: "/admin/projets", label: "Projets" },
  { path: "/admin/competences", label: "Compétences" },
  { path: "/admin/a-propos", label: "À propos" },
  { path: "/admin/hero", label: "Héros" },
  { path: "/admin/contact", label: "Contact" },
];

function AdminLayout({ path, children }) {
  const [theme, toggleTheme] = useTheme();

  const isActive = (item) =>
    item.exact ? path === item.path : path.startsWith(item.path);

  return (
    <div className="admin-wrap">
      <aside className="admin-sidebar">
        <div className="admin-brand">&gt;_admin</div>
        <nav className="admin-nav">
          {NAV.map((item) => (
            <button
              key={item.path}
              className={`admin-nav-item ${isActive(item) ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-foot">
          <button className="admin-ghost" onClick={() => navigate("/")}>
            ← Voir le site
          </button>
          <button className="admin-ghost" onClick={toggleTheme}>
            {theme === "dark" ? "Mode jour ☀" : "Mode nuit ☾"}
          </button>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}

export default AdminLayout;
