import React, { useContext, useEffect, useState } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { FirebaseContext } from "../context/firebase/firebaseContext";
import { AlertContext } from "../context/alert/alertContext";


export const Notes = ({ notes }) => {
  const  {removeNote}  = useContext(FirebaseContext);
  const initialState = "";
  const [value, setValue] = useState(initialState);
  const alert = useContext(AlertContext);

  useEffect(() => { 
    if (value) {
      removeNote(value) 
      alert.show("Заметка УДАЛЕНА", "success"); }    
  }, [value]);

  return (
    <TransitionGroup component="ul" className="list-group">
      {notes.map((note) => (
        <CSSTransition classNames={"note"} timeout={1000} key={note.id}>
          <li className="list-group-item note" key={note.id}>
            <div>
              <strong> {note.title}</strong>
              <small>{note.date} </small>
            </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => setValue(note.id)} value={note.id}
            >
              &times;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};
