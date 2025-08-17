import React from 'react';
import useInput from '../../hooks/useInput';
import './addThread.css';
import { asyncAddThread } from '../../states/threads/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddThread = () => {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onPostThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  return (
    <div className="add-thread-container">
      <form className="add-thread-form">
        <h2 className="form-title">Buat Thread Baru</h2>

        <input
          type="text"
          placeholder="Judul Thread"
          className="form-input"
          value={title}
          onChange={onTitleChange}
          required
        />

        <input
          type="text"
          placeholder="Kategori"
          className="form-input"
          value={category}
          onChange={onCategoryChange}
          required
        />

        <textarea
          placeholder="Tulis isi thread..."
          className="form-textarea"
          rows="6"
          value={body}
          onChange={onBodyChange}
          required
        />

        <button
          type="button"
          className="form-button"
          onClick={() => onPostThread({ title, category, body })}
        >
          Buat Thread
        </button>
      </form>
    </div>
  );
};

export default AddThread;
