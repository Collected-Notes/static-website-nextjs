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
    <div className="mx-auto max-w-3xl mt-8 sm:pt-16 sm:px-4 px-6">
      <div>
        <div className="text-center flex">
          <div className="w-full">
            <h1 className="mt-1 text-4xl font-bold sm:text-5xl sm:tracking-tight lg:text-6xl">{data.site.name}</h1>
            {data.site.headline && (
              <p className="mt-2 mx-auto text-xl">{data.site.headline}</p>
            )}
          </div>
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
