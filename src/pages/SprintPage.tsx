import {
  DndContext,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { useSprintStore } from "../store/sprintStore";

/*СТРАНИЦА АКТИВНОГО СПРИНТА
   (KANBAN + DRAG & DROP)*/
export default function ActiveSprintPage() {
  const tasks = useSprintStore((s) => s.tasks);
  const moveTask = useSprintStore((s) => s.moveTask);

  /*ОБРАБОТКА ПЕРЕТАСКИВАНИЯ*/
  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // если некуда бросили — выходим
    if (!over) return;

    // меняем статус задачи
    moveTask(active.id, over.id);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={board}>
        <Column id="backlog" title="Бэклог" tasks={tasks} />
        <Column id="in_progress" title="В работе" tasks={tasks} />
        <Column id="done" title="Готово" tasks={tasks} />
      </div>
    </DndContext>
  );
}

/*КОЛОНКА КАНБАНА*/
function Column({ id, title, tasks }: any) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={column}>
      <h3>{title}</h3>

      {tasks
        .filter((t: any) => t.status === id)
        .map((task: any) => (
          <TaskCard key={task.id} task={task} />
        ))}
    </div>
  );
}

/*КАРТОЧКА ЗАДАЧИ*/
function TaskCard({ task }: any) {
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{ ...card, ...style }}
    >
      <b>{task.title}</b>
    </div>
  );
}

/*СТИЛИ*/
const board = {
  display: "flex",
  gap: 16,
};

const column = {
  flex: 1,
  padding: 12,
  borderRadius: 12,
  background: "rgba(255,255,255,0.03)",
};

const card = {
  marginTop: 10,
  padding: 10,
  borderRadius: 10,
  background: "rgba(255,255,255,0.06)",
  cursor: "grab",
};