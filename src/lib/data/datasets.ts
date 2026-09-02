import { DatasetItem } from '@/types/portal';

export const MOCK_DATASETS: DatasetItem[] = [
  {
    id: 'POL-ANT-2024-001',
    title: 'Antarctic Surface Meteorology & AWS High-Resolution Time Series',
    region: 'Antarctica',
    discipline: 'Atmospheric Sciences',
    station: 'Maitri Station',
    expedition: '43rd Indian Antarctic Expedition',
    temporalCoverage: '2018-01-01 to 2024-03-31',
    startYear: 2018,
    endYear: 2024,
    spatialCoverage: '70.77° S, 11.73° E (Schirmacher Oasis, Queen Maud Land)',
    coordinates: { lat: -70.77, lng: 11.73 },
    dataFormat: 'NetCDF',
    fileSize: '4.8 GB',
    provider: 'National Centre for Polar and Ocean Research (NCPOR)',
    lastUpdated: '2026-04-12',
    shortDescription: 'Continuous 10-minute meteorological parameters recorded at Maitri Automatic Weather Station including ambient temperature, barometric pressure, surface wind vector, humidity, and solar flux.',
    fullDescription: 'This dataset presents automated high-frequency meteorological observations collected at Maitri Station in Schirmacher Oasis, East Antarctica. It serves as a benchmark record for atmospheric boundary layer studies, katabatic wind dynamics, climate variability, and validation of global reanalysis models (ERA5, MERRA-2) in the Dronning Maud Land sector.',
    tags: ['Meteorology', 'Temperature', 'Katabatic Winds', 'Atmospheric Pressure', 'Maitri', 'AWS'],
    parameters: ['Surface Air Temperature', 'Wind Speed & Direction', 'Barometric Pressure', 'Relative Humidity', 'Downwelling Shortwave Radiation'],
    downloadsCount: 1420,
    doi: '10.5281/zenodo.ncpor.ant.met.2024.001',
    citation: 'NCPOR Atmospheric Research Division (2024). Antarctic Surface Meteorology & AWS High-Resolution Time Series (2018-2024). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.ant.met.2024.001.',
    variables: [
      { name: 'TEMP_2M', unit: '°C', description: '2-meter Ambient Air Temperature' },
      { name: 'WIND_SPD', unit: 'm/s', description: 'Surface Wind Speed at 10m height' },
      { name: 'PRESS_SLP', unit: 'hPa', description: 'Sea Level Adjusted Barometric Pressure' },
      { name: 'RH_2M', unit: '%', description: 'Relative Humidity over Ice' },
      { name: 'SOLAR_RAD', unit: 'W/m²', description: 'Global Downwelling Solar Radiation' }
    ],
    sampleData: [
      { date: '2018-01', temperature: -5.2, windSpeed: 12.4, pressure: 982.1, blackCarbon: 12, seaIceConcentration: 78, glacierMassBalance: -0.4 },
      { date: '2018-06', temperature: -18.6, windSpeed: 24.1, pressure: 974.5, blackCarbon: 8, seaIceConcentration: 92, glacierMassBalance: -1.2 },
      { date: '2019-01', temperature: -4.8, windSpeed: 11.2, pressure: 984.3, blackCarbon: 14, seaIceConcentration: 75, glacierMassBalance: -0.6 },
      { date: '2019-06', temperature: -21.1, windSpeed: 28.5, pressure: 969.8, blackCarbon: 6, seaIceConcentration: 95, glacierMassBalance: -1.8 },
      { date: '2020-01', temperature: -3.9, windSpeed: 9.8, pressure: 986.0, blackCarbon: 18, seaIceConcentration: 71, glacierMassBalance: -0.8 },
      { date: '2020-06', temperature: -19.4, windSpeed: 22.0, pressure: 976.2, blackCarbon: 9, seaIceConcentration: 91, glacierMassBalance: -1.5 },
      { date: '2021-01', temperature: -6.1, windSpeed: 14.3, pressure: 980.5, blackCarbon: 11, seaIceConcentration: 80, glacierMassBalance: -0.5 },
      { date: '2021-06', temperature: -22.5, windSpeed: 31.0, pressure: 965.4, blackCarbon: 5, seaIceConcentration: 96, glacierMassBalance: -2.1 },
      { date: '2022-01', temperature: -3.2, windSpeed: 10.5, pressure: 987.4, blackCarbon: 22, seaIceConcentration: 68, glacierMassBalance: -1.1 },
      { date: '2022-06', temperature: -17.8, windSpeed: 20.4, pressure: 978.1, blackCarbon: 10, seaIceConcentration: 89, glacierMassBalance: -1.4 },
      { date: '2023-01', temperature: -4.1, windSpeed: 11.8, pressure: 983.8, blackCarbon: 16, seaIceConcentration: 73, glacierMassBalance: -0.9 },
      { date: '2023-06', temperature: -20.2, windSpeed: 26.2, pressure: 971.0, blackCarbon: 7, seaIceConcentration: 94, glacierMassBalance: -1.7 },
      { date: '2024-01', temperature: -2.9, windSpeed: 9.1, pressure: 988.9, blackCarbon: 25, seaIceConcentration: 65, glacierMassBalance: -1.3 }
    ],
    fileList: [
      { filename: 'maitri_aws_2018_2024_hourly.nc', size: '3.2 GB', format: 'NetCDF4', updated: '2024-04-10' },
      { filename: 'maitri_aws_daily_summary.csv', size: '1.2 GB', format: 'CSV', updated: '2024-04-10' },
      { filename: 'maitri_station_metadata.xml', size: '450 KB', format: 'XML/DIF', updated: '2024-03-01' }
    ],
    relatedExpeditionIds: ['exp-ant-46', 'exp-ant-43'],
    relatedStationIds: ['maitri-station'],
    relatedKnowledgeIds: ['understanding-antarctic-sea-ice', 'indias-polar-research-programme'],
    relatedMediaIds: ['indias-latest-antarctic-research-expedition', 'new-observations-from-maitri-station', 'vid-1']
  },
  {
    id: 'POL-ARC-2024-002',
    title: 'Black Carbon & Aerosol Optical Depth Observations — Arctic',
    region: 'Arctic',
    discipline: 'Atmospheric Sciences',
    station: 'Himadri Station',
    expedition: '16th Indian Arctic Expedition',
    temporalCoverage: '2015-06-01 to 2023-09-30',
    startYear: 2015,
    endYear: 2023,
    spatialCoverage: '78.92° N, 11.93° E (Ny-Ålesund, Svalbard)',
    coordinates: { lat: 78.92, lng: 11.93 },
    dataFormat: 'CSV',
    fileSize: '820 MB',
    provider: 'NCPOR Arctic & Climate Change Group',
    lastUpdated: '2026-04-12',
    shortDescription: 'Continuous Multi-Angle Absorption Photometer (MAAP) and Microtops Sunphotometer observations measuring atmospheric Black Carbon (BC) concentrations and Aerosol Optical Depth (AOD) in High Arctic Svalbard.',
    fullDescription: 'High-sensitivity aerosol optical measurements recorded at Himadri Station in Ny-Ålesund, Svalbard. The dataset captures seasonal long-range transport of biomass burning emissions (Arctic Haze), seasonal variations in Equivalent Black Carbon (eBC), and radiative forcing parameters essential for Arctic amplified warming studies.',
    tags: ['Black Carbon', 'Arctic Haze', 'Aerosol Optical Depth', 'Svalbard', 'Himadri', 'Radiative Forcing'],
    parameters: ['Equivalent Black Carbon (eBC)', 'Aerosol Optical Depth (500nm)', 'Single Scattering Albedo', 'Mass Absorption Cross-section'],
    downloadsCount: 980,
    doi: '10.5281/zenodo.ncpor.arc.bc.2023.002',
    citation: 'Sharma et al. (2023). High-Arctic Atmospheric Black Carbon and Aerosol Optical Properties at Himadri Station (2015-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.arc.bc.2023.002.',
    variables: [
      { name: 'eBC_CONC', unit: 'ng/m³', description: 'Equivalent Black Carbon Concentration' },
      { name: 'AOD_500NM', unit: 'dimensionless', description: 'Aerosol Optical Depth at 500nm' },
      { name: 'ANGSTROM_EXP', unit: 'dimensionless', description: 'Angstrom Exponent (440-870nm)' }
    ],
    sampleData: [
      { date: '2015-06', temperature: 4.2, windSpeed: 6.1, pressure: 1012.3, blackCarbon: 42, seaIceConcentration: 62 },
      { date: '2016-06', temperature: 5.1, windSpeed: 5.8, pressure: 1010.5, blackCarbon: 58, seaIceConcentration: 58 },
      { date: '2017-06', temperature: 3.8, windSpeed: 7.2, pressure: 1014.1, blackCarbon: 35, seaIceConcentration: 65 },
      { date: '2018-06', temperature: 6.0, windSpeed: 5.2, pressure: 1008.9, blackCarbon: 68, seaIceConcentration: 52 },
      { date: '2019-06', temperature: 5.4, windSpeed: 6.5, pressure: 1011.2, blackCarbon: 52, seaIceConcentration: 55 },
      { date: '2020-06', temperature: 6.8, windSpeed: 4.9, pressure: 1007.4, blackCarbon: 84, seaIceConcentration: 46 },
      { date: '2021-06', temperature: 5.9, windSpeed: 6.0, pressure: 1010.0, blackCarbon: 61, seaIceConcentration: 50 },
      { date: '2022-06', temperature: 7.2, windSpeed: 5.1, pressure: 1006.1, blackCarbon: 95, seaIceConcentration: 42 },
      { date: '2023-06', temperature: 6.6, windSpeed: 5.7, pressure: 1009.2, blackCarbon: 78, seaIceConcentration: 45 }
    ],
    fileList: [
      { filename: 'himadri_bc_aod_2015_2023.csv', size: '640 MB', format: 'CSV', updated: '2023-11-15' },
      { filename: 'himadri_aerosol_metadata.json', size: '180 KB', format: 'JSON', updated: '2023-10-10' }
    ],
    relatedExpeditionIds: ['exp-arc-18', 'exp-arc-16'],
    relatedStationIds: ['himadri-station'],
    relatedKnowledgeIds: ['indias-polar-research-programme', 'black-carbon-arctic-amplification'],
    relatedMediaIds: ['vid-2', 'photo-2']
  },
  {
    id: 'POL-SO-2023-003',
    title: 'Southern Ocean CTD Deep Hydrographic Profiles & Carbon Inventory',
    region: 'Southern Ocean',
    discipline: 'Oceanography',
    station: 'ORV Sagar Kanya (Cruise SO-11)',
    expedition: '11th Southern Ocean Expedition',
    temporalCoverage: '2017-01-10 to 2023-02-28',
    startYear: 2017,
    endYear: 2023,
    spatialCoverage: '40° S to 68° S, 40° E to 60° E (Prydz Bay Transect)',
    coordinates: { lat: -58.50, lng: 55.00 },
    dataFormat: 'NetCDF',
    fileSize: '2.4 GB',
    provider: 'Ocean Sciences Group, NCPOR Goa',
    lastUpdated: '2023-05-18',
    shortDescription: 'Conductivity-Temperature-Depth (CTD) vertical profiles up to 5000m depth, dissolved inorganic carbon (DIC), dissolved oxygen, and nutrient hydrography along the Indian sector of the Southern Ocean.',
    fullDescription: 'High-precision CTD hydrographic profiles and seawater biogeochemistry collected aboard ORV Sagar Kanya across the Subtropical, Subantarctic, and Polar Fronts down to Prydz Bay. Essential for diagnosing Antarctic Bottom Water (AABW) formation rate changes, ocean acidification, and heat absorption mechanisms.',
    tags: ['CTD', 'Hydrography', 'Salinity', 'Ocean Temperature', 'Antarctic Bottom Water', 'Dissolved Carbon'],
    parameters: ['Seawater Temperature', 'Practical Salinity (PSS-78)', 'Dissolved Oxygen (µmol/kg)', 'Pressure / Depth', 'Chlorophyll-a Fluorescence'],
    downloadsCount: 1150,
    doi: '10.5281/zenodo.ncpor.so.ctd.2023.003',
    citation: 'Ocean Sciences Division (2023). Southern Ocean Deep Hydrographic Profiles & Carbon Inventory (2017-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.so.ctd.2023.003.',
    variables: [
      { name: 'CTDTMP', unit: '°C', description: 'In-situ Temperature' },
      { name: 'CTDSAL', unit: 'PSU', description: 'Practical Salinity' },
      { name: 'CTDOXY', unit: 'µmol/kg', description: 'Dissolved Oxygen Concentration' },
      { name: 'DIC', unit: 'µmol/kg', description: 'Dissolved Inorganic Carbon' }
    ],
    sampleData: [
      { date: '2017-02', temperature: 1.8, salinity: 34.62, depth: 500, pressure: 995.0 },
      { date: '2018-02', temperature: 1.5, salinity: 34.65, depth: 1000, pressure: 992.0 },
      { date: '2019-02', temperature: 2.1, salinity: 34.58, depth: 1500, pressure: 998.0 },
      { date: '2020-02', temperature: 1.2, salinity: 34.69, depth: 2000, pressure: 989.0 },
      { date: '2021-02', temperature: 2.3, salinity: 34.55, depth: 2500, pressure: 1001.0 },
      { date: '2022-02', temperature: 1.9, salinity: 34.60, depth: 3000, pressure: 994.0 },
      { date: '2023-02', temperature: 2.5, salinity: 34.52, depth: 3500, pressure: 1003.0 }
    ],
    fileList: [
      { filename: 'so_ctd_profiles_2017_2023.nc', size: '1.8 GB', format: 'NetCDF4', updated: '2023-05-10' },
      { filename: 'so_hydrography_summary.csv', size: '600 MB', format: 'CSV', updated: '2023-05-10' }
    ],
    relatedExpeditionIds: ['exp-so-13', 'exp-so-11'],
    relatedStationIds: ['indarc-mooring'],
    relatedKnowledgeIds: ['oceanographic-research-southern-ocean'],
    relatedMediaIds: ['southern-ocean-expedition-collects-oceanographic-measurements', 'vid-3']
  },
  {
    id: 'POL-HIM-2024-004',
    title: 'Glacier Mass Balance & Thickness Dynamics — Western Himalayas',
    region: 'Himalayas',
    discipline: 'Glaciology & Cryosphere',
    station: 'Chhota Shigri Observatory',
    expedition: 'HIMANCHAL Cryosphere Monitoring',
    temporalCoverage: '2010-10-01 to 2023-10-31',
    startYear: 2010,
    endYear: 2023,
    spatialCoverage: '32.28° N, 77.52° E (Lahaul-Spiti, Himachal Pradesh)',
    coordinates: { lat: 32.28, lng: 77.52 },
    dataFormat: 'GeoJSON',
    fileSize: '410 MB',
    provider: 'Himalayan Cryosphere Division, NCPOR & Wadia Institute',
    lastUpdated: '2024-01-15',
    shortDescription: 'Glaciological direct mass balance (stake network measurements), DGPS ice surface flow velocity, and Ground Penetrating Radar (GPR) ice thickness surveys on Chhota Shigri Glacier.',
    fullDescription: 'Long-term benchmark glaciological observations from Chhota Shigri Glacier, one of the longest continuously monitored glaciers in the High Mountain Asia region. The dataset quantifies seasonal accumulation, ablation rates, equilibrium line altitude (ELA) shifts, and meltwater contribution to the Indus river basin.',
    tags: ['Glacier Mass Balance', 'Himalayas', 'Cryosphere', 'Ice Velocity', 'GPR', 'Water Security'],
    parameters: ['Annual Net Mass Balance (m w.e.)', 'Equilibrium Line Altitude (ELA)', 'Ice Surface Velocity (m/yr)', 'Ice Thickness (m)'],
    downloadsCount: 1850,
    doi: '10.5281/zenodo.ncpor.him.massbal.2024.004',
    citation: 'NCPOR Himalayan Cryosphere Group (2024). Benchmark Glacier Mass Balance & Velocity on Chhota Shigri Glacier (2010-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.him.massbal.2024.004.',
    variables: [
      { name: 'MASS_BAL', unit: 'm w.e.', description: 'Specific Net Mass Balance in meters water equivalent' },
      { name: 'ELA_ALT', unit: 'm a.s.l.', description: 'Equilibrium Line Altitude above sea level' },
      { name: 'ICE_VEL', unit: 'm/year', description: 'Surface Ice Velocity measured via DGPS' }
    ],
    sampleData: [
      { date: '2010', glacierMassBalance: -0.32, temperature: 2.1, pressure: 650 },
      { date: '2012', glacierMassBalance: -0.48, temperature: 2.4, pressure: 648 },
      { date: '2014', glacierMassBalance: -0.21, temperature: 1.9, pressure: 652 },
      { date: '2016', glacierMassBalance: -0.75, temperature: 2.9, pressure: 645 },
      { date: '2018', glacierMassBalance: -0.58, temperature: 2.6, pressure: 647 },
      { date: '2020', glacierMassBalance: -0.89, temperature: 3.2, pressure: 642 },
      { date: '2022', glacierMassBalance: -1.15, temperature: 3.6, pressure: 640 },
      { date: '2023', glacierMassBalance: -1.28, temperature: 3.8, pressure: 638 }
    ],
    fileList: [
      { filename: 'chhota_shigri_mass_balance_2010_2023.geojson', size: '280 MB', format: 'GeoJSON', updated: '2024-01-10' },
      { filename: 'chhota_shigri_stakes_survey.csv', size: '130 MB', format: 'CSV', updated: '2024-01-10' }
    ],
    relatedExpeditionIds: ['exp-him-08'],
    relatedStationIds: ['himansh-station'],
    relatedKnowledgeIds: ['climate-change-himalayan-cryosphere'],
    relatedMediaIds: ['new-himalayan-glacier-monitoring-campaign', 'vid-4']
  },
  {
    id: 'POL-ANT-2024-005',
    title: 'Antarctic Sea Ice Concentration & Satellite Radar Altimetry',
    region: 'Antarctica',
    discipline: 'Glaciology & Cryosphere',
    station: 'Bharati Station',
    expedition: '42nd Indian Antarctic Expedition',
    temporalCoverage: '2012-01-01 to 2024-02-29',
    startYear: 2012,
    endYear: 2024,
    spatialCoverage: '69.41° S, 76.19° E (Larsemann Hills & Prydz Bay Sector)',
    coordinates: { lat: -69.41, lng: 76.19 },
    dataFormat: 'NetCDF',
    fileSize: '6.2 GB',
    provider: 'Remote Sensing & Geoinformatics Division, NCPOR',
    lastUpdated: '2024-03-25',
    shortDescription: 'Calibrated daily sea ice concentration, sea ice freeboard height, and polynya area observations derived from Sentinel-3, CryoSat-2, and ground-truth radiometry near Larsemann Hills.',
    fullDescription: 'High-resolution Antarctic sea ice dataset covering the Indian Ocean sector of East Antarctica. Includes passive microwave satellite observations validated against shipboard ice thickness observations and coastal weather radar at Bharati Station.',
    tags: ['Sea Ice', 'Polynya', 'CryoSat-2', 'Bharati', 'Larsemann Hills', 'Remote Sensing'],
    parameters: ['Sea Ice Concentration (%)', 'Sea Ice Freeboard (m)', 'Fast Ice Extent (km²)', 'Polynya Area (km²)'],
    downloadsCount: 2100,
    doi: '10.5281/zenodo.ncpor.ant.seaice.2024.005',
    citation: 'NCPOR Polar Remote Sensing Lab (2024). Antarctic Sea Ice Concentration & Altimetry in Larsemann Hills Sector (2012-2024). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.ant.seaice.2024.005.',
    variables: [
      { name: 'SIC', unit: '%', description: 'Sea Ice Concentration percentage per pixel' },
      { name: 'ICE_FB', unit: 'm', description: 'Radar Altimetry Sea Ice Freeboard Height' },
      { name: 'POLY_AREA', unit: 'km²', description: 'Open Water Coastal Polynya Surface Area' }
    ],
    sampleData: [
      { date: '2012-02', seaIceConcentration: 85, temperature: -2.1, windSpeed: 8.5 },
      { date: '2014-02', seaIceConcentration: 89, temperature: -3.0, windSpeed: 9.2 },
      { date: '2016-02', seaIceConcentration: 78, temperature: -1.5, windSpeed: 10.4 },
      { date: '2018-02', seaIceConcentration: 72, temperature: -0.9, windSpeed: 11.1 },
      { date: '2020-02', seaIceConcentration: 69, temperature: -0.4, windSpeed: 12.0 },
      { date: '2022-02', seaIceConcentration: 61, temperature: 0.2, windSpeed: 13.5 },
      { date: '2024-02', seaIceConcentration: 54, temperature: 0.8, windSpeed: 14.2 }
    ],
    fileList: [
      { filename: 'antarctic_sic_daily_2012_2024.nc', size: '4.8 GB', format: 'NetCDF4', updated: '2024-03-20' },
      { filename: 'bharati_fast_ice_polynya_summary.csv', size: '1.4 GB', format: 'CSV', updated: '2024-03-20' }
    ]
  },
  {
    id: 'POL-ANT-2024-006',
    title: 'Bharati Ozone Layer Sounding & Ultraviolet Radiation Time Series',
    region: 'Antarctica',
    discipline: 'Atmospheric Sciences',
    station: 'Bharati Station',
    expedition: '43rd Indian Antarctic Expedition',
    temporalCoverage: '2013-09-01 to 2023-12-31',
    startYear: 2013,
    endYear: 2023,
    spatialCoverage: '69.41° S, 76.19° E (Larsemann Hills)',
    coordinates: { lat: -69.41, lng: 76.19 },
    dataFormat: 'ASCII',
    fileSize: '340 MB',
    provider: 'Atmospheric Physics & Space Weather Lab, NCPOR',
    lastUpdated: '2024-01-20',
    shortDescription: 'Ozonesonde vertical profiles (0-35km altitude) and continuous Brewer Spectrophotometer Total Column Ozone (TCO) and UV-B irradiance measurements.',
    fullDescription: 'High-precision atmospheric stratospheric ozone vertical profiles and surface ultraviolet radiation collected at Bharati Station during springtime Antarctic ozone hole cycles. Tracks chlorine activation, Antarctic polar vortex dynamics, and solar UV radiation impact on coastal terrestrial mosses.',
    tags: ['Ozone Hole', 'Ozonesonde', 'UV-B Irradiance', 'Bharati', 'Stratosphere', 'Polar Vortex'],
    parameters: ['Total Column Ozone (Dobson Units)', 'Stratospheric Ozone Partial Pressure (mPa)', 'UV Index', 'UV-B Spectral Irradiance'],
    downloadsCount: 890,
    doi: '10.5281/zenodo.ncpor.ant.ozone.2024.006',
    citation: 'NCPOR Atmospheric Division (2024). Stratospheric Ozone Hole Profiles & Surface UV Irradiance at Bharati Station (2013-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.ant.ozone.2024.006.',
    variables: [
      { name: 'TCO_DU', unit: 'Dobson Units', description: 'Total Column Ozone Amount' },
      { name: 'UV_INDEX', unit: 'Index value', description: 'Midday Solar UV Index' }
    ],
    sampleData: [
      { date: '2013-10', temperature: -52.4, pressure: 120, blackCarbon: 2 },
      { date: '2015-10', temperature: -55.1, pressure: 115, blackCarbon: 1 },
      { date: '2017-10', temperature: -48.9, pressure: 135, blackCarbon: 3 },
      { date: '2019-10', temperature: -42.1, pressure: 160, blackCarbon: 4 },
      { date: '2021-10', temperature: -56.8, pressure: 110, blackCarbon: 1 },
      { date: '2023-10', temperature: -51.2, pressure: 125, blackCarbon: 2 }
    ],
    fileList: [
      { filename: 'bharati_ozonesonde_profiles_2013_2023.dat', size: '240 MB', format: 'ASCII', updated: '2024-01-15' },
      { filename: 'bharati_uv_index_daily.csv', size: '100 MB', format: 'CSV', updated: '2024-01-15' }
    ]
  },
  {
    id: 'POL-ARC-2023-007',
    title: 'IndARC Subsurface Mooring Multi-Sensor Oceanographic Time Series',
    region: 'Arctic',
    discipline: 'Oceanography',
    station: 'IndARC Mooring',
    expedition: '15th Indian Arctic Expedition',
    temporalCoverage: '2014-07-01 to 2023-08-31',
    startYear: 2014,
    endYear: 2023,
    spatialCoverage: '78.90° N, 12.00° E (Kongsfjorden, Svalbard)',
    coordinates: { lat: 78.90, lng: 12.00 },
    dataFormat: 'NetCDF',
    fileSize: '3.1 GB',
    provider: 'NCPOR Ocean Sciences & Svalbard Mooring Team',
    lastUpdated: '2023-10-05',
    shortDescription: 'India’s first underwater moored observatory (IndARC) measuring fjord temperature, salinity, current velocity vectors (ADCP), and turbidity continuously beneath Arctic sea ice.',
    fullDescription: 'Uninterrupted long-term oceanographic data from the IndARC subsurface mooring anchored at 192m depth in Kongsfjorden fjord, Svalbard. Tracks Atlantic Water (AW) advection into the High Arctic fjord, winter convection, glacier runoff, and marine ecosystem responses to Atlantification.',
    tags: ['IndARC', 'Mooring Observatory', 'Kongsfjorden', 'Atlantic Water Advection', 'Current Velocity', 'Svalbard'],
    parameters: ['Fjord Water Temperature (°C)', 'Salinity (PSU)', 'ADCP Current Velocity (cm/s)', 'Turbidity (NTU)', 'Photosynthetically Active Radiation (PAR)'],
    downloadsCount: 1670,
    doi: '10.5281/zenodo.ncpor.arc.indarc.2023.007',
    citation: 'NCPOR IndARC Mooring Group (2023). IndARC Subsurface Observatory Time Series in Kongsfjorden (2014-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.arc.indarc.2023.007.',
    variables: [
      { name: 'FJORD_TEMP', unit: '°C', description: 'In-situ Subsurface Temperature at 100m' },
      { name: 'FJORD_SAL', unit: 'PSU', description: 'Subsurface Salinity at 100m' },
      { name: 'CURRENT_SPD', unit: 'cm/s', description: 'Acoustic Doppler Current Profiler Velocity Magnitude' }
    ],
    sampleData: [
      { date: '2014-08', temperature: 3.4, salinity: 34.82, depth: 100 },
      { date: '2016-08', temperature: 4.1, salinity: 34.88, depth: 100 },
      { date: '2018-08', temperature: 4.6, salinity: 34.92, depth: 100 },
      { date: '2020-08', temperature: 5.2, salinity: 34.95, depth: 100 },
      { date: '2022-08', temperature: 5.8, salinity: 34.99, depth: 100 },
      { date: '2023-08', temperature: 5.5, salinity: 34.97, depth: 100 }
    ],
    fileList: [
      { filename: 'indarc_mooring_full_2014_2023.nc', size: '2.5 GB', format: 'NetCDF4', updated: '2023-09-30' },
      { filename: 'indarc_adcp_currents.csv', size: '600 MB', format: 'CSV', updated: '2023-09-30' }
    ]
  },
  {
    id: 'POL-HIM-2024-008',
    title: 'Himalayan Snow Chemistry & Heavy Metal Deposition Inventory',
    region: 'Himalayas',
    discipline: 'Polar Biology & Ecosystems',
    station: 'Chhota Shigri Observatory',
    expedition: 'HIMANCHAL Cryosphere Monitoring',
    temporalCoverage: '2016-05-01 to 2023-11-30',
    startYear: 2016,
    endYear: 2023,
    spatialCoverage: '32.28° N, 77.52° E (Chhota Shigri Basin)',
    coordinates: { lat: 32.28, lng: 77.52 },
    dataFormat: 'CSV',
    fileSize: '190 MB',
    provider: 'Biogeochemistry Division, NCPOR & IIT Roorkee',
    lastUpdated: '2024-02-02',
    shortDescription: 'Ionic chemistry (SO₄²⁻, NO₃⁻, NH₄⁺), microplastics, lead isotope ratios, and trace metal concentrations in seasonal snowpack and ice cores across High Asia.',
    fullDescription: 'Geochemical and biogeochemical analysis of snow pits and seasonal precipitation samples collected across Western Himalayan elevation transects (3800m - 5400m a.s.l.). Tracks anthropogenic dust transport from Indo-Gangetic Plains, industrial pollution, and microplastic deposition.',
    tags: ['Snow Chemistry', 'Heavy Metals', 'Microplastics', 'Himalayas', 'Indo-Gangetic Plains', 'Pollution'],
    parameters: ['Major Ions (mg/L)', 'Heavy Metal Concentration (Pb, Cd, As)', 'Microplastic Particles/L', 'Stable Water Isotopes (δ18O, δD)'],
    downloadsCount: 610,
    doi: '10.5281/zenodo.ncpor.him.chem.2024.008',
    citation: 'Biogeochemistry Group (2024). Geochemical & Microplastic Inventory of Western Himalayan Snowpacks (2016-2023). Polaris Data Portal, DOI: 10.5281/zenodo.ncpor.him.chem.2024.008.',
    variables: [
      { name: 'SO4_CONC', unit: 'mg/L', description: 'Sulfate Ion Concentration' },
      { name: 'PB_CONC', unit: 'µg/L', description: 'Lead Heavy Metal Concentration' },
      { name: 'DELTA_18O', unit: '‰', description: 'Oxygen-18 Stable Isotopic Composition' }
    ],
    sampleData: [
      { date: '2016', blackCarbon: 32, temperature: 1.8, pressure: 650 },
      { date: '2018', blackCarbon: 48, temperature: 2.2, pressure: 648 },
      { date: '2020', blackCarbon: 65, temperature: 2.9, pressure: 643 },
      { date: '2022', blackCarbon: 82, temperature: 3.4, pressure: 641 },
      { date: '2023', blackCarbon: 94, temperature: 3.7, pressure: 639 }
    ],
    fileList: [
      { filename: 'himalayan_snowpack_chemistry_2016_2023.csv', size: '150 MB', format: 'CSV', updated: '2024-01-25' },
      { filename: 'snowpack_isotopes_metadata.json', size: '40 MB', format: 'JSON', updated: '2024-01-25' }
    ]
  }
];

export const REGION_CARDS_DATA = [
  {
    id: 'Antarctica',
    title: 'Antarctica',
    datasetCount: '240+ Datasets',
    stationsCount: '2 Active Stations (Maitri & Bharati)',
    description: 'Long-term meteorology, ozone hole profiles, ice sheet radar dynamics, and lake sediment palaeoclimate records in Queen Maud Land and Larsemann Hills.',
    accentColor: 'from-blue-600 to-indigo-800',
    vectorIcon: 'antarctica'
  },
  {
    id: 'Arctic',
    title: 'Arctic',
    datasetCount: '130+ Datasets',
    stationsCount: 'Himadri Station & IndARC Mooring',
    description: 'High-Arctic atmospheric aerosols, black carbon warming, Svalbard fjord Atlantification, and sea ice biogeochemistry at Ny-Ålesund.',
    accentColor: 'from-sky-500 to-blue-700',
    vectorIcon: 'arctic'
  },
  {
    id: 'Himalayas',
    title: 'Himalayas',
    datasetCount: '85+ Datasets',
    stationsCount: 'Chhota Shigri & HIMANCHAL Hub',
    description: 'Third Pole glacier mass balance, seasonal snowpack chemistry, permafrost thermal state, and Indus-Ganga-Brahmaputra meltwater modeling.',
    accentColor: 'from-cyan-600 to-teal-800',
    vectorIcon: 'himalayas'
  },
  {
    id: 'Southern Ocean',
    title: 'Southern Ocean',
    datasetCount: '95+ Datasets',
    stationsCount: 'ORV Sagar Kanya Research Vessel',
    description: 'Subtropical to Polar Front CTD hydrography, Antarctic Bottom Water (AABW) formation, dissolved carbon flux, and marine phytoplankton ecology.',
    accentColor: 'from-blue-700 to-cyan-900',
    vectorIcon: 'ocean'
  }
];
