import React, { useContext, useEffect, useState } from 'react';
import NoteContext from '../Context/Notes/noteContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import useIsMobile from '../Components/CheckIsMobile'; 

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

  let {changeAlertState,setLoggedIn} = useContext(NoteContext);

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
    setLoggedIn(false)
    navigate("/login");
  };

  const filteredNotes = filterTag.length !== 0 ? notes.filter(note => note.tag.includes(filterTag)) : notes;

  return (
    <div className='flex items-center justify-center flex-col mt-36 mb-8 px-4 min-h-screen'>
   { useIsMobile? '' :  <button onClick={logout} className='bg-[#F8F9FA] py-2 px-3 text-[20px] text-black rounded font-semibold lg:absolute top-[10px] right-5 sm:right-10 md:right-20 hover:cursor-pointer'>
        Logout
      </button>}
      <h1 className='dancing-script-custom font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[70px]'>Your Notes</h1>
      <input
        type="text"
        placeholder="Filter by tag"
        value={filterTag}
        onChange={(e) => setFilterTag(e.target.value)}
        className="filter-input rounded-md border-2 mt-4 px-3 py-2 w-full max-w-md"
      />
      <button onClick={handleAddNoteClick} className='bg-[#F8F9FA] py-2 shadow-lg px-3 text-[20px] fixed bottom-10 right-5 sm:right-10 md:right-20 text-black rounded font-semibold my-4 hover:cursor-pointer'>
        <FontAwesomeIcon icon={faPlus} /> Add Note
      </button>
      <div className={`notes-container ${isEditing || isAdding ? 'blur' : ''} w-full`}>
        {
          filteredNotes.map(note => (
            <div key={note._id} className="self-start flex flex-col ml-0 md:ml-10 font-semibold text-lg md:text-2xl lg:text-[40px] bg-white p-4 md:p-6 rounded-lg shadow-lg mt-5 w-full md:w-[80%] hover:cursor-pointer">
              <div className='heading border-b-2 md:border-b-4 border-blue-500 flex justify-between'>
                <h1>Title: {note.title}</h1>
                <div className='text-base md:text-lg lg:text-2xl flex gap-3'>
                  <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(note)}>
                    <FontAwesomeIcon icon={faEdit} /> Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(note._id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </button>
                </div>
              </div>
              <div className='description mt-2 md:mt-4'>Description: <p>{note.description}</p></div>
              <div className='tags mt-2 md:mt-4'>Tags: <span>{note.tag.join(', ')}</span></div>
            </div>
          ))
        }
      </div>
      {isEditing && (
        <div className="edit-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Edit Note</h2>
            <input
              type="text"
              value={editedContent.title}
              onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <textarea
              value={editedContent.description}
              onChange={(e) => setEditedContent({ ...editedContent, description: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={editedContent.tag}
              onChange={(e) => setEditedContent({ ...editedContent, tag: e.target.value })}
              className="w-full px-3 py-2 border rounded-md mb-4"
            />
            <button onClick={handleSaveEdit} className="bg-blue-600 text-white py-2 px-4 rounded-md mr-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="bg-gray-600 text-white py-2 px-4 rounded-md">Cancel</button>
          </div>
        </div>
      )}
      {isAdding && (
        <div className="add-container fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl mb-4">Add Note</h2>
            <form onSubmit={handleAddNoteSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
              <textarea
                placeholder="Description"
                value={newNote.description}
                onChange={(e) => setNewNote({ ...newNote, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={newNote.tag}
                onChange={(e) => setNewNote({ ...newNote, tag: e.target.value })}
                className="w-full px-3 py-2 border rounded-md mb-4"
              />
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md mr-2">Add</button>
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-600 text-white py-2 px-4 rounded-md">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notes;
