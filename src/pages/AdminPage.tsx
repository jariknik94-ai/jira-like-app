import { useState } from "react";
import { useSprintStore } from "../store/sprintStore";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/*СХЕМА ВАЛИДАЦИИ*/
const schema = yup.object({
  title: yup.string().required("Введите заголовок"),
  subtitle: yup.string().required("Введите подзаголовок"),
  author: yup.string().required("Введите автора"),
  assignee: yup.string().required("Введите исполнителя"),
  time: yup
    .number()
    .typeError("Введите время")
    .required("Введите время"),
  description: yup
    .string()
    .min(40, "Минимум 40 символов")
    .required("Введите описание"),
  comment: yup
    .string()
    .test(
      "len",
      "Комментарий должен быть не менее 40 символов",
      (val) => !val || val.length >= 40
    ),
});

/*ГЕНЕРАТОР ID*/
function generateTaskId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const a = letters[Math.floor(Math.random() * letters.length)];
  const b = letters[Math.floor(Math.random() * letters.length)];
  const num = Math.floor(1000 + Math.random() * 9000);

  return `${a}${b}-${num}`;
}

/*ФОРМАТ ВРЕМЕНИ*/
function formatTime(hours: number) {
  const days = Math.floor(hours / 8);
  const remaining = hours % 8;

  if (days > 0) return `${days}д ${remaining}ч`;
  return `${remaining}ч`;
}

export default function AdminPage() {
  const addSprint = useSprintStore((s) => s.addSprint);

  /*REACT HOOK FORM*/
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  /*СОСТОЯНИЕ СПРИНТА*/
  const [sprintName, setSprintName] = useState("");
  const [sprintGoal, setSprintGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  /*СОЗДАНИЕ ЗАДАЧИ*/
  const createTask = (data: any) => {
    const id = generateTaskId();

    alert(
      `Задача создана: ${id} (${formatTime(data.time)})`
    );

    console.log({
      id,
      ...data,
    });

    reset();
  };

  /*ОЗДАНИЕ СПРИНТА*/
  const createSprint = () => {
    if (!start || !end) {
      alert("Выберите даты спринта");
      return;
    }

    if (new Date(end) <= new Date(start)) {
      alert("Дата окончания должна быть позже даты начала");
      return;
    }

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

      {/*СОЗДАНИЕ ЗАДАЧИ*/}
      <h2>Создание задачи</h2>

      <form style={form} onSubmit={handleSubmit(createTask)}>
        <input {...register("title")} placeholder="Заголовок" />
        <p style={error}>{errors.title?.message}</p>

        <input {...register("subtitle")} placeholder="Подзаголовок" />
        <p style={error}>{errors.subtitle?.message}</p>

        <input {...register("author")} placeholder="Автор" />
        <p style={error}>{errors.author?.message}</p>

        <input {...register("assignee")} placeholder="Исполнитель" />
        <p style={error}>{errors.assignee?.message}</p>

        <input
          type="number"
          {...register("time")}
          placeholder="Время (часы)"
        />
        <p style={error}>{errors.time?.message}</p>

        <textarea
          {...register("description")}
          placeholder="Описание"
        />
        <p style={error}>{errors.description?.message}</p>

        <textarea
          {...register("comment")}
          placeholder="Комментарий (необязательно)"
        />
        <p style={error}>{errors.comment?.message}</p>

        <button type="submit">Создать задачу</button>
      </form>

      {/*СОЗДАНИЕ СПРИНТА*/}
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

      {/*УЧАСТНИКИ (UI)*/}
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

/* СТИЛИ*/
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

const error: React.CSSProperties = {
  color: "#f87171",
  fontSize: 12,
};