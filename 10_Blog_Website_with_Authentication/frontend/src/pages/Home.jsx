import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { Trash2, Edit } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editId, setEditId] = useState(null);
  const { user } = useAuth();

  const fetchPosts = async () => {
    const res = await api.get('/posts');
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await api.put(`/posts/${editId}`, { title, content });
      setEditId(null);
    } else {
      await api.post('/posts', { title, content });
    }
    setTitle('');
    setContent('');
    fetchPosts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await api.delete(`/posts/${id}`);
      fetchPosts();
    }
  };

  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setEditId(post._id);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="card" style={{ marginBottom: '3rem' }}>
        <h2>{editId ? 'Edit Post' : 'Create a New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Post Title" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              rows="5" 
              placeholder="What's on your mind?" 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              required 
            />
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button type="submit">{editId ? 'Update Post' : 'Publish'}</button>
            {editId && <button type="button" className="secondary" onClick={() => { setEditId(null); setTitle(''); setContent(''); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div>
        {posts.map(post => (
          <div key={post._id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-meta">
              By <strong>{post.author?.username}</strong> on {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="post-content">{post.content}</p>
            {user && post.author?._id === user.id && (
              <div className="post-actions">
                <button className="secondary" onClick={() => handleEdit(post)}><Edit size={16} /> Edit</button>
                <button className="danger" onClick={() => handleDelete(post._id)}><Trash2 size={16} /> Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
