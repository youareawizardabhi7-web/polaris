export type MediaCategory = 
  | 'All'
  | 'News'
  | 'Expedition Updates'
  | 'Announcements'
  | 'Research Highlights'
  | 'Events'
  | 'Videos'
  | 'Photo Stories';

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  category: 'News' | 'Announcements' | 'Research Highlights' | 'Expedition Updates';
  summary: string;
  content: string[];
  author: string;
  source: string;
  publishedDate: string;
  readingTime: string;
  imageUrl: string;
  tags: string[];
  featured: boolean;
  relatedDatasetIds: string[];
  relatedExpeditionIds: string[];
  relatedKnowledgeIds: string[];
}

export interface ExpeditionUpdateItem {
  id: string;
  expeditionId: string;
  expeditionTitle: string;
  region: string;
  date: string;
  summary: string;
  details: string;
  relatedDatasetIds: string[];
}

export interface VideoItem {
  id: string;
  title: string;
  category: 'Research' | 'Expeditions' | 'Education' | 'Interviews' | 'Field Work';
  duration: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  publishedDate: string;
  relatedDatasetIds?: string[];
}

export interface PhotoStory {
  id: string;
  title: string;
  caption: string;
  category: string;
  location: string;
  imageUrl: string;
  photographer: string;
  date: string;
}

export interface EventItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  eventType: 'Conference' | 'Workshop' | 'Symposium' | 'Public Lecture';
  description: string;
  registrationLink: string;
}

export const MOCK_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 'indias-latest-antarctic-research-expedition',
    slug: 'indias-latest-antarctic-research-expedition',
    title: "46th Indian Antarctic Expedition Deploys Real-Time Telemetry Sensors Across Maitri & Bharati Bases",
    category: 'Expedition Updates',
    summary: 'The active 46th Indian Antarctic Expedition team has successfully deployed high-frequency automatic weather stations and ice core drills for the 2026 season.',
    content: [
      "The 46th Indian Scientific Expedition to Antarctica (46th IAE) has launched its summer observational campaign in East Antarctica, deploying next-generation meteorological telemetry sensors across Schirmacher Oasis and Larsemann Hills.",
      "A total of 56 scientists representing atmospheric physics, glaciology, oceanography, and biology are collaborating during the 2026 season. Key achievements include the deployment of real-time katabatic wind anemometers near Maitri Base and continuous ice surface flow DGPS mapping.",
      "Expedition leaders confirmed that all automated sensor feeds are streamed into the POLARIS portal to enable near-real-time monitoring for the global polar scientific community.",
      "In addition to atmospheric instruments, the team completed palaeoclimate shallow ice core sampling up to 200 meters depth to analyze greenhouse gas trapped bubbles."
    ],
    author: 'Polar Media & Dissemination Division',
    source: "India's Polar Science News Service",
    publishedDate: '2026-08-15',
    readingTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=800&auto=format&fit=crop',
    tags: ['Antarctica', '46th IAE', 'Maitri', 'Bharati', 'Sensors', '2026'],
    featured: true,
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005'],
    relatedExpeditionIds: ['exp-ant-46'],
    relatedKnowledgeIds: ['understanding-antarctic-sea-ice', 'indias-polar-research-programme']
  },
  {
    id: 'indian-scientists-begin-new-antarctic-field-campaign',
    slug: 'indian-scientists-begin-new-antarctic-field-campaign',
    title: 'Indian Scientists Begin 2026 Antarctic Field Campaign in Schirmacher Oasis',
    category: 'News',
    summary: 'Field glaciologists and atmospheric researchers initiate annual ice mass balance stakes and ozonesonde soundings for the 2026 season.',
    content: [
      "Scientists stationed at Maitri Station have officially launched the 2026 winter field monitoring campaign in the Schirmacher Oasis sector.",
      "The teams are measuring winter katabatic wind speeds, snowpack accumulation, and surface albedo variations using portable Sun photometers and radiometers.",
      "Initial telemetry data confirms stable early winter freeze-up along the continental margins."
    ],
    author: 'Atmospheric Research Desk',
    source: "Polar Science News Desk",
    publishedDate: '2026-07-28',
    readingTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=800&auto=format&fit=crop',
    tags: ['Fieldwork', 'Maitri Station', 'Schirmacher Oasis', 'Atmosphere', '2026'],
    featured: false,
    relatedDatasetIds: ['POL-ANT-2024-001'],
    relatedExpeditionIds: ['exp-ant-46'],
    relatedKnowledgeIds: ['understanding-antarctic-sea-ice']
  },
  {
    id: 'new-observations-from-maitri-station',
    slug: 'new-observations-from-maitri-station',
    title: '2026 High-Resolution Meteorological Telemetry Streamed from Maitri Station',
    category: 'Research Highlights',
    summary: 'High-frequency 10-minute meteorological datasets covering historical and active 2026 observations are now available for open download on POLARIS.',
    content: [
      "The POLARIS Data Centre has updated its open-access NetCDF data catalog, integrating 2026 telemetry streams with historical 6-year surface meteorology from Maitri AWS.",
      "The dataset includes surface air temperature, wind speed vectors, barometric pressure, relative humidity over ice, and global solar radiation flux.",
      "Researchers can access the raw datasets, generate customized time-series visualization plots, or export standardized ISO 19115 metadata records."
    ],
    author: 'Data Operations Group',
    source: "POLARIS Data Bulletin",
    publishedDate: '2026-06-14',
    readingTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e2386903b7f?q=80&w=800&auto=format&fit=crop',
    tags: ['Maitri', 'AWS', 'Meteorology', 'Open Data', '2026'],
    featured: false,
    relatedDatasetIds: ['POL-ANT-2024-001'],
    relatedExpeditionIds: ['exp-ant-46'],
    relatedKnowledgeIds: ['indias-polar-research-programme']
  },
  {
    id: 'southern-ocean-expedition-collects-oceanographic-measurements',
    slug: 'southern-ocean-expedition-collects-oceanographic-measurements',
    title: '13th Southern Ocean Expedition Completes Deep CTD Hydrographic Profile Release',
    category: 'Expedition Updates',
    summary: 'ORV Sagar Kanya returns following SOE-13 deep ocean cruise collecting water mass profiles and carbon sink inventories down to 68°S.',
    content: [
      "The 13th Southern Ocean Expedition (SOE-13) aboard research vessel ORV Sagar Kanya has successfully published its deep-sea hydrographic data from the Subtropical Front down to the Antarctic continental slope.",
      "Oceanographers deployed deep CTD rosettes measuring temperature, salinity, dissolved oxygen, and dissolved inorganic carbon (DIC) to assess Antarctic Bottom Water freshening.",
      "Data collected refines global ocean carbon sink budgets and thermohaline circulation models."
    ],
    author: 'Ocean Sciences Desk',
    source: "Southern Ocean Research Network",
    publishedDate: '2026-05-10',
    readingTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
    tags: ['Southern Ocean', 'CTD', 'ORV Sagar Kanya', 'Carbon Sink', '2026'],
    featured: false,
    relatedDatasetIds: ['POL-SO-2023-003'],
    relatedExpeditionIds: ['exp-so-13'],
    relatedKnowledgeIds: ['oceanographic-research-southern-ocean']
  },
  {
    id: 'new-himalayan-glacier-monitoring-campaign',
    slug: 'new-himalayan-glacier-monitoring-campaign',
    title: '2026 High-Altitude Himalayan Glacier Monitoring Campaign Launched at Chhota Shigri',
    category: 'Announcements',
    summary: 'Benchmark glaciological stake networks and DGPS ice surface velocity surveys initiated across Chhota Shigri Glacier catchment for 2026.',
    content: [
      "Glaciologists from the Himalayan Cryosphere Division have initiated the 2026 spring ablation monitoring season at Chhota Shigri Observatory in Himachal Pradesh.",
      "Researchers are quantifying seasonal snowpack depth, black carbon deposition, and ice melt discharge to assess water availability in Indus basin tributaries.",
      "All hydro-meteorological observations are systematically archived on POLARIS under FAIR data principles."
    ],
    author: 'Himalayan Cryosphere Team',
    source: "Third Pole Research Bulletin",
    publishedDate: '2026-04-02',
    readingTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=800&auto=format&fit=crop',
    tags: ['Himalayas', 'Chhota Shigri', 'Glaciers', 'Mass Balance', '2026'],
    featured: false,
    relatedDatasetIds: ['POL-HIM-2024-004', 'POL-HIM-2024-008'],
    relatedExpeditionIds: [],
    relatedKnowledgeIds: ['climate-change-himalayan-cryosphere']
  },
  {
    id: 'polar-research-data-portal-expands-coverage',
    slug: 'polar-research-data-portal-expands-coverage',
    title: 'POLARIS Portal 2026 Release Expands Dataset Coverage & AI Natural Query Integration',
    category: 'Announcements',
    summary: 'Portal release 2026 introduces an intelligent natural language query engine, interactive polar station telemetry, and bulk citation exporters.',
    content: [
      "POLARIS has unveiled its 2026 open-access polar science data infrastructure release, featuring over 500 scientific dataset records across Antarctica, the Arctic, the Southern Ocean, and the Himalayas.",
      "New capabilities include plain-English natural language query parsing, live research station weather widgets, and automated APA 7th / BibTeX citation generators.",
      "The portal ensures full compliance with ISO 19115 metadata standards and FAIR open science principles."
    ],
    author: 'POLARIS Development Team',
    source: "National Polar Infrastructure Press Release",
    publishedDate: '2026-03-15',
    readingTime: '3 min read',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    tags: ['POLARIS', 'Portal Update', 'AI Search', 'FAIR Data', '2026'],
    featured: false,
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ARC-2024-002'],
    relatedExpeditionIds: ['exp-ant-46'],
    relatedKnowledgeIds: ['indias-polar-research-programme']
  }
];

export const MOCK_EXPEDITION_UPDATES: ExpeditionUpdateItem[] = [
  {
    id: 'up-1',
    expeditionId: 'exp-ant-46',
    expeditionTitle: '46th Indian Scientific Expedition to Antarctica (46th IAE)',
    region: 'Antarctica',
    date: '2026-08-10',
    summary: 'Operational deployment of automated weather telemetry network across Queen Maud Land.',
    details: 'The active 46th IAE team retrieved 200 meters of continuous ice core sections for palaeoclimate greenhouse gas reconstruction while deploying automated telemetry sensors near Maitri Base.',
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005']
  },
  {
    id: 'up-2',
    expeditionId: 'exp-arc-18',
    expeditionTitle: 'Indian Arctic Expedition 2026-2027',
    region: 'Arctic',
    date: '2026-07-05',
    summary: 'Serviced IndARC subsurface ocean mooring array in Kongsfjorden, Svalbard for 2026-2027 season.',
    details: 'The expedition crew at Himadri Station serviced the IndARC mooring array, recovering continuous ocean salinity, temperature, and current velocity records from 192 meters depth.',
    relatedDatasetIds: ['POL-ARC-2024-002', 'POL-ARC-2023-007']
  },
  {
    id: 'up-3',
    expeditionId: 'exp-so-13',
    expeditionTitle: '13th Southern Ocean Expedition (SOE-13)',
    region: 'Southern Ocean',
    date: '2026-05-02',
    summary: 'Completed 28 deep CTD hydrographic stations down to 68°S, measuring Antarctic Bottom Water freshening.',
    details: 'Researchers aboard ORV Sagar Kanya sampled dissolved inorganic carbon and micro-phytoplankton iron limitation along a 40-degree latitude transect.',
    relatedDatasetIds: ['POL-SO-2023-003']
  }
];

export const MOCK_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Deploying Automatic Weather Stations in Schirmacher Oasis (2026)',
    category: 'Field Work',
    duration: '4:15',
    description: 'Watch atmospheric scientists install solar-powered meteorological sensors and katabatic wind anemometers near Maitri Station.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    publishedDate: '2026-07-15',
    relatedDatasetIds: ['POL-ANT-2024-001']
  },
  {
    id: 'vid-2',
    title: 'Inside Himadri Station: India\'s High-Arctic Laboratory in Svalbard (2026)',
    category: 'Research',
    duration: '6:30',
    description: 'A visual tour of the atmospheric physics laboratory, Aethalometer black carbon counters, and living quarters in Ny-Ålesund.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    publishedDate: '2026-06-20',
    relatedDatasetIds: ['POL-ARC-2024-002']
  },
  {
    id: 'vid-3',
    title: 'Deep Ocean CTD Rosette Operations aboard ORV Sagar Kanya (SOE-13)',
    category: 'Expeditions',
    duration: '5:45',
    description: 'Experience deep-sea rosette deployment collecting Antarctic Bottom Water samples in the Southern Ocean.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    publishedDate: '2026-05-18',
    relatedDatasetIds: ['POL-SO-2023-003']
  },
  {
    id: 'vid-4',
    title: 'Himalayan Glacier Mass Balance & Meltwater Hydrography Fieldwork (2026)',
    category: 'Education',
    duration: '7:10',
    description: 'Glaciologists explain how mass balance stakes and DGPS ice velocity surveys measure glacier retreat at Chhota Shigri.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
    publishedDate: '2026-04-10',
    relatedDatasetIds: ['POL-HIM-2024-004']
  }
];

export const MOCK_PHOTO_STORIES: PhotoStory[] = [
  {
    id: 'photo-1',
    title: 'Maitri Station during 2026 Austral Winter',
    caption: 'Maitri Station glowing under the Antarctic aurora polaris in Schirmacher Oasis during the 2026 winter season.',
    category: 'Research Station',
    location: 'Maitri Station, Antarctica (-70.77° S, 11.73° E)',
    imageUrl: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Polar Logistics Media Unit',
    date: '2026-07-20'
  },
  {
    id: 'photo-2',
    title: 'High-Arctic Fjord & Glaciers of Svalbard (2026)',
    caption: 'Midtre Lovénbreen glacier discharging meltwater streams into Kongsfjorden near Himadri Station.',
    category: 'Arctic Landscape',
    location: 'Ny-Ålesund, Svalbard (78.92° N)',
    imageUrl: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Arctic Glaciology Team',
    date: '2026-06-12'
  },
  {
    id: 'photo-3',
    title: 'Bharati Station Architectural Design & Larsemann Hills',
    caption: 'State-of-the-art energy efficient Bharati Station overlooking Prydz Bay fast ice.',
    category: 'Research Station',
    location: 'Larsemann Hills, Antarctica (-69.41° S, 76.19° E)',
    imageUrl: 'https://images.unsplash.com/photo-1548574505-5e2386903b7f?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Antarctic Logistics Division',
    date: '2026-05-04'
  },
  {
    id: 'photo-4',
    title: 'ORV Sagar Kanya Navigating Southern Ocean Ice Field (SOE-13)',
    caption: 'India\'s oceanographic research vessel traversing Subtropical and Polar fronts down to 68°S.',
    category: 'Expedition Vessel',
    location: 'Southern Ocean (58° S)',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Ocean Sciences Cruise Team',
    date: '2026-04-18'
  },
  {
    id: 'photo-5',
    title: 'Chhota Shigri Glacier High-Altitude Observatory (2026)',
    caption: 'Benchmark glaciological monitoring station in Lahaul-Spiti valley at 4,350 meters elevation.',
    category: 'Glacier Fieldwork',
    location: 'Chhota Shigri, Himachal Pradesh, India',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
    photographer: 'Himalayan Cryosphere Observatory',
    date: '2026-03-25'
  },
  {
    id: 'photo-6',
    title: 'IndARC Subsurface Mooring Buoy Deployment',
    caption: 'Underwater oceanographic mooring array being lowered into Kongsfjorden fjord waters.',
    category: 'Scientific Instruments',
    location: 'Kongsfjorden, Svalbard',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    photographer: 'IndARC Mooring Group',
    date: '2026-02-14'
  }
];

export const MOCK_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'National Polar Science Conference & Symposium 2026',
    category: 'Conference',
    date: 'October 14-16, 2026',
    location: 'Auditorium, NCPOR Campus, Goa, India',
    eventType: 'Conference',
    description: 'Annual gathering of polar researchers presenting findings in Antarctic meteorology, Arctic black carbon, Himalayan glaciology, and Southern Ocean carbon sinks.',
    registrationLink: '/media'
  },
  {
    id: 'evt-2',
    title: 'Workshop on FAIR Principles for Cryospheric Data Management (2026)',
    category: 'Workshop',
    date: 'November 08, 2026',
    location: 'Virtual / Online Webinar',
    eventType: 'Workshop',
    description: 'Hands-on technical workshop for scientists on structuring CF-compliant NetCDF4 files, ISO 19115 metadata, and publishing open datasets on POLARIS.',
    registrationLink: '/media'
  },
  {
    id: 'evt-3',
    title: 'National Polar Day 2026 Celebrations & Public Exhibition',
    category: 'Public Event',
    date: 'December 01, 2026',
    location: 'National Polar Centre, Goa & Virtual Stream',
    eventType: 'Public Lecture',
    description: 'Commemorating the launch of India\'s polar science programme with public lectures, interactive station virtual tours, and student poster competitions.',
    registrationLink: '/media'
  },
  {
    id: 'evt-4',
    title: 'International Symposium on Southern Ocean Carbon Sink Dynamics 2027',
    category: 'Symposium',
    date: 'January 22-24, 2027',
    location: 'Convention Centre, New Delhi, India',
    eventType: 'Symposium',
    description: 'International symposium bringing together physical oceanographers and biogeochemists to review deep ocean hydrographic profiles and carbon uptake.',
    registrationLink: '/media'
  }
];
