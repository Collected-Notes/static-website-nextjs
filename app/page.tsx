import NoteList from '../components/NoteList';
import { getSiteData, ApiResponse } from '../lib/api';
import { Metadata } from 'next';
import { cache } from 'react';

type Props = {
  params: { slug: string }
  searchParams: { page?: string }
}

const getData = cache(async (page: number): Promise<ApiResponse> => {
  return getSiteData(page);
});

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const data = await getData(currentPage);
  
  return {
    title: data.site.name,
    description: data.site.headline || undefined,
  };
}

export default async function Home({ searchParams }: Props) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const data = await getData(currentPage);

  return (
    <div className="mx-auto max-w-3xl pt-12 sm:px-4 px-6">
      <div className="relative">
        <form action="/search" method="get" className="absolute top-0 right-0 w-full sm:w-auto">
          <div className="relative">
            <input
              type="text"
              name="q"
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
          <h1 className="mt-1 text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl">{data.site.name}</h1>
          {data.site.headline && (
            <p className="mt-2 mx-auto text-xl">{data.site.headline}</p>
          )}
        </div>
        <div className="sm:mt-8">
          <NoteList 
            notes={data.notes} 
          />
        </div>
      </div>
    </div>
  );
}
