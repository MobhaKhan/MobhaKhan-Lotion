import NotePreviews from './NotePreviews';
import { useState, useEffect } from "react";
import uuid from "react-uuid";
import AddNewNote from './AddNewNote';

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []); // Using useState a notes variable is initialized to an empty array that will use local storage
  const [selectedNote, setSelectedNote] = useState(false); // SlectedNote varialbe is created using a useState hook (selectedNote is the current note we are on)
  const [menuOpen, setMenuOpen] = useState(true); // This useState variable menuOpen is used to play around with the visiability if the sidebar 

  const deleteNote = (noteId) => { // First diplays a confirmation message to delete
    const userResponse = window.confirm("Are you sure?");
    if (userResponse) {
      const noteIndex = notes.findIndex(({ id }) => id === noteId); //Finds the index of the note to delete
      const newNotes = [...notes];
      newNotes.splice(noteIndex, 1); // Once found, it creates a new array that doesn't have the deleted note 
      setNotes(newNotes); // updates the notes 
      const remainingNotes = newNotes.filter((note) => note.id !== noteId); // Updating the selectedNote to either the next note in the array
      if (remainingNotes.length > 0) {
        const nextNote = remainingNotes[0];
        setSelectedNote(nextNote.id);
      } else {
        setSelectedNote(false); // If there isn't any in the array it sets the selectedNote back to false (default)
      }
    }
  };
  
  const addNote = () => { // Creating a new note object that will have a unique ID, default title of "Untitled", empty body, and null date
    const newNote = {
      id: uuid(),
      title: "Untitled",
      date: null,
      body: " ",
    };
    setNotes([newNote, ...notes]); // Updating the notes state by adding the newNote object to the front of the notes array
    setSelectedNote(newNote.id); // Change the selectedNote state to the ID of the newly created note for editing
  }

  const getSelectedNote = () => {// looking for the note in notes array that has the same ID as the currently selected note 
    return notes.find((note) => note.id === selectedNote);
  }

  const updateNote = (updatedNote) => { // Creating new array of notes over the current notes array if changes have been made to the note by method mapping
    const updatedNotesArray = notes.map((note) => {
      if (note.id === selectedNote) { // If the current note's ID matches the selected note's ID then you return the updatedNote instead of the current (old) note
        return updatedNote;
      }
      return note; // If not then return the current note object unchanged
    });
    setNotes(updatedNotesArray);// Updating the notes state with the updated notes array
  }

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);     // WHen the notes states start changing you update the local storage with the new notes array

  return ( // Creating the header, using the setMenuOpen state play with the side bar, and passing the arguments to each js file to play aroud with
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
