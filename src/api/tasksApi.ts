import axios from 'axios';

const API_URL = 'https://cms.laurence.host/api';

export const getTasks = async () => {
  const response = await axios.get(`${API_URL}/tasks`);
  return response.data;
};

export const addTask = async (task: { title: string }) => {
  const response = await axios.post(`${API_URL}/tasks`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}/tasks/${id}`);
};

export const updateTaskStatus = async (id: number, completed: boolean) => {
  const response = await axios.patch(`${API_URL}/tasks/${id}`, { completed });
  return response.data;
};
