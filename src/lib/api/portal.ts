import { DatasetItem, ResearchStation, PolarExpedition, BackendMapLocation, PolarMapStation, PolarRegion } from '@/types/portal';
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
 * Normalize region string from backend to standard PolarRegion type
 */
export function normalizeRegion(reg?: string): PolarRegion {
  if (!reg) return 'Antarctica';
  const r = reg.toUpperCase();
  if (r.includes('ARCTIC')) return 'Arctic';
  if (r.includes('HIMALAYA')) return 'Himalayas';
  if (r.includes('SOUTHERN')) return 'Southern Ocean';
  return 'Antarctica';
}

/**
 * Normalize backend map location object to standard PolarMapStation structure
 */
export function normalizeMapLocation(item: BackendMapLocation, index: number = 0): PolarMapStation {
  const isExpedition = item.type === 'expedition';
  const name = item.title || item.stationName || item.id || 'Polar Observatory';
  const region = normalizeRegion(item.region);
  const locationStr = item.location || `${item.lat.toFixed(2)}°, ${item.lng.toFixed(2)}°`;
  const typeStr = isExpedition ? 'expedition' : 'station';

  // Create guaranteed unique ID across all backend items
  const baseId = item.id || name.toLowerCase().replace(/\s+/g, '-');
  const uniqueId = `${typeStr}-${baseId}-${index}`;

  return {
    id: uniqueId,
    name,
    type: typeStr,
    region,
    location: locationStr,
    lat: typeof item.lat === 'number' ? item.lat : Number(item.lat),
    lng: typeof item.lng === 'number' ? item.lng : Number(item.lng),
    established: item.established,
    status: item.status || 'Active',
    url: item.url || null,
    description: item.description,
    photoCount: item.photoCount,
    paperCount: item.paperCount,
    coverImage: item.coverImage,
    agency: item.agency,
    elevation: item.elevation,
    rawBackendData: item
  };
}

/**
 * Fetch map locations directly from live backend API
 */
export async function fetchMapLocations(): Promise<PolarMapStation[]> {
  const res = await fetch(`${API_BASE_URL}/api/v1/map/locations`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch backend map locations: HTTP ${res.status}`);
  }
  const json = await res.json();
  const items: BackendMapLocation[] = json.data || json;
  if (!Array.isArray(items)) {
    throw new Error('Invalid backend response: data is not an array');
  }
  return items.map((item, index) => normalizeMapLocation(item, index));
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
