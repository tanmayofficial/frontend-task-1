import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [newNoteText, setNewNoteText] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/notes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const addNote = () => {
    if (newNoteText.trim() !== "") {
      fetch("http://localhost:5000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes_text: newNoteText }),
      })
        .then((response) => response.json())
        .then((data) => setNotes([...notes, data]))
        .catch((error) => console.error("Error adding note:", error));
      setNewNoteText("");
    }
  };

  const deleteNote = (id) => {
    fetch(`http://localhost:5000/notes/${id}`, {
      method: "DELETE",
    })
      .then(() => setNotes(notes.filter((note) => note.id !== id)))
      .catch((error) => console.error("Error deleting note:", error));
  };

  const formatDate = timestamp => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return new Date(timestamp).toLocaleDateString('en-US', options);
  };
  

  return (
    <div className="App">
      <div className="notes-container">
        <div className="notes-header">Notes</div>
        <div className="input-container">
          <textarea
            placeholder="Take a note..."
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
          ></textarea>
          <button onClick={addNote}>Add Note</button>
        </div>
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <p>{note.notes_text}</p>
              <div className="note-footer">
                <span>{formatDate(note.created_on)}</span>
                <button onClick={() => deleteNote(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
