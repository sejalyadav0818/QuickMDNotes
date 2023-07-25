import 'bootstrap/dist/css/bootstrap.min.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { useLocalStorage } from './components/uselocalStorage';
import { useMemo } from 'react';
import { v4 as uuidV4 } from "uuid"
import { NewNote } from './components/NewNote';
import {NoteList }from './components/NoteList';

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", [])



  const noteswithtags = useMemo(() => {
    return notes.map(notes => {
      return {
        ...notes, tags: tags.filter(tag => {
          return notes.tagIds.includes(tag.id)
        })
      }
    })
  }, [notes, tags])

  //i CAN 

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
      ]
    })
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route path='/' element={<NoteList notes={noteswithtags} onDeleteTag={} onUpdateTag={}/>} />
        <Route
          path="/new"
          element={
            <NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />
          }
        />
        
        <Route path='*' element={<Navigate to="/" />} />
        {/* <Route path='/:id' >
          <Route index element={<h1>show</h1>} />
          <Route path='edit' element={<h1>edit</h1>} />
        </Route> */}
      </Routes>
    </Container>
  )
}

export default App
//https://www.youtube.com/watch?v=j898RGRw0b4&list=RDCMUCFbNIlppjAuEX4znoulh0Cw&start_radio=1&t=174s