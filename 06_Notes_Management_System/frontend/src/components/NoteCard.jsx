import { Edit2, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete }) {
  const date = new Date(note.updatedAt).toLocaleDateString();
  
  return (
    <div className="note-card glass" style={{ padding: '1.5rem', borderRadius: '1rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
        {note.title}
      </h3>
      <p style={{ color: 'var(--text-secondary)', flexGrow: 1, whiteSpace: 'pre-wrap', marginBottom: '1rem' }}>
        {note.content}
      </p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{date}</span>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => onEdit(note)} className="btn-icon" title="Edit Note">
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(note._id)} className="btn-icon" style={{ color: 'var(--danger-color)' }} title="Delete Note">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
