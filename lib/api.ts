const API_URL = process.env.API_URL || 'https://api.collectednotes.com';
const SITE_PATH = process.env.SITE_PATH || 'my-own-personal-website';

export type Site = {
  id: number;
  name: string;
  headline: string | null;
};

export type Note = {
  id: number;
  title: string;
  path: string;
  created_at: string;
};

export type NoteDetails = {
  id: number;
  title: string;
  body: string;
  created_at: string;
  path: string;
};

export type ApiResponse = {
  site: Site;
  total_notes: number;
  notes: Note[];
};

export type NoteResponse = {
  note: NoteDetails;
};

export type SearchResponse = {
  notes: NoteDetails[];
};

async function fetchAPI(endpoint: string) {
  const res = await fetch(`${API_URL}${endpoint}`, {
    cache: 'no-store',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }  

  return res.json();
}

export async function getSiteData(page: number = 1): Promise<ApiResponse> {
  return fetchAPI(`/${SITE_PATH}.json?page=${page}`);
}

export async function getNoteData(path: string): Promise<NoteResponse> {
  return fetchAPI(`/${SITE_PATH}/${path}.json`);
}

export async function searchNotes(term: string): Promise<SearchResponse> {
  const params = new URLSearchParams({ term });
  const response = await fetchAPI(`/sites/${SITE_PATH}/notes/search?${params.toString()}`);
  return { notes: response };
}
