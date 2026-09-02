import { ResearchStation } from '@/types/portal';

export const RESEARCH_STATIONS: ResearchStation[] = [
  {
    id: 'maitri-station',
    name: 'Maitri Research Station',
    nativeName: 'मैत्री अनुसंधान केंद्र',
    region: 'Antarctica',
    country: 'India',
    agency: 'National Centre for Polar and Ocean Research (NCPOR)',
    coordinates: { lat: -70.7667, lng: 11.7333 },
    established: 1989,
    status: 'Active',
    elevation: '117 meters',
    description: 'Maitri is India’s second permanent Antarctic research station, situated in the ice-free rocky area of Schirmacher Oasis, East Antarctica. It supports year-round scientific studies in meteorology, glaciology, terrestrial biology, atmospheric chemistry, geomagnetic studies, and human physiology.',
    availableDatasetsCount: 164,
    latestObservation: {
      temp: '-14.2°C',
      wind: '18.4 m/s (SSE)',
      pressure: '981.4 hPa',
      updatedAt: '10 mins ago'
    },
    parameters: [
      'Surface Air Temperature',
      'Katabatic Winds',
      'Solar Radiation',
      'Ozone Layer Profile',
      'Geomagnetic Field',
      'Lake Paleoclimate Sediments'
    ],
    relatedExpeditionIds: ['exp-ant-46', 'exp-ant-45', 'exp-ant-43'],
    relatedDatasetIds: ['POL-ANT-2024-001', 'POL-ANT-2024-005'],
    relatedMediaIds: ['indias-latest-antarctic-research-expedition', 'new-observations-from-maitri-station', 'vid-1', 'photo-1']
  },
  {
    id: 'bharati-station',
    name: 'Bharati Research Station',
    nativeName: 'भारती अनुसंधान केंद्र',
    region: 'Antarctica',
    country: 'India',
    agency: 'National Centre for Polar and Ocean Research (NCPOR)',
    coordinates: { lat: -69.4078, lng: 76.1914 },
    established: 2012,
    status: 'Active',
    elevation: '35 meters',
    description: 'Bharati is India’s third and newest state-of-the-art Antarctic research station located in Larsemann Hills, Prydz Bay. Constructed with energy-efficient prefab shipping container modules, Bharati focuses on oceanography, coastal fast-ice dynamics, atmospheric physics, and continental breakup geology.',
    availableDatasetsCount: 182,
    latestObservation: {
      temp: '-9.8°C',
      wind: '12.1 m/s (E)',
      pressure: '988.2 hPa',
      updatedAt: '5 mins ago'
    },
    parameters: [
      'Coastal Fast-Ice Altimetry',
      'Total Column Ozone',
      'Atmospheric Aerosols',
      'Ocean CTD Currents',
      'Satellite Remote Sensing Substation'
    ],
    relatedExpeditionIds: ['exp-ant-46', 'exp-ant-45'],
    relatedDatasetIds: ['POL-ANT-2024-005'],
    relatedMediaIds: ['photo-3']
  },
  {
    id: 'himadri-station',
    name: 'Himadri Station',
    nativeName: 'हिमाद्रि अनुसंधान स्टेशन',
    region: 'Arctic',
    country: 'India',
    agency: 'National Centre for Polar and Ocean Research (NCPOR)',
    coordinates: { lat: 78.9231, lng: 11.9225 },
    established: 2008,
    status: 'Active',
    elevation: '12 meters',
    description: 'Himadri is India’s first permanent Arctic research station located at the international Arctic research village of Ny-Ålesund, Svalbard, Norway. Situated at 78°55′ N, Himadri investigates Arctic climate amplification, aerosol-cloud radiation feedbacks, microbial diversity, and glacial retreat.',
    availableDatasetsCount: 112,
    latestObservation: {
      temp: '+4.5°C',
      wind: '5.2 m/s (NW)',
      pressure: '1011.0 hPa',
      updatedAt: '12 mins ago'
    },
    parameters: [
      'Equivalent Black Carbon',
      'Aerosol Optical Depth (AOD)',
      'Glacier Melt Runoff',
      'Fjord Water Biogeochemistry',
      'Arctic Microorganisms'
    ],
    relatedExpeditionIds: ['exp-arc-18', 'exp-arc-16'],
    relatedDatasetIds: ['POL-ARC-2024-002'],
    relatedMediaIds: ['vid-2', 'photo-2']
  },
  {
    id: 'indarc-mooring',
    name: 'IndARC Subsurface Mooring',
    nativeName: 'इंड-आर्क जलमग्न वेधशाला',
    region: 'Arctic',
    country: 'India',
    agency: 'NCPOR & NIOT',
    coordinates: { lat: 78.9000, lng: 12.0000 },
    established: 2014,
    status: 'Active',
    elevation: '-192 meters (Subsurface)',
    description: 'IndARC is India’s first multi-sensor subsurface oceanographic observatory anchored in the Kongsfjorden fjord, Svalbard. Positioned halfway between the North Pole and Norway, IndARC measures Atlantic ocean water ingress and winter ice freezing cycles continuously.',
    availableDatasetsCount: 54,
    latestObservation: {
      temp: '+3.8°C (at 100m)',
      wind: 'N/A (Subsurface)',
      pressure: '19.2 bar',
      updatedAt: '1 hour ago'
    },
    parameters: [
      'Atlantic Water Ingress Temperature',
      'Practical Salinity (PSU)',
      'Current Speed & Direction (ADCP)',
      'Fjord Water Turbidity',
      'Photosynthetically Active Radiation'
    ]
  },
  {
    id: 'chhota-shigri',
    name: 'Chhota Shigri Glacier Observatory',
    nativeName: 'छोटा शिगरी हिमनद वेधशाला',
    region: 'Himalayas',
    country: 'India',
    agency: 'NCPOR & Wadia Institute of Himalayan Geology',
    coordinates: { lat: 32.2800, lng: 77.5200 },
    established: 2002,
    status: 'Active',
    elevation: '4,350 meters',
    description: 'Located in the Chandra River basin of Lahaul-Spiti valley, Himachal Pradesh, Chhota Shigri Glacier is a benchmark glacier in the Western Himalayas. The observatory tracks glacier mass balance, ice thickness change, surface velocity, and meltwater contributions.',
    availableDatasetsCount: 78,
    latestObservation: {
      temp: '+1.2°C',
      wind: '8.4 m/s (SW)',
      pressure: '644.0 hPa',
      updatedAt: '25 mins ago'
    },
    parameters: [
      'Specific Net Mass Balance',
      'Equilibrium Line Altitude (ELA)',
      'DGPS Surface Ice Velocity',
      'Snowpack Ionic Chemistry',
      'Hydrological Discharge Volume'
    ]
  },
  {
    id: 'sage-observatory',
    name: 'SAGE High-Altitude Observatory (HIMANCHAL)',
    nativeName: 'सेज उच्च-ऊंचाई वेधशाला',
    region: 'Himalayas',
    country: 'India',
    agency: 'National Centre for Polar and Ocean Research (NCPOR)',
    coordinates: { lat: 32.4100, lng: 77.1500 },
    established: 2016,
    status: 'Active',
    elevation: '4,050 meters',
    description: 'The High Altitude Field Station at Sutri Dhaka in Himachal Pradesh provides continuous baseline observations of cryosphere-atmosphere interactions, black carbon deposition on Himalayan snow, and permafrost degradation.',
    availableDatasetsCount: 45,
    latestObservation: {
      temp: '+0.5°C',
      wind: '9.6 m/s (W)',
      pressure: '652.5 hPa',
      updatedAt: '18 mins ago'
    },
    parameters: [
      'Black Carbon Deposition',
      'Permafrost Borehole Temperature',
      'AWS High-Altitude Weather',
      'Seasonal Snow Water Equivalent'
    ]
  }
];
