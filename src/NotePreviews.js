function NotePreviews({notes, addNote, selectedNote, setSelectedNote }) {
  let notePreview; //CHecking the notes to see if there is any note
  if(notes.length === 0) { //No notes show the preview "No Note Yet"
    notePreview = (
      <div className= "noNote">
        <h3>No Note Yet</h3>
      </div>
    );
  } else {
    notePreview = notes.map((note) => (
      <div className={`newNote ${note.id === selectedNote && "active"}`} // For each note added in the notes array start creating a div with the `newNote` class
        onClick={() => setSelectedNote(note.id)}>
        <h4>{note.title}</h4>
        <small>
          {note.datetime}
        </small>
        <div style={{paddingTop:"10px"}}dangerouslySetInnerHTML={{__html:note.body && note.body.substr(0,100) + "..."}}></div>
        </div>
    ));
  }
  
  return ( //Creates the sidebar that has the note preiew including the addNote button!
    <div className="leftColumn">
      <div className="noteHeader">
        <div className="NoteHeaderTitle">
          <h1>Mobha's Notes</h1>
        </div>
        <button onClick={addNote}><strong>&#43;</strong></button>
      </div>
        {notePreview}
    </div>
  );
}
  
export default NotePreviews;




