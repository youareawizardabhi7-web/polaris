export type KnowledgeCategory = 
  | 'All'
  | 'Research'
  | 'Publications'
  | 'Reports'
  | 'Education'
  | 'FAQs'
  | 'Glossary';

export interface KnowledgeSection {
  title: string;
  paragraphs: string[];
  keyPoints?: string[];
}

export interface KnowledgeResource {
  id: string;
  slug: string;
  title: string;
  category: Exclude<KnowledgeCategory, 'All' | 'FAQs' | 'Glossary'>;
  description: string;
  author: string;
  organization: string;
  publishedDate: string;
  updatedDate: string;
  publishedYear?: number;
  updatedYear?: number;
  status?: 'Current' | 'Historical';
  readingTime: string;
  tags: string[];
  sections: KnowledgeSection[];
  references: string[];
  relatedDatasetIds: string[];
  relatedExpeditionIds: string[];
  relatedMediaIds?: string[];
  featured: boolean;
}

export interface EducationalResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  targetAudience: string;
  keyTakeaways: string[];
  relatedDatasetIds: string[];
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  simpleDefinition: string;
  scientificDefinition: string;
  category: string;
  relatedDatasetIds: string[];
}

export const MOCK_KNOWLEDGE_RESOURCES: KnowledgeResource[] = [
  {
    id: 'understanding-antarctic-sea-ice',
    slug: 'understanding-antarctic-sea-ice',
    title: 'Understanding Antarctic Sea Ice Dynamics and Seasonal Variations',
    category: 'Research',
    description: 'An in-depth scientific analysis of seasonal ice pack growth, katabatic wind interactions, and coastal polynya formation in Dronning Maud Land and Prydz Bay sectors.',
    author: 'Atmospheric & Cryosphere Science Group',
    organization: "India's Polar Science Research Programme",
    publishedDate: '2026-02-15',
    updatedDate: '2026-06-10',
    publishedYear: 2026,
    updatedYear: 2026,
    status: 'Current',
    readingTime: '8 min read',
    tags: ['Sea Ice', 'Antarctica', 'Polynya', 'Katabatic Winds', 'Maitri Station'],
    featured: true,
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005'],
    relatedExpeditionIds: ['exp-ant-46'],
    relatedMediaIds: ['indias-latest-antarctic-research-expedition', 'vid-1'],
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'Antarctic sea ice forms a dynamic, seasonal blanket surrounding the southern continent, expanding from approximately 3 million square kilometers in late summer to over 18 million square kilometers at its winter maximum.',
          'Unlike Arctic sea ice, which is enclosed by land masses, Antarctic sea ice develops in an open ocean environment subject to extreme wind stress, ocean swells, and katabatic air streams off the polar ice sheet.'
        ]
      },
      {
        title: 'Background & Physical Mechanisms',
        paragraphs: [
          'In sectors adjacent to Indian research stations (Maitri in Schirmacher Oasis and Bharati in Larsemann Hills), coastal polynyas play a disproportionate role in ice production.',
          'Offshore katabatic winds push freshly formed frazil and pancake ice away from the continent, leaving open water areas where intense ocean heat loss fuels rapid ice formation and brine rejection into underlying water masses.'
        ],
        keyPoints: [
          'Frazil ice consolidation during early autumn freeze-up',
          'Polynya heat loss driving Antarctic Bottom Water precursor formation',
          'Wind-driven advection of sea ice pack into the Southern Ocean'
        ]
      },
      {
        title: 'Scientific Importance',
        paragraphs: [
          'Observing sea ice variability provides critical insight into Southern Ocean heat exchange, global thermohaline circulation, and the stability of ice shelf margins.',
          'Continuous monitoring via automated weather stations and polar satellite altimetry helps scientists distinguish natural decadal cycles from anthropogenic climate forcing.'
        ]
      },
      {
        title: 'Key Findings from Indian Polar Stations',
        paragraphs: [
          'Multi-year observations from Maitri AWS and Larsemann Hills satellite telemetry indicate strong coupling between spring katabatic wind intensity and coastal ice concentration.',
          'Anomalous atmospheric blocking events in the South Atlantic sector occasionally suppress sea ice expansion during late winter months.'
        ]
      },
      {
        title: 'Data & Observations',
        paragraphs: [
          'Ground truth observations collected during Indian Antarctic Expeditions (IAE) validate microwave satellite sea ice concentration datasets, maintaining continuous long-term calibration records.'
        ]
      },
      {
        title: 'Conclusion',
        paragraphs: [
          'Understanding Antarctic sea ice processes requires sustained long-term observational networks combining autonomous ice buoys, station meteorology, and high-resolution ocean hydrography.'
        ]
      }
    ],
    references: [
      'Turner, J., et al. (2020). "Atmospheric Drivers of Antarctic Sea Ice Variability." Nature Climate Change.',
      'Indian Antarctic Research Bulletin (2023). "Coastal Polynya Dynamics near Schirmacher Oasis."',
      'WMO Polar Climate Monitoring Report (2024). "Southern Hemisphere Cryospheric Trends."'
    ]
  },
  {
    id: 'indias-polar-research-programme',
    slug: 'indias-polar-research-programme',
    title: "India's Polar Research Programme: Four Decades of Scientific Observation",
    category: 'Publications',
    description: "A comprehensive historical and scientific overview of India's research footprint across Antarctica, the Arctic, the Southern Ocean, and the Himalayan Third Pole.",
    author: 'Polar Scientific Coordination Committee',
    organization: "India's Polar Research Ecosystem",
    publishedDate: '2026-03-15',
    updatedDate: '2026-06-01',
    publishedYear: 2026,
    updatedYear: 2026,
    status: 'Current',
    readingTime: '12 min read',
    tags: ['History', 'Antarctica', 'Arctic', 'Himalayas', 'Maitri', 'Bharati', 'Himadri'],
    featured: true,
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ARC-2024-002', 'POL-HIM-2024-004'],
    relatedExpeditionIds: ['exp-ant-46', 'exp-arc-18', 'exp-so-13'],
    relatedMediaIds: ['indias-latest-antarctic-research-expedition', 'vid-1'],
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          "India's sustained scientific presence in polar regions began in December 1981 with the maiden expedition to Antarctica, establishing the first base Dakshin Gangotri in 1983.",
          "Over four decades, the programme expanded into a multi-realm polar ecosystem operating permanent stations in Antarctica (Maitri, Bharati), the Arctic (Himadri, IndARC), and high-altitude Himalayan field sites (Chhota Shigri)."
        ]
      },
      {
        title: 'Background & Core Infrastructure',
        paragraphs: [
          'The research infrastructure encompasses permanent stations, automated weather stations, deep ice core drills, subsurface ocean moorings, and state-of-the-art research vessels like ORV Sagar Kanya.',
          'Maitri Station (established 1989) and Bharati Station (established 2012) form the backbone of Antarctic atmospheric, glaciological, and space weather observations.'
        ],
        keyPoints: [
          '1981: First Indian Antarctic Expedition launched',
          '1989: Establishment of Maitri Station in Schirmacher Oasis',
          '2008: Inauguration of Himadri Station in Ny-Ålesund, Svalbard',
          '2012: Commissioning of state-of-the-art Bharati Station',
          '2014: Deployment of IndARC subsurface ocean observatory'
        ]
      },
      {
        title: 'Scientific Scope & Interdisciplinary Impact',
        paragraphs: [
          'Research spans six major disciplines: Atmospheric Sciences, Glaciology & Cryosphere, Oceanography, Geology & Geophysics, Polar Biology & Ecosystems, and Space Weather.',
          'Data collected contributes to global networks including SCAR, IASC, WMO Global Cryosphere Watch, and the Antarctic Treaty System scientific working groups.'
        ]
      },
      {
        title: 'Key Scientific Contributions',
        paragraphs: [
          'Significant achievements include long-term ozonesonde atmospheric soundings, Antarctic lacustrine palaeoclimate reconstructions, IndARC hydrographic time series in Svalbard fjords, and benchmark glacier mass balance measurements in the Himalayas.'
        ]
      },
      {
        title: 'Conclusion',
        paragraphs: [
          "India's polar programme continues to foster international open scientific data exchange following FAIR data principles to advance global understanding of Earth system climate dynamics."
        ]
      }
    ],
    references: [
      'Pandey, A.K., et al. (2021). "Four Decades of Indian Polar Science." Journal of Geological Society of India.',
      'Scientific Committee on Antarctic Research (SCAR) Special Report (2022). "National Scientific Progress in Dronning Maud Land."',
      'Ministry of Earth Sciences Technical Publication (2023). "Polar and Ocean Research Compendium."'
    ]
  },
  {
    id: 'climate-change-himalayan-cryosphere',
    slug: 'climate-change-himalayan-cryosphere',
    title: 'Climate Change Impacts on the Himalayan Cryosphere and Water Resources',
    category: 'Reports',
    description: 'Scientific synthesis report on benchmark glacier mass balance retreat, snowpack chemistry, and hydrological discharge across Himachal and Ladakh glaciated catchments.',
    author: 'Himalayan Cryosphere Observatory Team',
    organization: 'Cryospheric Sciences Division',
    publishedDate: '2026-02-10',
    updatedDate: '2026-05-02',
    publishedYear: 2026,
    updatedYear: 2026,
    status: 'Current',
    readingTime: '10 min read',
    tags: ['Himalayas', 'Glaciers', 'Mass Balance', 'Cryosphere', 'Water Resources'],
    featured: true,
    relatedDatasetIds: ['POL-HIM-2024-004', 'POL-HIM-2024-008'],
    relatedExpeditionIds: ['exp-him-08'],
    relatedMediaIds: ['new-himalayan-glacier-monitoring-campaign', 'vid-4'],
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The Himalayan mountain range, often termed Earth\'s "Third Pole," holds the largest concentration of snow and ice outside the polar regions, feeding major river basins that sustain over 1.3 billion people.',
          'Rigorous long-term monitoring at benchmark observatories like Chhota Shigri Glacier provides essential field calibration for satellite remote sensing and regional climate projection models.'
        ]
      },
      {
        title: 'Background & Observational Methods',
        paragraphs: [
          'Glaciologists employ direct glaciological stake networks, Differential GPS (DGPS) ice surface velocity mapping, automated weather station meteorology, and seasonal snow chemistry sampling.',
          'Continuous hydrometric stations downstream measure seasonal meltwater runoff and sediment transport dynamics from early spring through autumn ablation periods.'
        ],
        keyPoints: [
          'Benchmark mass balance stakes monitored annually across 4,300m to 5,600m elevation range',
          'Automated runoff gauging stations measuring hourly melt discharge',
          'Aerosol deposition analysis tracing black carbon and mineral dust transport'
        ]
      },
      {
        title: 'Scientific Findings',
        paragraphs: [
          'Data indicates persistent negative mass balance trends over recent decades, with average glacier thinning rates exceeding 0.5 meters water equivalent per year.',
          'Elevated light-absorbing impurities (black carbon and dust) deposited on snow surfaces accelerate radiative warming and early spring snowmelt.'
        ]
      },
      {
        title: 'Implications for Water Security',
        paragraphs: [
          'Changes in snowpack duration and glacial melt contribution affect seasonal river discharge timing, posing long-term challenges for downstream agriculture, hydropower, and ecosystem management.'
        ]
      },
      {
        title: 'Conclusion',
        paragraphs: [
          'Sustaining high-altitude observational networks is vital for refining hydrometeorological forecasts and building resilient water infrastructure across mountain river basins.'
        ]
      }
    ],
    references: [
      'Azam, M.F., et al. (2018). "Review of the Status and Mass Changes of Himalayan Glaciers." Journal of Glaciology.',
      'Himalayan Cryosphere Observatory Annual Data Summary (2023). "Chhota Shigri Mass Balance and Hydrology Record."',
      'IPCC Special Report on the Ocean and Cryosphere in a Changing Climate (SROCC, 2019).'
    ]
  },
  {
    id: 'oceanographic-research-southern-ocean',
    slug: 'oceanographic-research-southern-ocean',
    title: 'Oceanographic Research in the Southern Ocean: Carbon Sinks & Water Masses',
    category: 'Research',
    description: 'Investigating deep hydrographic CTD profiles, carbon dioxide uptake efficiency, and Antarctic Bottom Water freshening in the Indian sector of the Southern Ocean.',
    author: 'Ocean Sciences & Biogeochemistry Division',
    organization: 'Southern Ocean Observing Network',
    publishedDate: '2026-01-20',
    updatedDate: '2026-05-18',
    publishedYear: 2026,
    updatedYear: 2026,
    status: 'Current',
    readingTime: '9 min read',
    tags: ['Southern Ocean', 'Oceanography', 'CTD', 'Carbon Sink', 'Antarctic Bottom Water'],
    featured: true,
    relatedDatasetIds: ['POL-SO-2023-003'],
    relatedExpeditionIds: ['exp-so-13', 'exp-so-11'],
    relatedMediaIds: ['southern-ocean-expedition-collects-oceanographic-measurements', 'vid-3'],
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The Southern Ocean accounts for over 40% of the global oceanic uptake of anthropogenic carbon dioxide, acting as a crucial planetary buffer against climate change.',
          'Annual deep hydrographic transects aboard research vessels like ORV Sagar Kanya collect high-resolution CTD profiles from Subtropical Convergence down to the Antarctic continent.'
        ]
      },
      {
        title: 'Background & Hydrographic Dynamics',
        paragraphs: [
          'Water masses in the Indian sector of the Southern Ocean exhibit complex spatial layering: Subantarctic Mode Water (SAMW), Antarctic Intermediate Water (AAIW), Circumpolar Deep Water (CDW), and Antarctic Bottom Water (AABW).',
          'Observations focus on understanding how upwelling of CDW brings nutrient-rich waters to the surface while AABW carries absorbed carbon and oxygen into the abyssal ocean.'
        ],
        keyPoints: [
          'Deep-sea rosette samplers measuring dissolved oxygen, nutrients, and carbon chemistry',
          'AABW freshening trends observed in the Enderby Basin',
          'Phytoplankton iron limitation experiments during austral summer cruises'
        ]
      },
      {
        title: 'Key Discoveries',
        paragraphs: [
          'Long-term hydrographic profiles demonstrate measurable warming and salinity freshening of Antarctic Bottom Water, reflecting increased glacial meltwater input from East Antarctic ice shelves.',
          'Seasonal carbon flux measurements show strong biological pump activity driven by summer diatom blooms along the Polar Front.'
        ]
      },
      {
        title: 'Conclusion',
        paragraphs: [
          'Continued multi-decadal shipboard hydrography coupled with autonomous biogeochemical Argo floats remains fundamental for detecting global ocean circulation shifts.'
        ]
      }
    ],
    references: [
      'Anilkumar, N., et al. (2021). "Biogeochemical Fronts in the Indian Sector of the Southern Ocean." Deep-Sea Research II.',
      'Global Carbon Project (2023). "Oceanic Carbon Sink Synthesis Report."',
      'SOOS (Southern Ocean Observing System) Regional Report (2024).'
    ]
  },
  {
    id: 'high-arctic-atmospheric-aerosols',
    slug: 'high-arctic-atmospheric-aerosols',
    title: 'High-Arctic Atmospheric Aerosols & Radiative Forcing at Himadri Station',
    category: 'Publications',
    description: 'Multi-year measurements of black carbon mass concentration, aerosol optical depth, and long-range transport pathways in the High-Arctic environment of Svalbard.',
    author: 'Atmospheric Physics & Aerosol Lab',
    organization: 'Arctic Climate Studies Division',
    publishedDate: '2026-03-05',
    updatedDate: '2026-06-12',
    publishedYear: 2026,
    updatedYear: 2026,
    status: 'Current',
    readingTime: '7 min read',
    tags: ['Arctic', 'Black Carbon', 'Aerosols', 'Himadri Station', 'Radiative Forcing'],
    featured: false,
    relatedDatasetIds: ['POL-ARC-2024-002', 'POL-ARC-2023-007'],
    relatedExpeditionIds: ['exp-arc-18', 'exp-arc-16'],
    relatedMediaIds: ['vid-2', 'photo-2'],
    sections: [
      {
        title: 'Overview',
        paragraphs: [
          'The Arctic is warming at nearly four times the global average rate, a phenomenon known as Arctic Amplification. Atmospheric aerosols, particularly black carbon (BC), play a key role in altering radiative balance.',
          'Observations at Himadri Station in Ny-Ålesund, Svalbard (78.92°N) provide year-round continuous measurements of black carbon mass loading and aerosol optical properties.'
        ]
      },
      {
        title: 'Background & Seasonal Patterns',
        paragraphs: [
          'Arctic atmospheric aerosol concentrations show pronounced seasonal cycles: "Arctic Haze" events during winter and early spring driven by long-range transport from lower latitudes, followed by pristine air during summer months.',
          'Continuous Aethalometer and Sun photometer monitoring helps quantify the light-absorbing efficiency of transported particulate matter.'
        ]
      },
      {
        title: 'Key Findings',
        paragraphs: [
          'Peak black carbon concentrations occur during February–April, coinciding with Arctic Haze episodes.',
          'Snowpack deposition measurements reveal that even trace quantities of black carbon reduce snow albedo, accelerating summer snowpack melt in Svalbard.'
        ]
      },
      {
        title: 'Conclusion',
        paragraphs: [
          'Sustained aerosol monitoring at Himadri contributes essential boundary condition data for global atmospheric chemistry models and Arctic warming simulations.'
        ]
      }
    ],
    references: [
      'Sharma, R., et al. (2022). "Black Carbon Aerosol Characteristics over Ny-Ålesund." Environmental Science & Technology.',
      'Ny-Ålesund Science Managers Committee (NySMAC) Scientific Report (2023).',
      'AMAP (Arctic Monitoring and Assessment Programme) Climate Report (2024).'
    ]
  }
];

export const MOCK_EDUCATIONAL_RESOURCES: EducationalResource[] = [
  {
    id: 'edu-what-is-antarctica',
    slug: 'what-is-antarctica',
    title: 'What is Antarctica?',
    description: 'Learn about Earth\'s coldest, windiest, and highest continent, its massive ice sheet, and why scientists study it.',
    targetAudience: 'Students & General Public',
    keyTakeaways: [
      'Antarctica holds nearly 70% of the world\'s fresh water in its ice sheet.',
      'It is technically a desert because it receives less than 50 mm of precipitation per year.',
      'No single nation owns Antarctica; it is governed by the international Antarctic Treaty for scientific research.'
    ],
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005']
  },
  {
    id: 'edu-why-arctic-research-matters',
    slug: 'why-arctic-research-matters',
    title: 'Why is Arctic research important?',
    description: 'Discover how changes in the Arctic sea ice and permafrost influence weather patterns and monsoons worldwide.',
    targetAudience: 'Students & General Public',
    keyTakeaways: [
      'The Arctic acts as Earth\'s air conditioner by reflecting solar energy back into space via sea ice.',
      'Arctic warming directly affects the jet stream, influencing monsoon dynamics and extreme weather in Asia.',
      'Research at Himadri Station monitors atmospheric pollutants and meltwater runoff in real time.'
    ],
    relatedDatasetIds: ['POL-ARC-2024-002', 'POL-ARC-2023-007']
  },
  {
    id: 'edu-what-is-sea-ice',
    slug: 'what-is-sea-ice',
    title: 'What is sea ice and how does it form?',
    description: 'Understand the difference between sea ice and land glaciers, and why sea ice freeze-thaw cycles matter.',
    targetAudience: 'High School & University Students',
    keyTakeaways: [
      'Sea ice forms directly from salty ocean water freezing at -1.8°C.',
      'When sea ice freezes, it expels salt (brine), making surrounding ocean water denser and driving global ocean currents.',
      'Melting sea ice does not raise sea level directly, but it reduces ocean reflectivity (albedo).'
    ],
    relatedDatasetIds: ['POL-ANT-2024-005']
  },
  {
    id: 'edu-how-polar-expeditions-work',
    slug: 'how-polar-expeditions-work',
    title: 'How do polar expeditions work?',
    description: 'Take a look inside the logistics, scientific equipment, research vessels, and daily life of polar scientists.',
    targetAudience: 'General Public & Aspiring Scientists',
    keyTakeaways: [
      'Polar expeditions require ice-strengthened research ships, helicopters, and specialized cold-weather gear.',
      'Scientists live in winterized research stations (like Maitri and Bharati) that generate their own power and fresh water.',
      'Expeditions involve meteorologists, glaciologists, oceanographers, doctors, engineers, and chefs working together.'
    ],
    relatedDatasetIds: ['POL-ANT-2024-001']
  },
  {
    id: 'edu-polar-regions-and-indian-climate',
    slug: 'polar-regions-and-indian-climate',
    title: 'Why are polar regions important for India\'s climate?',
    description: 'Explore the scientific connection between polar ice cover, Southern Ocean circulation, and the Indian summer monsoon.',
    targetAudience: 'Students & Educators',
    keyTakeaways: [
      'Telemetry from polar stations reveals teleconnections between Southern Ocean temperature anomalies and Indian monsoon rainfall.',
      'The Himalayan glaciers are known as the "Water Tower of Asia," supplying major Indian river systems like the Indus and Ganges.',
      'Studying polar ice cores helps scientists reconstruct past monsoon cycles over hundreds of thousands of years.'
    ],
    relatedDatasetIds: ['POL-HIM-2024-004', 'POL-SO-2023-003']
  }
];

export const MOCK_FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General Polar Science',
    question: 'What is polar science and why is it conducted?',
    answer: 'Polar science encompasses multi-disciplinary research in the Arctic, Antarctic, and high-altitude alpine cryosphere (such as the Himalayas). Scientists study atmosphere, ocean, ice, geology, and biology to understand Earth system dynamics, climate change drivers, sea level rise, and global ocean circulation.'
  },
  {
    id: 'faq-2',
    category: 'Indian Programme',
    question: 'Why does India conduct polar research in Antarctica and the Arctic?',
    answer: 'India conducts polar research to investigate global climate systems that directly impact the Indian subcontinent. Changes in Southern Ocean heat content and Arctic sea ice influence global atmospheric circulation and monsoon rainfall patterns. Additionally, the Himalayan cryosphere acts as a crucial water reservoir for India.'
  },
  {
    id: 'faq-3',
    category: 'Geography',
    question: 'What is the main difference between the Arctic and Antarctic?',
    answer: 'The Arctic is an ocean covered by sea ice surrounded by land (Asia, Europe, North America), whereas Antarctica is a high-elevation continent covered by a massive land ice sheet surrounded by the Southern Ocean. Antarctica is significantly colder and holds over 90% of Earth\'s glacial ice.'
  },
  {
    id: 'faq-4',
    category: 'Infrastructure',
    question: 'What is a polar research station and how does it operate?',
    answer: 'A polar research station is an insulated scientific base equipped with living quarters, laboratories, communication systems, power generators, and automated weather observation sensors. Stations like Maitri and Bharati operate 365 days a year in extreme sub-zero conditions.'
  },
  {
    id: 'faq-5',
    category: 'Data Collection',
    question: 'How are polar datasets collected and validated?',
    answer: 'Datasets are collected using automated weather stations (AWS), continuous subsurface ocean moorings (like IndARC), ice core drilling rigs, CTD ocean rosettes, and satellite altimetry. Data undergoes rigorous quality control, calibration against physical standards, and metadata enrichment following ISO 19115 guidelines.'
  },
  {
    id: 'faq-6',
    category: 'POLARIS Portal',
    question: 'How can researchers and students use POLARIS datasets and resources?',
    answer: 'All datasets published on POLARIS are open-access under Creative Commons (CC-BY 4.0). Researchers can preview time-series plots, download raw NetCDF and CSV data packages, generate APA/BibTeX citations, or use the REST API for automated scientific workflows.'
  }
];

export const MOCK_GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'glos-cryosphere',
    term: 'Cryosphere',
    category: 'Glaciology',
    simpleDefinition: 'The portions of Earth\'s surface where water is in solid ice form, including snow, sea ice, glaciers, and permafrost.',
    scientificDefinition: 'The collective component of the Earth System encompassing frozen water in all its forms: sea ice, lake ice, river ice, snow cover, glaciers, ice caps, ice sheets, and frozen ground (permafrost).',
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-HIM-2024-004']
  },
  {
    id: 'glos-sea-ice',
    term: 'Sea Ice',
    category: 'Cryosphere',
    simpleDefinition: 'Frozen ocean water that floats on the ocean surface, expanding in winter and shrinking in summer.',
    scientificDefinition: 'Freezing of seawater at its surface, forming a dynamic layer typically 1 to 4 meters thick. Sea ice growth involves brine exclusion, increasing ocean surface salinity and driving deep thermohaline convection.',
    relatedDatasetIds: ['POL-ANT-2024-005']
  },
  {
    id: 'glos-glacier',
    term: 'Glacier',
    category: 'Glaciology',
    simpleDefinition: 'A large, slow-moving mass of ice formed over many years from compacted snow on land.',
    scientificDefinition: 'A perennial mass of ice, firn, and snow originating on land and undergoing deformation and downslope movement under the influence of gravity.',
    relatedDatasetIds: ['POL-HIM-2024-004']
  },
  {
    id: 'glos-permafrost',
    term: 'Permafrost',
    category: 'Geology & Cryosphere',
    simpleDefinition: 'Ground (soil, sediment, or rock) that remains completely frozen at or below 0°C for at least two consecutive years.',
    scientificDefinition: 'Perennially frozen ground defined purely on temperature terms, occurring in high-latitude polar regions and high-altitude mountain environments.',
    relatedDatasetIds: ['POL-HIM-2024-008']
  },
  {
    id: 'glos-albedo',
    term: 'Albedo',
    category: 'Atmospheric Sciences',
    simpleDefinition: 'A measure of how much solar light and energy a surface reflects back into space (fresh snow has very high albedo).',
    scientificDefinition: 'The non-dimensional ratio of solar radiation reflected by a surface to the total incident solar radiation. Fresh snow has an albedo of ~0.8 to 0.9, whereas open ocean water is ~0.06.',
    relatedDatasetIds: ['POL-ARC-2024-002']
  },
  {
    id: 'glos-ice-shelf',
    term: 'Ice Shelf',
    category: 'Glaciology',
    simpleDefinition: 'A thick floating platform of ice that forms where a glacier or ice sheet flows down to a coastline and onto the ocean surface.',
    scientificDefinition: 'A floating slab of ice of considerable thickness attached to a coast, fed by land glaciers and snow accumulation, buttressing inland ice flow.',
    relatedDatasetIds: ['POL-ANT-2024-005']
  },
  {
    id: 'glos-katabatic-wind',
    term: 'Katabatic Wind',
    category: 'Atmospheric Sciences',
    simpleDefinition: 'Cold, heavy air flowing downward off high polar ice sheets towards the coastline at high speeds.',
    scientificDefinition: 'A drainage wind carrying high-density cold air down a slope under the force of gravity, characteristic of the Antarctic boundary layer where wind speeds can exceed 100 knots.',
    relatedDatasetIds: ['POL-ANT-2024-001']
  },
  {
    id: 'glos-oceanography',
    term: 'Oceanography',
    category: 'Oceanography',
    simpleDefinition: 'The scientific study of the ocean, including its currents, temperature, salinity, chemistry, and marine life.',
    scientificDefinition: 'The interdisciplinary branch of Earth science studying physical, chemical, biological, and geological characteristics of oceans and seas.',
    relatedDatasetIds: ['POL-SO-2023-003']
  },
  {
    id: 'glos-atmospheric-science',
    term: 'Atmospheric Science',
    category: 'Atmospheric Sciences',
    simpleDefinition: 'The study of Earth\'s atmosphere, weather patterns, climate change, greenhouse gases, and air quality.',
    scientificDefinition: 'The study of the physics, dynamics, and chemistry of Earth\'s atmosphere and its interactions with oceans, land surface, and biosphere.',
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ARC-2024-002']
  },
  {
    id: 'glos-remote-sensing',
    term: 'Remote Sensing',
    category: 'Geoinformatics',
    simpleDefinition: 'Collecting information about Earth\'s ice, ocean, and land from satellites, airplanes, or drones without physical contact.',
    scientificDefinition: 'The acquisition of information about an object or phenomenon without making physical contact, utilizing satellite electromagnetic sensors (optical, thermal infrared, synthetic aperture radar, microwave altimetry).',
    relatedDatasetIds: ['POL-ANT-2024-005']
  },
  {
    id: 'glos-polar-vortex',
    term: 'Polar Vortex',
    category: 'Atmospheric Sciences',
    simpleDefinition: 'A large area of low pressure and cold air surrounding Earth\'s poles, strong in winter and weakening in summer.',
    scientificDefinition: 'A persistent, large-scale upper-level atmospheric low-pressure cyclone located near Earth\'s poles in the middle and upper troposphere and stratosphere.',
    relatedDatasetIds: ['POL-ANT-2024-001']
  }
];
