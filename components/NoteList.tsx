import Link from 'next/link';
import { Note } from '../lib/api';
import { formatDistanceToNow } from 'date-fns';

export default function NoteList({ 
  notes, 
  currentPage,
  totalNotes,
}: { 
  notes: Note[], 
  currentPage: number,
  totalNotes: number,
}) {
  return (
    <ul role="list" className="pt-5 divide-y divide-gray-200 dark:divide-gray-800">
      {notes.map((note) => (
        <li key={note.id} className="py-5 px-6">
          <Link href={`/${note.path}`} className="leading-tight">
            <div className="mt-1 text-xl font-semibold sm:2text-xl sm:tracking-tight lg:text-3xl">{note.title}</div>
            <time dateTime={note.created_at} className="whitespace-nowrap text-sm text-gray-500">
              {formatDistanceToNow(new Date(note.created_at), { addSuffix: true })}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
