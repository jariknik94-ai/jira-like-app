import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 260,
          padding: 20,
          background: "rgba(255,255,255,0.03)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
        }}
      >
        <h2 style={{ fontSize: 18, marginBottom: 20 }}>
          ⚡ Jira Lite
        </h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Link to="/">📊 Рабочий стол</Link>
          <Link to="/sprint">📌 Активный спринт</Link>
          <Link to="/admin">⚙️ Администрирование</Link>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: 24 }}>
        <Outlet />
      </main>
    </div>
  );
}