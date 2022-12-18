import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    let host = "http://127.0.0.1:8000";
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  // get all notes
  const getNotes = async () => {
      const responce = await fetch(`${host}/api/notes/note/`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Token " + localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      const json = await responce.json();
    //   console.log(json)
    setNotes(json);

  }

  // Add a Note
  const addNote = async (title, description, tag) => {
    // to
    const response = await fetch(`${host}/api/notes/note/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token " + localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const note = await response.json();

    
    setNotes(notes.concat(note));
  };

  // Delete a note
  const deleteNote = async (id) => {
    console.log("deleting a node of id" + id);
    const response = await fetch(`${host}/api/notes/note/${id}/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization":"Token " + localStorage.getItem('token')
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      // const json = await response.json(); 
      // console.log(json);
    const newNotes = notes.filter((note) => {
      return note.id !== id;
    });
    setNotes(newNotes);
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call
    // Default options are marked with *
    
    const response = await fetch(`${host}/api/notes/note/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization":"Token " + localStorage.getItem('token')
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
    });
    const json = await response.json(); 
    // console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
      let element = newNotes[index];
      if (element.id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
