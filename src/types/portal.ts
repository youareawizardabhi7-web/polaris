export type PolarRegion = 'Antarctica' | 'Arctic' | 'Himalayas' | 'Southern Ocean';

export type ScientificDiscipline = 
  | 'Atmospheric Sciences'
  | 'Glaciology & Cryosphere'
  | 'Oceanography'
  | 'Geology & Geophysics'
  | 'Polar Biology & Ecosystems'
  | 'Space Weather & Magnetosphere';

export type DataFormat = 'NetCDF' | 'CSV' | 'GeoJSON' | 'ASCII' | 'HDF5';

export interface DatasetTimeSeriesPoint {
  date: string;
  temperature?: number;
  windSpeed?: number;
  pressure?: number;
  blackCarbon?: number;
  seaIceConcentration?: number;
  glacierMassBalance?: number;
  depth?: number;
  salinity?: number;
}

export interface DatasetItem {
  id: string;
  title: string;
  region: PolarRegion;
  discipline: ScientificDiscipline;
  station: string;
  expedition?: string;
  temporalCoverage: string; // e.g. "2018-01-01 to 2024-03-31"
  startYear: number;
  endYear: number;
  spatialCoverage: string; // e.g. "70.77°S, 11.73°E (Schirmacher Oasis)"
  coordinates?: { lat: number; lng: number };
  dataFormat: DataFormat;
  fileSize: string;
  provider: string;
  lastUpdated: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  parameters: string[];
  downloadsCount: number;
  doi: string;
  citation: string;
  variables: { name: string; unit: string; description: string }[];
  sampleData: DatasetTimeSeriesPoint[];
  fileList: { filename: string; size: string; format: string; updated: string }[];
}

export interface ResearchStation {
  id: string;
  name: string;
  nativeName?: string;
  region: PolarRegion;
  country: string;
  agency: string;
  coordinates: { lat: number; lng: number };
  established: number;
  status: 'Active' | 'Seasonal' | 'Decommissioned';
  elevation: string;
  description: string;
  availableDatasetsCount: number;
  latestObservation: {
    temp: string;
    wind: string;
    pressure: string;
    updatedAt: string;
  };
  parameters: string[];
  imageBg?: string;
}

export interface PolarExpedition {
  id: string;
  title: string;
  expeditionNumber: string;
  year: string;
  region: PolarRegion;
  leader: string;
  vesselOrBase: string;
  objectives: string[];
  participatingScientists: number;
  datasetsCollected: number;
  summary: string;
  status: 'Completed' | 'Ongoing' | 'Planned';
}

export interface FilterState {
  searchQuery: string;
  region: PolarRegion | 'All';
  discipline: ScientificDiscipline | 'All';
  station: string | 'All';
  dataFormat: DataFormat | 'All';
  startYear: number;
  endYear: number;
  sortBy: 'relevance' | 'newest' | 'downloads' | 'title';
}

export interface NLQueryResult {
  interpretedQuery: string;
  appliedFilters: {
    region?: PolarRegion;
    discipline?: ScientificDiscipline;
    station?: string;
    yearRange?: [number, number];
    parameter?: string;
  };
  matchedDatasets: DatasetItem[];
}
