import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export default function NoteModal({ isOpen, onClose, onSave, note }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [note, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ title, content });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content animate-fade-in">
        <div className="modal-header">
          <h2 className="modal-title">{note ? 'Edit Note' : 'Create Note'}</h2>
          <button type="button" onClick={onClose} className="btn-icon">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ fontSize: '1.125rem', fontWeight: '500' }}
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write your note here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows="8"
              style={{ resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={onClose} className="btn-icon" style={{ padding: '0.75rem 1.5rem', background: 'var(--surface-hover)', color: 'white', borderRadius: '0.5rem' }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save size={20} /> Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
