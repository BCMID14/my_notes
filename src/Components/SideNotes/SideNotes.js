import React, {useEffect, useState} from 'react';
import './SideNotes.css';
import {useSelector} from 'react-redux';
import Note from './Note/Note';

export default function SideNotes () {
    const {notes} = useSelector(state => state.notesReducer);

    const [notesList, setNotesList] = useState();

    useEffect(() => {
        setNotesList(notes);
    }, [notes]);

    if(!notesList) {
        return <h1>Loading....</h1>
    };

    const preventForm = e => e.preventDefaults();

    const handleFilter = e => {
        const stateCopy = [...notes];
        const filteredArray = stateCopy.filter((item) => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
        setNotesList(filteredArray);
    };

  return (
    <div className='notes-display'>
        <h2>Mes Notes</h2>
        <form onSubmit={preventForm}>
            <input 
            onChange={handleFilter}
             type="text" 
             id='search-notes'
             placeholder='Rechercher'
             />
        </form>
        <ul className='notes-list'>
            {notesList.map((item) => (
                <Note
                 key={item.id}
                 id={item.id}
                 title={item.title}
                 subtitle={item.subtitle}
                 body={item.body}
                />
            ))}
        </ul>
    </div>
  )
}
