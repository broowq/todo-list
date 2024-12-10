import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  favorite: boolean;
}

interface TasksState {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (title: string) => void;
  deleteTask: (id: number) => void;
  toggleTaskStatus: (id: number) => void;
  toggleFavorite: (id: number) => void;
}

// Создание Zustand-хранилища
export const useTasksStore = create<TasksState>((set) => ({
  tasks: [],

  // Загрузка задач из localStorage
  fetchTasks: () => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    set({ tasks });
  },

  // Добавление новой задачи
  addTask: (title) => {
    set((state) => {
      const newTask: Task = {
        id: Date.now(),
        title,
        completed: false,
        favorite: false,
      };
      const updatedTasks = [...state.tasks, newTask];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Удаление задачи
  deleteTask: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.filter((task) => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Переключение статуса задачи
  toggleTaskStatus: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },

  // Добавление/удаление задачи из избранного
  toggleFavorite: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, favorite: !task.favorite } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    });
  },
}));
