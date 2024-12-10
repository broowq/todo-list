import React, { useEffect, useState } from 'react';
import { useTasksStore } from '../store/tasksStore';
import { Input, List, Button, Checkbox, Radio } from 'antd';
import AddTask from './AddTask';

const TodoList: React.FC = () => {
  const { tasks, fetchTasks, addTask, deleteTask, toggleTaskStatus, toggleFavorite } =
    useTasksStore();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete' | 'favorite'>('all');

  useEffect(() => {
    fetchTasks(); // Загружаем задачи из localStorage при загрузке компонента
  }, [fetchTasks]);

  const filteredTasks = tasks.filter((task) => {
    switch (filter) {
      case 'completed':
        return task.completed;
      case 'incomplete':
        return !task.completed;
      case 'favorite':
        return task.favorite;
      default:
        return true;
    }
  });

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#121212', minHeight: '100vh' }}>
      <h1 style={{ color: 'white' }}>Todo List</h1>
      <Input
        placeholder="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onPressEnter={() => {
          addTask(newTask);
          setNewTask('');
        }}
        style={{ width: '70%', marginRight: '10px' }}
      />
      <Button
        onClick={() => {
          addTask(newTask);
          setNewTask('');
        }}
        type="primary"
        style={{ marginTop: '10px' }}
      >
        Add Task
      </Button>

      <Radio.Group
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="completed">Completed</Radio.Button>
        <Radio.Button value="incomplete">Incomplete</Radio.Button>
        <Radio.Button value="favorite">Favorite</Radio.Button>
      </Radio.Group>

      <List
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item
            actions={[
              <Checkbox
                checked={task.completed}
                onChange={() => toggleTaskStatus(task.id)}
              />,
              <Button
                type={task.favorite ? 'primary' : 'default'}
                onClick={() => toggleFavorite(task.id)}
              >
                Favorite
              </Button>,
              <Button danger onClick={() => deleteTask(task.id)}>
                Delete
              </Button>,
            ]}
          >
            <span style={{ color: task.favorite ? '#ffd700' : 'white', fontWeight: task.favorite ? 'bold' : 'normal' }}>
              {task.title} {task.favorite && '⭐'}
            </span>
          </List.Item>
        )}
      />
    </div>
  );
};

export default TodoList;
