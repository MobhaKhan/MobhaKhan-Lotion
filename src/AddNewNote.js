import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = { //These are the modules I needed for the reactQuill toolbar
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

function AddNewNote({ selectedNote, deleteNote, updateNote, getSelectedNote }) {
  const [noteTitle, setNoteTitle] = useState(""); // Initializing state variables for title, body, datetime, and edit mode for the note
  const [noteBody, setNoteBody] = useState("");
  const [noteDateTime, setNoteDateTime] = useState("");
  const [editMode, setEditMode] = useState(false); // Edit mode should be false intailly
  const noteBodyRef = useRef(null); //Thanks a huge bunch to the TA for helping me with this part!

  const titleChange = (event) => { // change the title to the event value
    setNoteTitle(event.target.value);
  };

  const textboxChange = (value) => { // changes the textbox body to the added values
    setNoteBody(value);
  };

  const saveButton = () => { //Upon hitting the save button get the date and format is accordingly
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
  
    updateNote({ // Update the selected note with the new title, body, and datetime
      ...getSelectedNote(),
      title: noteTitle || getSelectedNote().title,
      body: noteBody || getSelectedNote().body,
      datetime: formattedDate,
    });
  
    setNoteTitle(""); // Upon the updating / saving reset all the state varailbes to defult
    setNoteDateTime("");
    setNoteBody("");
    setEditMode(false);
    noteBodyRef.current.getEditor().disable(); // diabling the textbox and title upon updating/saving
    document.querySelector(".textboxTitle input[type='text']").setAttribute("disabled", "disabled"); 
    setEditMode(true); // After this editing can happen after pressing save
  };
  
  const editButton = () => { // Going into the editMode for the selectedNote enable the editing
    setEditMode(false);
    noteBodyRef.current.getEditor().enable();
  };

  const gettingDataChanged = (event) => { //changing of the input will update the DataTIme accordingly
    setNoteDateTime(event.target.value);
  };

  return ( // Creating the right column with the textbox, title and date. If editMode state is true or false show the save or edit button.
    <div className="rightColumn">
      {selectedNote && (
        <div className="notes">
          <div className="textboxTitle">
            <input
              type="text"
              value={noteTitle || getSelectedNote().title} // Change the title onChange
              onChange={titleChange}
              disabled={editMode} // edit mode should be disables upon save
            />
            {editMode ? (
              <button onClick={editButton} style={{ paddingTop: "35px", fontSize: "20px", marginRight: "10px" }}>Edit</button>
            ) : (
              <button onClick={saveButton} style={{ paddingTop: "35px", fontSize: "20px", marginRight: "10px" }}>Save</button>
            )}
            <button onClick={() => deleteNote(getSelectedNote().id)} style={{ paddingTop: "35px", fontSize:"20px" }}>Delete</button>
          </div>
          <div className="date">
            {getSelectedNote().datetime && <p style={{ fontFamily: "calibri", fontSize: "20px", paddingBottom: "10px" }}>{getSelectedNote().datetime}</p>}
            {!getSelectedNote().datetime && (
              <input
                type="datetime-local"
                style={{ border: "none", fontSize: "20px", fontFamily: "calibri", paddingBottom: "10px" }}
                value={noteDateTime} //Handling the date change here
                onChange={gettingDataChanged}
              />
            )}
          </div>
          <ReactQuill  // USing reactQuill and the css styling snow to create the textbox!
            theme="snow"
            style={{height:"100vh", width:"100%", fontSize:"20px"}}
            ref={noteBodyRef}
            value={noteBody || getSelectedNote().body}
            onChange={textboxChange}
            modules={modules}
            placeholder="Start typing your note here!"
        />
      </div>
    )}
    {!selectedNote && ( //If there is no note selected or show the preview of the "noNote" class
      <div className="noNote" style = {{marginTop:"40vh"}}>
        <h3>Select a note, or create a new note.</h3>
      </div>
    )}
  </div>

  );
}

export default AddNewNote;
