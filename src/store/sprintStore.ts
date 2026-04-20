import { create } from "zustand";
import { Task } from "../models/task";

/* =========================
   МОДЕЛЬ СПРИНТА
   (добавлена длительность по ТЗ)
========================= */
interface Sprint {
  id: string;
  name: string;   // название спринта
  goal: string;   // цель спринта
  start: string;  // дата начала
  end: string;    // дата окончания
  duration: number; // длительность (в днях)
}

/* =========================
   СОСТОЯНИЕ ХРАНИЛИЩА
========================= */
interface State {
  tasks: Task[];        // список задач
  sprints: Sprint[];    // список спринтов

  addTask: (t: Task) => void;                 // добавить задачу
  addSprint: (s: Sprint) => void;             // добавить спринт
  moveTask: (id: string, status: Task["status"]) => void; // переместить задачу
}

/* =========================
   STORE (ZUSTAND)
========================= */
export const useSprintStore = create<State>((set) => ({
  tasks: [],
  sprints: [],

  /* =========================
     ДОБАВЛЕНИЕ ЗАДАЧИ
  ========================= */
  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  /* =========================
     ДОБАВЛЕНИЕ СПРИНТА
  ========================= */
  addSprint: (sprint) =>
    set((state) => ({
      sprints: [...state.sprints, sprint],
    })),

  /* =========================
     ПЕРЕМЕЩЕНИЕ ЗАДАЧИ ПО СТАТУСУ
  ========================= */
  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      ),
    })),
}));