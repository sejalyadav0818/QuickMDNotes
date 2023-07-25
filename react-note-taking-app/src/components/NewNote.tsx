import { NoteForm  } from "./NoteForm";
import { NoteData ,Tag} from "../App";

type NewNotesProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tags: Tag) => void
    availableTags: Tag[]
};
export function NewNote({ onSubmit, onAddTag, availableTags }: NewNotesProps) {
    return <>
        <h1 className="mb-4">New Note</h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} />
    </>
} 