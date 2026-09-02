import { PolarExpedition } from '@/types/portal';
export type { PolarExpedition };

export const INDIAN_POLAR_EXPEDITIONS: PolarExpedition[] = [
  {
    id: 'exp-ant-46',
    title: '46th Indian Scientific Expedition to Antarctica (46th IAE)',
    expeditionNumber: '46th IAE',
    year: '2026-2027',
    region: 'Antarctica',
    leader: 'Polar Logistics & Scientific Coordination Committee',
    vesselOrBase: 'Maitri Station & Bharati Station',
    objectives: [
      'Operational deployment of automated weather telemetry network across Queen Maud Land',
      'Advanced 200m deep ice core palaeoclimate drilling in Dronning Maud Land',
      'Continuous magnetospheric storm and space weather monitoring during 2026 Solar Maximum',
      'Fast-ice altimetry and satellite ground truth calibration in Larsemann Hills'
    ],
    participatingScientists: 56,
    datasetsCollected: 18,
    summary: 'The active 46th IAE conducts year-round atmospheric, glaciological, and space weather observations across Maitri and Bharati stations, featuring real-time POLARIS data telemetry.',
    status: 'Ongoing',
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005'],
    relatedStationIds: ['maitri-station', 'bharati-station'],
    relatedKnowledgeIds: ['understanding-antarctic-sea-ice', 'indias-polar-research-programme'],
    relatedMediaIds: ['indias-latest-antarctic-research-expedition', 'up-1']
  },
  {
    id: 'exp-arc-18',
    title: 'Indian Arctic Expedition 2026-2027',
    expeditionNumber: 'Arctic 2026-27',
    year: '2026-2027',
    region: 'Arctic',
    leader: 'Arctic Studies Group',
    vesselOrBase: 'Himadri Station (Ny-Ålesund, Svalbard)',
    objectives: [
      'Annual maintenance and sensor upgrade of IndARC subsurface oceanographic mooring',
      'Year-round black carbon mass absorption cross-section measurements at 78.92° N',
      'High-resolution hydrographic sampling of Kongsfjorden meltwater discharge',
      'Microbial genomic sequencing in Svalbard fjord sediments'
    ],
    participatingScientists: 26,
    datasetsCollected: 14,
    summary: 'The 2026–2027 Arctic field campaign operates continuously at Himadri Station in Svalbard, generating real-time atmospheric aerosol profiles and fjord hydrography.',
    status: 'Ongoing',
    relatedDatasetIds: ['POL-ARC-2024-002'],
    relatedStationIds: ['himadri-station'],
    relatedKnowledgeIds: ['indias-polar-research-programme'],
    relatedMediaIds: ['up-2', 'vid-2']
  },
  {
    id: 'exp-ant-45',
    title: '45th Indian Scientific Expedition to Antarctica (45th IAE)',
    expeditionNumber: '45th IAE',
    year: '2025-2026',
    region: 'Antarctica',
    leader: 'Dr. Rahul Kar',
    vesselOrBase: 'MV Vasiliy Golovnin & Maitri / Bharati Bases',
    objectives: [
      'Completion of geotechnical site surveys for the next-generation Maitri II station',
      'Deployment of autonomous lake monitoring buoys in Schirmacher Oasis',
      'Geophysical reflection seismic survey along Princess Astrid Coast margin'
    ],
    participatingScientists: 50,
    datasetsCollected: 42,
    summary: 'The 45th IAE successfully completed summer scientific operations, establishing autonomous lake monitoring buoys and delivering 42 open datasets to the POLARIS archive.',
    status: 'Completed'
  },
  {
    id: 'exp-so-13',
    title: '13th Southern Ocean Expedition (SOE-13)',
    expeditionNumber: '13th SOE',
    year: '2025-2026',
    region: 'Southern Ocean',
    leader: 'Ocean Sciences Division',
    vesselOrBase: 'ORV Sagar Kanya',
    objectives: [
      'Deep CTD hydrographic profile transect from 40°S down to 68°S',
      'Quantification of oceanic anthropogenic carbon uptake and DIC sinks',
      'Antarctic Bottom Water (AABW) freshening and ocean circulation mapping'
    ],
    participatingScientists: 35,
    datasetsCollected: 28,
    summary: 'A 65-day deep ocean research cruise aboard ORV Sagar Kanya producing high-resolution CTD profiles and carbon flux inventories across the Indian sector of the Southern Ocean.',
    status: 'Completed'
  },
  {
    id: 'exp-ant-43',
    title: '43rd Indian Antarctic Expedition (43rd IAE)',
    expeditionNumber: '43rd IAE',
    year: '2023-2024',
    region: 'Antarctica',
    leader: 'Dr. Rahul Kar',
    vesselOrBase: 'MV Vasiliy Golovnin & Maitri / Bharati Stations',
    objectives: [
      'Installation of automated weather station sensors in Schirmacher Oasis',
      'Palaeoclimate ice core drilling up to 100m depth in Dronning Maud Land',
      'Geophysical deep reflection seismic profile across Larsemann Hills'
    ],
    participatingScientists: 48,
    datasetsCollected: 36,
    summary: 'The 43rd IAE successfully deployed 48 scientists across Maitri and Bharati stations, collecting critical ice cores and automated weather observations.',
    status: 'Completed'
  },
  {
    id: 'exp-arc-16',
    title: '16th Indian Arctic Expedition',
    expeditionNumber: '16th Arctic',
    year: '2023-2024',
    region: 'Arctic',
    leader: 'Dr. Archana Dayal',
    vesselOrBase: 'Himadri Station (Ny-Ålesund, Svalbard)',
    objectives: [
      'Annual maintenance and data retrieval from IndARC underwater mooring',
      'High-resolution aerosol black carbon mass absorption cross-section sampling'
    ],
    participatingScientists: 22,
    datasetsCollected: 18,
    summary: 'Conducted atmospheric aerosol profiling at Himadri Station, and retrieved continuous oceanographic data from the IndARC subsurface mooring in Kongsfjorden.',
    status: 'Completed'
  },
  {
    id: 'exp-him-08',
    title: 'HIMANCHAL High-Mountain Asian Cryosphere Campaign',
    expeditionNumber: 'HIMANCHAL-08',
    year: '2025-2026',
    region: 'Himalayas',
    leader: 'Dr. Parmanand Sharma',
    vesselOrBase: 'Chhota Shigri & Sutri Dhaka High Altitude Stations',
    objectives: [
      'Glaciological mass balance stake measurements on Chhota Shigri Glacier',
      'DGPS surface ice velocity grid survey across accumulation zone',
      'Sampling seasonal snow pits for heavy metal and microplastic deposition'
    ],
    participatingScientists: 20,
    datasetsCollected: 16,
    summary: 'Integrated field campaign tracking Western Himalayan glacier ablation rates, seasonal meltwater discharge, and black carbon transport from the Indo-Gangetic Plains.',
    status: 'Completed'
  }
];
