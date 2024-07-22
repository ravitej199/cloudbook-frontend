import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../Context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './Notes.css'

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [editedContent, setEditedContent] = useState({
    title: '',
    description: '',
    tag: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    description: '',
    tag: ''
  });
  const [filterTag, setFilterTag] = useState('');

  let changeAlertState = useContext(NoteContext);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}api/notes/fetchallnotes`, {
          method: 'GET',
          headers: {
            'auth-token': localStorage.getItem('token')
          }
        });
        const res_data = await response.json();
        console.log(res_data);

        if (response.ok) {
          setNotes(res_data);
        }
      } catch (error) {
        console.error('Error fetching notes:', error.message);
      }
    };

    fetchNotes();
  }, []);

  const handleEditClick = (note) => {
    setIsEditing(true);
    setCurrentNote(note);
    setEditedContent({
      title: note.title,
      description: note.description,
      tag: note.tag.join(', ')
    });
  };

  const handleDeleteClick = async (noteId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/notes/deletenote/${noteId}`, {
        method: 'DELETE',
        headers: {
          'auth-token': localStorage.getItem('token')
        }
      });

      if (response.ok) {
        setNotes(notes.filter(note => note._id !== noteId));
        changeAlertState.setAlertState({
          message: "Note has been deleted",
          type: "success",
          hide: "false"
        });

        setTimeout(() => {
          changeAlertState.setAlertState({
            message: "",
            type: "",
            hide: "true"
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const tagsArray = editedContent.tag.split(',').map(tag => tag.trim());
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/notes/updatenote/${currentNote._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ ...editedContent, tag: tagsArray })
      });

      if (response.ok) {
        const updatedNote = await response.json();
        setNotes(notes.map(note => note._id === updatedNote._id ? updatedNote : note));
        setIsEditing(false);
        setCurrentNote(null);
        setEditedContent({
          title: '',
          description: '',
          tag: ''
        });
        toast.success("Note updated successfully");
      }
    } catch (error) {
      console.error('Error updating note:', error.message);
    }
  };

  const handleAddNoteClick = () => {
    setIsAdding(true);
  };

  const handleAddNoteSubmit = async (e) => {
    e.preventDefault();
    try {
      const tagsArray = newNote.tag.split(',').map(tag => tag.trim());
      const response = await fetch(`${process.env.REACT_APP_API_URL}api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({ ...newNote, tag: tagsArray })
      });

      if (response.ok) {
        const addedNote = await response.json();
        setNotes([...notes, addedNote]);
        setIsAdding(false);
        setNewNote({
          title: '',
          description: '',
          tag: ''
        });
        toast.success("Note added successfully");
      }
    } catch (error) {
      console.error('Error adding note:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    toast.success("You have been Logged Out");
    navigate("/login");
  };

  const filteredNotes = filterTag.length !== 0 ? notes.filter(note => note.tag.includes(filterTag)) : notes;

  return (
    <div className=' flex items-center justify-center flex-col mt-36 mb-8 '>
      <button onClick={logout} className='bg-[#F8F9FA] py-2 px-3 text-[20px] text-black rounded font-semibold absolute top-[0] right-20 hover:cursor-pointer'>
        Logout
      </button>
      <h1 className='dancing-script-custom font-semibold text-[70px]'>Your Notes</h1>
      <input
        type="text"
        placeholder="Filter by tag"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="filter-input rounded-md border-[2px] mt-4 "
      />
         <button onClick={handleAddNoteClick} className='bg-[#F8F9FA] py-2 shadow-lg px-3 text-[20px] fixed bottom-[10] right-20  top-[70%] text-black rounded font-semibold my-4 hover:cursor-pointer'>
        <FontAwesomeIcon icon={faPlus} /> Add Note
      </button>
      <div className={`notes-container ${isEditing || isAdding ? 'blur' : ''}`}>
        {
          filteredNotes.map(note => (
            <div key={note._id} className="h-auto  self-start flex flex-col ml-10 font-semibold text-[40px] bg-white p-6 rounded-lg shadow-lg mt-5 w-[80%] hover:cursor-pointer">
              <div className='heading border-b-4 border-blue-500 flex justify-between'>
                <h1>Title: {note.title}</h1>
                <div className='text-[28px] flex gap-3'>
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(note)}>
                    <i className="fas fa-edit"></i> Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(note._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
              <div className='description'>Description: <h1>{note.description}</h1></div>
              <div className='tags'>Tags: <span>{note.tag.join(', ')}</span></div>
            </div>
          ))
        }
      </div>
      {isEditing && (
        <div className="edit-container">
          <h2>Edit Note</h2>
          <input
            type="text"
            value={editedContent.title}
            onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
          />
          <textarea
            value={editedContent.description}
            onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            value={editedContent.tag}
            onChange={(e) => setEditedContent({ ...editedContent, tag: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      )}
      {isAdding && (
        <div className="add-container">
          <h2>Add Note</h2>
          <form onSubmit={handleAddNoteSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newNote.description}
              onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={newNote.tag}
              onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
            />
            <button type="submit">Add</button>
            <button type="button" onClick={() => setIsAdding(false)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Notes;
