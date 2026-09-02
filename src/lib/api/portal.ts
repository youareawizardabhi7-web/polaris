import { DatasetItem, ResearchStation, PolarExpedition } from '@/types/portal';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { RESEARCH_STATIONS } from '@/lib/data/stations';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/data/media';
import { unifiedSearch, SearchResultItem, SearchCounts } from '@/lib/search';

export const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://polar-outreach.onrender.com'
).replace(/\/+$/, '');

/**
 * Fetch list of datasets from the live backend API
 */
export async function fetchDatasets(): Promise<DatasetItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/datasets`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const items = json.data || json;
    if (Array.isArray(items) && items.length > 0) {
      return items as DatasetItem[];
    }
    return MOCK_DATASETS;
  } catch (err) {
    console.warn('[POLARIS API] Failed to fetch live datasets, falling back to local data:', err);
    return MOCK_DATASETS;
  }
}

/**
 * Fetch a single dataset by ID from the live backend API
 */
export async function fetchDatasetById(id: string): Promise<DatasetItem | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/datasets/${encodeURIComponent(id)}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const item = json.data || json;
    if (item && item.id) {
      return item as DatasetItem;
    }
  } catch (err) {
    console.warn(`[POLARIS API] Failed to fetch live dataset ${id}, falling back:`, err);
  }
  return MOCK_DATASETS.find((d) => d.id === id) || null;
}

/**
 * Fetch publications from live backend API
 */
export async function fetchPublications(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/publications`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    console.warn('[POLARIS API] Failed to fetch live publications:', err);
    return [];
  }
}

/**
 * Fetch expeditions from live backend API
 */
export async function fetchExpeditions(): Promise<PolarExpedition[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/expeditions`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const items = json.data || json;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return INDIAN_POLAR_EXPEDITIONS;
  } catch (err) {
    console.warn('[POLARIS API] Failed to fetch live expeditions, falling back:', err);
    return INDIAN_POLAR_EXPEDITIONS;
  }
}

/**
 * Fetch media from live backend API
 */
export async function fetchMedia(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/media`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const items = json.data || json;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return [...MOCK_NEWS_ARTICLES, ...MOCK_VIDEOS];
  } catch (err) {
    console.warn('[POLARIS API] Failed to fetch live media, falling back:', err);
    return [...MOCK_NEWS_ARTICLES, ...MOCK_VIDEOS];
  }
}

/**
 * Fetch map locations from live backend API
 */
export async function fetchMapLocations(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/v1/map/locations`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 60 }
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    const items = json.data || json;
    if (Array.isArray(items) && items.length > 0) {
      return items;
    }
    return RESEARCH_STATIONS;
  } catch (err) {
    console.warn('[POLARIS API] Failed to fetch live map locations, falling back:', err);
    return RESEARCH_STATIONS;
  }
}

/**
 * Unified Search querying the live backend API with fallback to local search
 */
export async function searchPortal(
  query: string,
  type: string = 'all'
): Promise<{ results: SearchResultItem[]; counts: SearchCounts }> {
  if (!query.trim()) {
    return {
      results: [],
      counts: { all: 0, dataset: 0, knowledge: 0, media: 0, expedition: 0, station: 0 }
    };
  }

  try {
    const url = `${API_BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}&type=${encodeURIComponent(type)}`;
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' }
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.results)) {
        return {
          results: json.results as SearchResultItem[],
          counts: json.counts || { all: json.results.length, dataset: 0, knowledge: 0, media: 0, expedition: 0, station: 0 }
        };
      }
    }
  } catch (err) {
    console.warn('[POLARIS API] Live search failed, falling back to local unified search:', err);
  }

  // Graceful fallback to client-side local unified search
  return unifiedSearch(query, type);
}
