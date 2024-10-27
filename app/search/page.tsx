import { searchNotes, SearchResponse } from '../../lib/api';
import NoteList from '../../components/NoteList';
import Link from 'next/link';
import { Metadata } from 'next';

type Props = {
  searchParams: { q?: string }
}

export const metadata: Metadata = {
  title: 'Search Results',
};

export default async function SearchPage({ searchParams }: Props) {
  const searchTerm = searchParams.q || '';

  let searchResults: SearchResponse = { notes: [] };
  let error = '';

  if (searchTerm) {
    try {
      searchResults = await searchNotes(searchTerm);
    } catch (e) {
      error = 'An error occurred while searching. Please try again.';
      console.error('Search error:', e);
    }
  }

  return (
    <div className="mx-auto max-w-3xl pt-12 sm:px-4 px-6">
      <div className="relative">
        <Link href="/" className="sm:mb-0 mb-4 block">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
            <path d="M0 0h48v48h-48z" fill="none"></path>
            <path d="M40 22h-24.34l11.17-11.17-2.83-2.83-16 16 16 16 2.83-2.83-11.17-11.17h24.34v-4z" fill="currentColor"></path>
          </svg>
        </Link>
        <form action="/search" method="get" className="absolute top-0 right-0 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              name="q"
              defaultValue={searchTerm}
              placeholder="Search notes..."
              className="w-full sm:w-48 py-1 px-3 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
            />
            <button 
              type="submit" 
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
        <div className="text-center pt-16 sm:pt-16">
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Search Results</h1>
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {searchTerm && !error && (
          <div className="sm:mt-8">
            <NoteList notes={searchResults.notes} />
          </div>
        )}
      </div>
    </div>
  );
}
