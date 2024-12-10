import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useTasksStore } from '../store/tasksStore';

const AddTask: React.FC = () => {
  const [newTask, setNewTask] = useState<string>('');
  const addTask = useTasksStore((state) => state.addTask);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <Input
        placeholder="Enter a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onPressEnter={handleAddTask}
        style={{ width: '70%', marginRight: '10px' }}
      />
      <Button type="primary" onClick={handleAddTask}>
        Add Task
      </Button>
    </div>
  );
};

export default AddTask;
