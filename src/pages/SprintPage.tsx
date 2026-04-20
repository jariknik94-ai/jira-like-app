import { useSprintStore } from "../store/sprintStore";

const statuses = ["backlog", "todo", "in_progress", "done"] as const;

const statusNames: Record<string, string> = {
  backlog: "Бэклог",
  todo: "К выполнению",
  in_progress: "В работе",
  done: "Готово",
};

export default function SprintPage() {
  const { tasks, moveTask } = useSprintStore();

  return (
    <div>
      <h1 style={{ marginBottom: 20 }}>Активный спринт</h1>

      <div style={board}>
        {statuses.map(status => (
          <div key={status} style={column}>
            <div style={columnHeader}>
              {statusNames[status]}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {tasks
                .filter(t => t.status === status)
                .map(task => (
                  <div
                    key={task.id}
                    onClick={() => moveTask(task.id, status)}
                    style={cardTask}
                  >
                    <div style={{ fontWeight: 600 }}>{task.title}</div>
                    <div style={{ fontSize: 12, opacity: 0.6 }}>
                      {task.subtitle}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const board = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: 12,
};

const column = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
  borderRadius: 16,
  padding: 12,
  minHeight: 500,
};

const columnHeader = {
  fontSize: 12,
  opacity: 0.6,
  marginBottom: 10,
  letterSpacing: 1,
};

const cardTask = {
  padding: 12,
  borderRadius: 12,
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.08)",
  cursor: "pointer",
};