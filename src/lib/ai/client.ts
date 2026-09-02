import { AssistantRequest, AssistantResponse } from '@/types/assistant';

/**
 * POLARIS AI Assistant Frontend API Client
 * 
 * Communicates with teammate's backend API at process.env.NEXT_PUBLIC_API_URL
 * or falls back to development mock demonstration mode when NEXT_PUBLIC_AI_MOCK=true.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const IS_MOCK_MODE = process.env.NEXT_PUBLIC_AI_MOCK === 'true' || !process.env.NEXT_PUBLIC_API_URL;

export async function askAssistant(request: AssistantRequest): Promise<AssistantResponse> {
  // If a real backend URL is configured and mock mode is not forced, send POST request
  if (!IS_MOCK_MODE && API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/assistant`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: Unable to connect to POLARIS AI Service.`);
      }

      const data: AssistantResponse = await response.json();
      return data;
    } catch (err: any) {
      console.error('[POLARIS AI Frontend Error]', err);
      throw new Error(err?.message || 'Unable to connect to the POLARIS AI service.');
    }
  }

  // Development Mock Mode (Simulates network latency and provides structured demonstration data)
  await new Promise((resolve) => setTimeout(resolve, 800));

  const q = request.question.toLowerCase().trim();
  const ctx = request.context;

  // Contextual Request Handling (e.g., "Explain Simply" from Dataset or Knowledge detail page)
  if (ctx) {
    if (ctx.type === 'dataset') {
      return {
        answer: `[DEMONSTRATION RESPONSE]\nThis dataset contains continuous meteorological measurements recorded at Maitri Station in Schirmacher Oasis, East Antarctica. It records parameters such as surface air temperature, katabatic wind velocity, barometric pressure, relative humidity, and global solar radiation flux.\n\nKey takeaway: The dataset helps atmospheric scientists understand surface heat exchange, wind dynamics, and validate climate reanalysis models in Queen Maud Land.`,
        sources: [
          {
            id: ctx.id,
            type: 'dataset',
            title: ctx.title || `Dataset Record: ${ctx.id}`,
            description: 'Automated 10-minute meteorological observations from Maitri Station AWS.',
            url: `/datasets/${ctx.id}`
          },
          {
            id: 'station-maitri',
            type: 'station',
            title: 'Maitri Research Station',
            description: 'Permanent Indian Antarctic observatory in Schirmacher Oasis.',
            url: '/map?station=maitri-station'
          }
        ]
      };
    }

    if (ctx.type === 'knowledge') {
      return {
        answer: `[DEMONSTRATION RESPONSE]\nThis research document explains key physical mechanisms driving polar climate dynamics, sea ice formation, or aerosol transport. It summarizes scientific observations from Indian polar research stations and synthesizes published literature following FAIR open data principles.`,
        sources: [
          {
            id: ctx.id,
            type: 'knowledge',
            title: ctx.title || `Knowledge Article: ${ctx.id}`,
            description: 'Peer-reviewed research and scientific background document.',
            url: `/knowledge/${ctx.id}`
          }
        ]
      };
    }
  }

  // Question-specific Mock Logic
  if (q.includes('maitri')) {
    return {
      answer: `[DEMONSTRATION RESPONSE]\nI found several POLARIS records related to Maitri Station in Antarctica:\n\n1. Maitri Automatic Weather Station (AWS) Meteorology & High-Resolution Time Series (NetCDF4 format).\n2. 46th Indian Scientific Expedition to Antarctica (46th IAE) deployment logs.\n3. Research publications on coastal polynya ice formation in Schirmacher Oasis.`,
      sources: [
        {
          id: 'station-maitri',
          type: 'station',
          title: 'Maitri Research Station',
          description: 'India\'s second permanent Antarctic station in Schirmacher Oasis (-70.77°S, 11.73°E).',
          url: '/map?station=maitri-station'
        },
        {
          id: 'POL-ANT-2024-001',
          type: 'dataset',
          title: 'Antarctic Surface Meteorology & AWS High-Resolution Time Series',
          description: 'Continuous 10-minute surface air temperature, katabatic wind vector, and pressure records.',
          url: '/datasets/POL-ANT-2024-001'
        },
        {
          id: 'understanding-antarctic-sea-ice',
          type: 'knowledge',
          title: 'Understanding Antarctic Sea Ice Dynamics and Seasonal Variations',
          description: 'Scientific analysis of seasonal ice pack growth and katabatic wind coupling near Maitri Base.',
          url: '/knowledge/understanding-antarctic-sea-ice'
        }
      ]
    };
  }

  if (q.includes('black carbon') || q.includes('aerosol') || q.includes('svalbard') || q.includes('himadri')) {
    return {
      answer: `[DEMONSTRATION RESPONSE]\nAtmospheric Black Carbon (BC) and aerosol measurements in High Arctic Svalbard are continuously recorded at Himadri Station in Ny-Ålesund (78.92° N):\n\n- Instruments: Multi-Angle Absorption Photometer (MAAP) and Microtops Sunphotometers.\n- Key Findings: Peak BC mass loading occurs during winter/spring 'Arctic Haze' episodes driven by long-range transport.`,
    sources: [
      {
        id: 'POL-ARC-2024-002',
        type: 'dataset',
        title: 'Black Carbon & Aerosol Optical Depth Observations — Arctic',
        description: 'Multi-year equivalent black carbon (eBC) and aerosol optical depth (AOD) time series.',
        url: '/datasets/POL-ARC-2024-002'
      },
      {
        id: 'station-himadri',
        type: 'station',
        title: 'Himadri Station (Ny-Ålesund, Svalbard)',
        description: 'India\'s permanent High-Arctic research station at 78°55′ N.',
        url: '/map?station=himadri-station'
      }
    ]
  };
}

  if (q.includes('45th') || q.includes('46th') || q.includes('expedition')) {
    return {
      answer: `[DEMONSTRATION RESPONSE]\nHere are active and recent Indian Antarctic Expeditions recorded in the POLARIS catalog:\n\n- **46th Indian Scientific Expedition to Antarctica (46th IAE, 2026–2027)**: Currently ongoing across Maitri and Bharati bases, deploying real-time telemetry sensors and ice core drills.\n- **45th Indian Scientific Expedition to Antarctica (45th IAE, 2025–2026)**: Completed summer ground surveys for the proposed Maitri II station and lake monitoring buoys.`,
      sources: [
        {
          id: 'exp-ant-46',
          type: 'expedition',
          title: '46th Indian Scientific Expedition to Antarctica (46th IAE)',
          description: 'Active 2026–2027 expedition operating year-round at Maitri and Bharati stations.',
          url: '/expeditions'
        },
        {
          id: 'exp-ant-45',
          type: 'expedition',
          title: '45th Indian Scientific Expedition to Antarctica (45th IAE)',
          description: 'Completed 2025–2026 summer scientific field campaign.',
          url: '/expeditions'
        }
      ]
    };
  }

  if (q.includes('glacier') || q.includes('himalaya') || q.includes('shigri')) {
    return {
      answer: `[DEMONSTRATION RESPONSE]\nPOLARIS tracks benchmark Himalayan glacier dynamics at the Chhota Shigri High-Altitude Observatory in Himachal Pradesh:\n\n- Observations include stake-measured glacier net mass balance, DGPS surface ice flow velocity, and GPR ice thickness profiles.`,
      sources: [
        {
          id: 'POL-HIM-2024-004',
          type: 'dataset',
          title: 'Glacier Mass Balance & Thickness Dynamics — Western Himalayas',
          description: 'Long-term benchmark mass balance records on Chhota Shigri Glacier.',
          url: '/datasets/POL-HIM-2024-004'
        },
        {
          id: 'climate-change-himalayan-cryosphere',
          type: 'knowledge',
          title: 'Climate Change Impacts on the Himalayan Cryosphere and Water Resources',
          description: 'Synthesis report on glacier retreat and hydrological melt discharge.',
          url: '/knowledge/climate-change-himalayan-cryosphere'
        }
      ]
    };
  }

  if (q.includes('antarctica') || q.includes('southern ocean')) {
    return {
      answer: `[DEMONSTRATION RESPONSE]\nPOLARIS indexes open scientific records across Antarctica and the Southern Ocean:\n\n1. Meteorological time series from Maitri and Bharati Stations.\n2. Deep CTD hydrographic profiles and carbon sink inventories collected aboard ORV Sagar Kanya.\n3. Coastal fast-ice altimetry and satellite ground truth calibration records.`,
      sources: [
        {
          id: 'POL-SO-2023-003',
          type: 'dataset',
          title: 'Southern Ocean CTD Deep Hydrographic Profiles & Carbon Inventory',
          description: 'Vertical CTD profiles measuring seawater salinity, temperature, and dissolved carbon.',
          url: '/datasets/POL-SO-2023-003'
        },
        {
          id: 'station-bharati',
          type: 'station',
          title: 'Bharati Research Station (Larsemann Hills)',
          description: 'India\'s state-of-the-art Antarctic station overlooking Prydz Bay.',
          url: '/map?station=bharati-station'
        }
      ]
    };
  }

  // Generic fallback mock response
  return {
    answer: `[DEMONSTRATION RESPONSE]\nI searched the POLARIS scientific knowledge base for "${request.question}". Here are related scientific dataset records, research stations, and publications matching your query.`,
    sources: [
      {
        id: 'POL-ANT-2024-001',
        type: 'dataset',
        title: 'Antarctic Surface Meteorology & AWS High-Resolution Time Series',
        description: 'Maitri Station automated weather station high-resolution meteorological dataset.',
        url: '/datasets/POL-ANT-2024-001'
      },
      {
        id: 'indias-polar-research-programme',
        type: 'knowledge',
        title: 'India\'s Polar Research Programme: Four Decades of Scientific Observation',
        description: 'Historical and scientific overview of research across Antarctica, Arctic, and Himalayas.',
        url: '/knowledge/indias-polar-research-programme'
      }
    ]
  };
}
