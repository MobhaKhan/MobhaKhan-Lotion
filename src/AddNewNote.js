import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";


const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["clean"],
  ],
};

function AddNewNote({ selectedNote, deleteNote, updateNote, getSelectedNote }) {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [noteDateTime, setNoteDateTime] = useState("");
  const [editMode, setEditMode] = useState(false);

  const noteBodyRef = useRef(null);

  const handleTitleChange = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleBodyChange = (value) => {
    setNoteBody(value);
  };

  const handleSaveClick = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });
  
    updateNote({
      ...getSelectedNote(),
      title: noteTitle || getSelectedNote().title,
      body: noteBody || getSelectedNote().body,
      datetime: formattedDate,
    });
  
    setNoteTitle("");
    setNoteDateTime("");
    setNoteBody("");
    setEditMode(false);
    noteBodyRef.current.getEditor().disable();
    document.querySelector(".textboxTitle input[type='text']").setAttribute("disabled", "disabled");
    setEditMode(true);
  };
  
  const handleEditClick = () => {
    setEditMode(false);
    noteBodyRef.current.getEditor().enable();
  };


  const handleDateTimeChange = (event) => {
    setNoteDateTime(event.target.value);
  };

  return (
    <div className="rightColumn">
      {selectedNote && (
        <div className="notes">
          <div className="textboxTitle">
            <input
              type="text"
              value={noteTitle || getSelectedNote().title}
              onChange={handleTitleChange}
              disabled={editMode}
            />
            {editMode ? (
              <button onClick={handleEditClick} style={{ paddingTop: "35px", fontSize: "20px", marginRight: "10px" }}>Edit</button>
            ) : (
              <button onClick={handleSaveClick} style={{ paddingTop: "35px", fontSize: "20px", marginRight: "10px" }}>Save</button>
            )}
            <button onClick={() => deleteNote(getSelectedNote().id)} style={{ paddingTop: "35px", fontSize:"20px" }}>Delete</button>
          </div>
          <div className="date">
            {getSelectedNote().datetime && <p style={{ fontFamily: "calibri", fontSize: "20px", paddingBottom: "10px" }}>{getSelectedNote().datetime}</p>}
            {!getSelectedNote().datetime && (
              <input
                type="datetime-local"
                style={{ border: "none", fontSize: "20px", fontFamily: "calibri", paddingBottom: "10px" }}
                value={noteDateTime}
                onChange={handleDateTimeChange}
              />
            )}
          </div>
          <ReactQuill
            theme="snow"
            style={{height:"100vh", width:"100%", fontSize:"20px"}}
            ref={noteBodyRef}
            value={noteBody || getSelectedNote().body}
            onChange={handleBodyChange}
            modules={modules}
            placeholder="Start typing your note here!"
        />
      </div>
    )}
    {!selectedNote && (
      <div className="noNote" style = {{marginTop:"40vh"}}>
        <h3>Select a note, or create a new note.</h3>
      </div>
    )}
  </div>

  );
}

export default AddNewNote;
