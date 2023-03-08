import NotePreviews from './NotePreviews';
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import AddNewNote from './AddNewNote';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
  const [selectedNote, setSelectedNote] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);

  const deleteNote = (noteId) => {
    const userResponse = window.confirm("Are you sure?");
    if (userResponse) {
      const noteIndex = notes.findIndex(({ id }) => id === noteId);
      const newNotes = [...notes];
      newNotes.splice(noteIndex, 1);
      setNotes(newNotes);
      const remainingNotes = newNotes.filter((note) => note.id !== noteId);
      if (remainingNotes.length > 0) {
        const nextNote = remainingNotes[0];
        setSelectedNote(nextNote.id);
      } else {
        setSelectedNote(false);
      }
    }
  };
  
  const addNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      date: null,
      body: " ",
    };

    setNotes([newNote, ...notes]);
    setSelectedNote(newNote.id);
  }

  const getSelectedNote = () => {
    return notes.find((note) => note.id === selectedNote);
  }

  const updateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === selectedNote) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="LotionApp">
      <div className="header">
        <div className="left">
        <button className="menuButton" onClick={() => setMenuOpen(!menuOpen)}><strong>&#9776;</strong></button>
        </div>
        <div className="right">
          <h1>Lotion</h1>
          <h2>Like Notion, but worse.</h2>
        </div>
      </div>
      <div className='App'>
        {menuOpen && (
          <NotePreviews
            notes={notes}
            addNote={addNote}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
          />
        )}
        <AddNewNote 
          selectedNote={selectedNote}
          deleteNote={deleteNote}
          updateNote={updateNote}
          getSelectedNote={getSelectedNote}
        />
      </div>
    </div>
  );
}

export default App;
