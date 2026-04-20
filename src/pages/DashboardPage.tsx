import { useState } from "react";
import { useSprintStore } from "../store/sprintStore";

export default function DashboardPage() {
  const tasks = useSprintStore((s) => s.tasks);
  const sprints = useSprintStore((s) => s.sprints);

  const currentSprint = sprints[sprints.length - 1];

  const [tab, setTab] = useState<"product" | "backlog">("backlog");
  const [userFilter, setUserFilter] = useState<"all" | "me">("all");

  // 📌 фильтрация по вкладке + пользователю
  const filteredTasks = tasks.filter((t) => {
    const tabMatch =
      tab === "backlog"
        ? t.status === "backlog"
        : true; // product пока заглушка

    const userMatch =
      userFilter === "all" ? true : t.assignee === "me";

    return tabMatch && userMatch;
  });

  const stats = {
    total: tasks.length,
    backlog: tasks.filter((t) => t.status === "backlog").length,
    progress: tasks.filter((t) => t.status === "in_progress").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div>
      <h1 style={{ marginBottom: 16 }}>Рабочий стол</h1>

      {/* 📌 СПРИНТ БЛОК */}
      {currentSprint && (
        <div style={card}>
          <h3 style={{ marginBottom: 8 }}>Текущий спринт</h3>
          <p><b>Название:</b> {currentSprint.name}</p>
          <p><b>Цель:</b> {currentSprint.goal}</p>
          <p>
            <b>Период:</b> {currentSprint.start} → {currentSprint.end}
          </p>
        </div>
      )}

      {/* 📌 ТАБЫ */}
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button onClick={() => setTab("product")}>
          Продукт
        </button>
        <button onClick={() => setTab("backlog")}>
          Бэклог
        </button>
      </div>

      {/* 📌 ФИЛЬТР ПОЛЬЗОВАТЕЛЯ */}
      <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
        <button onClick={() => setUserFilter("all")}>
          Все задачи
        </button>
        <button onClick={() => setUserFilter("me")}>
          Только мои задачи
        </button>
      </div>

      {/* 📊 СТАТИСТИКА */}
      <div style={grid}>
        <Card title="Всего задач" value={stats.total} />
        <Card title="Бэклог" value={stats.backlog} />
        <Card title="В работе" value={stats.progress} />
        <Card title="Готово" value={stats.done} />
      </div>

      {/* 📌 СПИСОК ЗАДАЧ */}
      <div style={{ marginTop: 20 }}>
        <h3>Задачи</h3>

        {filteredTasks.length === 0 && (
          <div style={empty}>
            Нет задач по выбранному фильтру
          </div>
        )}

        {filteredTasks.map((t) => (
          <div key={t.id} style={taskCard}>
            <b>{t.title}</b>
            <div style={{ opacity: 0.6, fontSize: 12 }}>
              {t.subtitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 📌 UI компоненты */

function Card({ title, value }: any) {
  return (
    <div style={cardBox}>
      <div style={{ opacity: 0.6, fontSize: 12 }}>{title}</div>
      <div style={{ fontSize: 26, fontWeight: 600 }}>{value}</div>
    </div>
  );
}

/* 📌 STYLES */

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
  marginTop: 20,
};

const card = {
  padding: 16,
  borderRadius: 14,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const cardBox = {
  padding: 16,
  borderRadius: 14,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const taskCard = {
  marginTop: 10,
  padding: 12,
  borderRadius: 12,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
};

const empty = {
  marginTop: 10,
  padding: 12,
  opacity: 0.6,
};