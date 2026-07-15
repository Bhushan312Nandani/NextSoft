import { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Layout } from 'lucide-react';

const api = axios.create({ baseURL: 'http://localhost:5000/api' });

export default function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(storedUser);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', res.data.username);
      setUser(res.data.username);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      fetchTasks();
    } catch (err) {
      alert('Login failed. Registering instead...');
      await api.post('/auth/register', { username, password });
      login(e);
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    try {
      await api.post('/tasks', { title: newTaskTitle, status: 'todo' });
      setNewTaskTitle('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;

    // Optimistic UI update
    const newStatus = destination.droppableId;
    setTasks(tasks.map(t => t._id === draggableId ? { ...t, status: newStatus } : t));

    try {
      await api.put(`/tasks/${draggableId}`, { status: newStatus });
    } catch (err) {
      fetchTasks(); // revert on failure
    }
  };

  if (!user) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h2 style={{ marginBottom: '1.5rem' }}>Login to NexusKanban</h2>
          <form onSubmit={login}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit" className="btn" style={{ width: '100%' }}>Login / Register</button>
          </form>
        </div>
      </div>
    );
  }

  const columns = {
    'todo': { name: 'TODO', color: '#49c4e5' },
    'in-progress': { name: 'DOING', color: '#8471f2' },
    'done': { name: 'DONE', color: '#67e2ae' }
  };

  return (
    <div>
      <header className="header">
        <h1><Layout /> NexusKanban</h1>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>{user}</span>
          <button className="btn" onClick={logout} style={{ background: '#ea5555' }}>Logout</button>
        </div>
      </header>

      <div style={{ padding: '1.5rem', paddingBottom: 0 }}>
        <form onSubmit={addTask} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            placeholder="Add new task..." 
            value={newTaskTitle} 
            onChange={e => setNewTaskTitle(e.target.value)} 
            style={{ padding: '0.75rem', borderRadius: '24px', border: '1px solid var(--lines)', width: '300px', outline: 'none' }}
          />
          <button type="submit" className="btn">+ Add New Task</button>
        </form>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board-container">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className="column">
              <div className="column-header">
                <div className="dot" style={{ backgroundColor: col.color }}></div>
                {col.name} ({tasks.filter(t => t.status === colId).length})
              </div>
              <Droppable droppableId={colId}>
                {(provided) => (
                  <div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                    {tasks.filter(t => t.status === colId).map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(provided) => (
                          <div 
                            className="task-card"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.title}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
