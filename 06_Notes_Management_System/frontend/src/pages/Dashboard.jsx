import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import api from '../utils/api';
import { Search, Plus } from 'lucide-react';

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await api.get(`/notes${search ? `?search=${search}` : ''}`);
      setNotes(res.data);
    } catch (err) {
      console.error('Failed to fetch notes', err);
    }
  }, [search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchNotes();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search, fetchNotes]);

  const handleSaveNote = async (noteData) => {
    try {
      if (currentNote) {
        await api.put(`/notes/${currentNote._id}`, noteData);
      } else {
        await api.post('/notes', noteData);
      }
      setIsModalOpen(false);
      setCurrentNote(null);
      fetchNotes();
    } catch (err) {
      console.error('Failed to save note', err);
    }
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.delete(`/notes/${id}`);
        fetchNotes();
      } catch (err) {
        console.error('Failed to delete note', err);
      }
    }
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setCurrentNote(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header animate-fade-in">
          <div className="search-bar glass" style={{ borderRadius: '2rem' }}>
            <Search className="search-icon" size={20} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent' }}
            />
          </div>
          <button onClick={openCreateModal} className="btn-primary">
            <Plus size={20} /> New Note
          </button>
        </div>

        {notes.length === 0 ? (
          <div style={{ textAlign: 'center', marginTop: '4rem', color: 'var(--text-secondary)' }} className="animate-fade-in">
            <p style={{ fontSize: '1.25rem' }}>No notes found.</p>
            <p>Create a new note to get started!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note, i) => (
              <div key={note._id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <NoteCard 
                  note={note} 
                  onEdit={openEditModal} 
                  onDelete={handleDeleteNote} 
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <NoteModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveNote}
        note={currentNote}
      />
    </div>
  );
}
