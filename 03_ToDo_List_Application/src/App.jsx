import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    } else {
      return [];
    }
  });
  
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    const newTask = {
      id: crypto.randomUUID(),
      text: inputValue.trim(),
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="app-container">
      <div className="header">
        <h1>Task Master</h1>
        <p>Stay organized, focused, and productive.</p>
      </div>

      <form className="task-form" onSubmit={addTask}>
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" className="add-btn">Add Task</button>
      </form>

      {tasks.length > 0 && (
        <div className="filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      )}

      <ul className="task-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            <p>{filter === 'all' ? "No tasks yet. Add one above!" : `No ${filter} tasks found.`}</p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                <span className="task-text">{task.text}</span>
              </div>
              <button 
                className="delete-btn" 
                onClick={() => deleteTask(task.id)}
                aria-label="Delete task"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>

      {tasks.length > 0 && (
        <div className="stats">
          <span>{activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining</span>
          {tasks.length > activeCount && (
            <button 
              className="delete-btn" 
              style={{ padding: 0 }}
              onClick={() => setTasks(tasks.filter(t => !t.completed))}
            >
              Clear completed
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
