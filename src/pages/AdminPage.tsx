import { useState } from "react";
import { useSprintStore } from "../store/sprintStore";

/* =========================
   ГЕНЕРАТОР ID ЗАДАЧИ (XX-1234)
========================= */
function generateTaskId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(1000 + Math.random() * 9000);

  return `${a}${b}-${num}`;
}

/* =========================
   ФОРМАТИРОВАНИЕ ВРЕМЕНИ (ч → д/ч)
========================= */
function formatTime(hours: number) {
  const days = Math.floor(hours / 8);
  const remaining = hours % 8;

  if (days > 0) return `${days}д ${remaining}ч`;
  return `${remaining}ч`;
}

export default function AdminPage() {
  const addSprint = useSprintStore((s) => s.addSprint);

  /* =========================
     СОСТОЯНИЕ ЗАДАЧИ
  ========================= */
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [author, setAuthor] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");
  const [time, setTime] = useState<number>(0);

  /* =========================
     СОСТОЯНИЕ СПРИНТА
  ========================= */
  const [sprintName, setSprintName] = useState("");
  const [sprintGoal, setSprintGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  /* =========================
     СОЗДАНИЕ ЗАДАЧИ
  ========================= */
  const createTask = () => {
    // проверка длины описания
    if (description.length < 40) {
      alert("Описание должно быть не менее 40 символов");
      return;
    }

    // проверка длины комментария (если он есть)
    if (comment && comment.length < 40) {
      alert("Комментарий должен быть не менее 40 символов");
      return;
    }

    const id = generateTaskId();

    alert(
      `Задача создана: ${id} (${formatTime(time)})`
    );

    console.log({
      id,
      title,
      subtitle,
      author,
      assignee,
      description,
      comment,
      time,
    });
  };

  /* =========================
     СОЗДАНИЕ СПРИНТА
  ========================= */
  const createSprint = () => {
    // проверка дат
    if (!start || !end) {
      alert("Выберите даты спринта");
      return;
    }

    // дата окончания должна быть позже начала
    if (new Date(end) <= new Date(start)) {
      alert("Дата окончания должна быть позже даты начала");
      return;
    }

    // вычисление длительности спринта (в днях)
    const diff =
      (new Date(end).getTime() - new Date(start).getTime()) /
      (1000 * 60 * 60 * 24);

    addSprint({
      id: crypto.randomUUID(),
      name: sprintName,
      goal: sprintGoal,
      start,
      end,
      duration: Math.ceil(diff),
    });

    alert(`Спринт создан (${Math.ceil(diff)} дней)`);
  };

  return (
    <div>
      <h1>Администрирование</h1>

      {/* =========================
          ФОРМА СОЗДАНИЯ ЗАДАЧИ
      ========================= */}
      <h2>Создание задачи</h2>

      <form style={form}>
        <input placeholder="Заголовок" onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Подзаголовок" onChange={(e) => setSubtitle(e.target.value)} />
        <input placeholder="Автор" onChange={(e) => setAuthor(e.target.value)} />
        <input placeholder="Исполнитель" onChange={(e) => setAssignee(e.target.value)} />

        <input
          type="number"
          placeholder="Время (часы)"
          onChange={(e) => setTime(Number(e.target.value))}
        />

        <textarea
          placeholder="Описание (минимум 40 символов)"
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Комментарий (опционально, минимум 40 символов)"
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="button" onClick={createTask}>
          Создать задачу
        </button>
      </form>

      {/* =========================
          ФОРМА СОЗДАНИЯ СПРИНТА
      ========================= */}
      <h2 style={{ marginTop: 40 }}>Создание спринта</h2>

      <form style={form}>
        <input
          placeholder="Название спринта"
          onChange={(e) => setSprintName(e.target.value)}
        />

        <input
          placeholder="Цель спринта"
          onChange={(e) => setSprintGoal(e.target.value)}
        />

        <input type="date" onChange={(e) => setStart(e.target.value)} />
        <input type="date" onChange={(e) => setEnd(e.target.value)} />

        <button type="button" onClick={createSprint}>
          Создать спринт
        </button>
      </form>

      {/* =========================
          УЧАСТНИКИ КОМАНДЫ (UI)
      ========================= */}
      <h2 style={{ marginTop: 40 }}>Участники команды</h2>

      <form style={form}>
        <input placeholder="ФИО" />
        <input placeholder="Должность" />
        <input placeholder="Подразделение" />

        <button type="button">Добавить участника</button>
      </form>
    </div>
  );
}

/* =========================
   СТИЛИ ФОРМЫ
========================= */
const form: React.CSSProperties = {
  maxWidth: 520,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: 16,
  borderRadius: 16,
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.06)",
};