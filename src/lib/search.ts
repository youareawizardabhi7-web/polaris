import { MOCK_DATASETS } from '@/lib/data/datasets';
import { MOCK_KNOWLEDGE_RESOURCES } from '@/lib/data/knowledge';
import { MOCK_NEWS_ARTICLES, MOCK_VIDEOS } from '@/lib/data/media';
import { INDIAN_POLAR_EXPEDITIONS } from '@/lib/data/expeditions';
import { RESEARCH_STATIONS } from '@/lib/data/stations';

export interface SearchResultItem {
  id: string;
  type: 'dataset' | 'knowledge' | 'media' | 'expedition' | 'station';
  title: string;
  description: string;
  url: string;
  score: number;
  date?: string;
  tags?: string[];
  category?: string;
  location?: string;
  metadata?: Record<string, any>;
}

export interface SearchCounts {
  all: number;
  dataset: number;
  knowledge: number;
  media: number;
  expedition: number;
  station: number;
}

export const unifiedSearch = (queryStr: string, typeFilter: string = 'all'): { results: SearchResultItem[]; counts: SearchCounts } => {
  const q = queryStr.trim().toLowerCase();
  const results: SearchResultItem[] = [];

  const counts: SearchCounts = {
    all: 0,
    dataset: 0,
    knowledge: 0,
    media: 0,
    expedition: 0,
    station: 0,
  };

  if (!q) {
    return { results: [], counts };
  }

  // 1. DATASETS
  MOCK_DATASETS.forEach((ds) => {
    let score = 0;
    const titleL = ds.title.toLowerCase();
    const descL = (ds.shortDescription + ' ' + ds.fullDescription).toLowerCase();
    const stationL = ds.station.toLowerCase();
    const tagsL = ds.tags.map((t) => t.toLowerCase());

    if (titleL === q) score += 100;
    else if (titleL.startsWith(q)) score += 60;
    else if (titleL.includes(q)) score += 40;

    if (tagsL.some((t) => t.includes(q))) score += 35;
    if (stationL.includes(q) || ds.region.toLowerCase().includes(q) || ds.discipline.toLowerCase().includes(q)) score += 25;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.dataset++;
      counts.all++;
      results.push({
        id: ds.id,
        type: 'dataset',
        title: ds.title,
        description: ds.shortDescription,
        url: `/datasets/${ds.id}`,
        score,
        date: ds.lastUpdated,
        tags: ds.tags,
        category: ds.discipline,
        location: ds.station,
        metadata: {
          region: ds.region,
          dataFormat: ds.dataFormat,
          fileSize: ds.fileSize,
          doi: ds.doi
        }
      });
    }
  });

  // 2. KNOWLEDGE RESOURCES
  MOCK_KNOWLEDGE_RESOURCES.forEach((kr) => {
    let score = 0;
    const titleL = kr.title.toLowerCase();
    const descL = kr.description.toLowerCase();
    const tagsL = kr.tags.map((t) => t.toLowerCase());

    if (titleL === q) score += 100;
    else if (titleL.startsWith(q)) score += 60;
    else if (titleL.includes(q)) score += 40;

    if (tagsL.some((t) => t.includes(q))) score += 35;
    if (kr.category.toLowerCase().includes(q) || kr.author.toLowerCase().includes(q)) score += 25;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.knowledge++;
      counts.all++;
      results.push({
        id: kr.id,
        type: 'knowledge',
        title: kr.title,
        description: kr.description,
        url: `/knowledge/${kr.id}`,
        score,
        date: kr.publishedDate,
        tags: kr.tags,
        category: kr.category,
        metadata: {
          author: kr.author,
          readingTime: kr.readingTime
        }
      });
    }
  });

  // 3. MEDIA (NEWS & VIDEOS)
  MOCK_NEWS_ARTICLES.forEach((na) => {
    let score = 0;
    const titleL = na.title.toLowerCase();
    const descL = na.summary.toLowerCase();
    const tagsL = na.tags.map((t) => t.toLowerCase());

    if (titleL === q) score += 100;
    else if (titleL.startsWith(q)) score += 60;
    else if (titleL.includes(q)) score += 40;

    if (tagsL.some((t) => t.includes(q))) score += 35;
    if (na.category.toLowerCase().includes(q) || na.author.toLowerCase().includes(q)) score += 25;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.media++;
      counts.all++;
      results.push({
        id: na.id,
        type: 'media',
        title: na.title,
        description: na.summary,
        url: `/media/${na.id}`,
        score,
        date: na.publishedDate,
        tags: na.tags,
        category: na.category,
        metadata: {
          source: na.source,
          readingTime: na.readingTime
        }
      });
    }
  });

  MOCK_VIDEOS.forEach((vid) => {
    let score = 0;
    const titleL = vid.title.toLowerCase();
    const descL = vid.description.toLowerCase();

    if (titleL === q) score += 95;
    else if (titleL.startsWith(q)) score += 55;
    else if (titleL.includes(q)) score += 35;

    if (vid.category.toLowerCase().includes(q)) score += 25;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.media++;
      counts.all++;
      results.push({
        id: vid.id,
        type: 'media',
        title: vid.title,
        description: vid.description,
        url: `/media`,
        score,
        date: vid.publishedDate,
        category: `Video (${vid.category})`,
        metadata: {
          duration: vid.duration
        }
      });
    }
  });

  // 4. EXPEDITIONS
  INDIAN_POLAR_EXPEDITIONS.forEach((exp) => {
    let score = 0;
    const titleL = exp.title.toLowerCase();
    const descL = (exp.summary + ' ' + exp.objectives.join(' ')).toLowerCase();

    if (titleL === q || exp.expeditionNumber.toLowerCase() === q) score += 100;
    else if (titleL.startsWith(q)) score += 60;
    else if (titleL.includes(q)) score += 40;

    if (exp.region.toLowerCase().includes(q) || exp.vesselOrBase.toLowerCase().includes(q) || exp.leader.toLowerCase().includes(q)) score += 30;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.expedition++;
      counts.all++;
      results.push({
        id: exp.id,
        type: 'expedition',
        title: exp.title,
        description: exp.summary,
        url: `/expeditions`,
        score,
        date: exp.year,
        category: exp.region,
        location: exp.vesselOrBase,
        metadata: {
          status: exp.status,
          scientists: exp.participatingScientists
        }
      });
    }
  });

  // 5. STATIONS
  RESEARCH_STATIONS.forEach((st) => {
    let score = 0;
    const nameL = st.name.toLowerCase();
    const descL = st.description.toLowerCase();

    if (nameL === q || st.id.toLowerCase() === q) score += 100;
    else if (nameL.startsWith(q)) score += 60;
    else if (nameL.includes(q)) score += 40;

    if (st.region.toLowerCase().includes(q) || st.country.toLowerCase().includes(q)) score += 30;
    if (descL.includes(q)) score += 15;

    if (score > 0) {
      counts.station++;
      counts.all++;
      results.push({
        id: st.id,
        type: 'station',
        title: st.name,
        description: st.description,
        url: `/map?station=${st.id}`,
        score,
        category: st.region,
        location: `${st.coordinates.lat}°, ${st.coordinates.lng}°`,
        metadata: {
          status: st.status,
          elevation: st.elevation
        }
      });
    }
  });

  // Sort descending by relevance score
  results.sort((a, b) => b.score - a.score);

  // Apply category filter if specified
  const filteredResults = typeFilter === 'all' 
    ? results 
    : results.filter((r) => r.type === typeFilter);

  return { results: filteredResults, counts };
};
