'use client';

import React, { useState } from 'react';
import { DatasetItem, DatasetTimeSeriesPoint } from '@/types/portal';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Sliders, BarChart2, TrendingUp, Table, Download, RefreshCw, Calendar, Check } from 'lucide-react';

interface DatasetVisualizationProps {
  dataset: DatasetItem;
}

export const DatasetVisualization: React.FC<DatasetVisualizationProps> = ({ dataset }) => {
  const [selectedParam, setSelectedParam] = useState<'temperature' | 'windSpeed' | 'pressure' | 'blackCarbon' | 'seaIceConcentration' | 'glacierMassBalance'>('temperature');
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line');
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const [timeRange, setTimeRange] = useState<'all' | 'recent'>('all');

  const paramConfig = {
    temperature: { name: 'Surface Temperature', unit: '°C', color: '#0284c7', fill: '#e0f2fe' },
    windSpeed: { name: 'Wind Speed', unit: 'm/s', color: '#0f2942', fill: '#cbd5e1' },
    pressure: { name: 'Barometric Pressure', unit: 'hPa', color: '#4f46e5', fill: '#e0e7ff' },
    blackCarbon: { name: 'Black Carbon Conc.', unit: 'ng/m³', color: '#dc2626', fill: '#fee2e2' },
    seaIceConcentration: { name: 'Sea Ice Conc.', unit: '%', color: '#0891b2', fill: '#cffaff' },
    glacierMassBalance: { name: 'Glacier Mass Balance', unit: 'm w.e.', color: '#059669', fill: '#d1fae5' },
  };

  const chartData = timeRange === 'recent' ? dataset.sampleData.slice(-6) : dataset.sampleData;

  const currentConfig = paramConfig[selectedParam];

  // Custom Scientific Tooltip Component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl text-white text-xs font-mono">
          <p className="text-slate-400 font-semibold mb-1">{`Date: ${label}`}</p>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentConfig.color }}></span>
            <span>{currentConfig.name}:</span>
            <strong className="text-sky-300">{payload[0].value} {currentConfig.unit}</strong>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6">
      
      {/* Analytics Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase font-bold text-sky-700 mb-1">
            <TrendingUp className="w-4 h-4 text-sky-600" />
            <span>SCIENTIFIC ANALYTICS DASHBOARD</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Interactive Parameter Visualization
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Displaying benchmark observations for <strong className="text-slate-800">{dataset.title}</strong>
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center space-x-2">
          <div className="bg-slate-100 p-1 rounded-lg border border-slate-200 flex items-center space-x-1">
            <button
              onClick={() => setViewMode('chart')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                viewMode === 'chart' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Chart View</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Data Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Bar: Parameter, Chart Type & Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-50 border border-slate-200 p-4 rounded-xl">
        
        {/* Select Parameter */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
            Observed Parameter
          </label>
          <select
            value={selectedParam}
            onChange={(e: any) => setSelectedParam(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-sky-500"
          >
            <option value="temperature">Surface Air Temperature (°C)</option>
            <option value="windSpeed">Wind Speed (m/s)</option>
            <option value="pressure">Barometric Pressure (hPa)</option>
            <option value="blackCarbon">Black Carbon Conc. (ng/m³)</option>
            <option value="seaIceConcentration">Sea Ice Concentration (%)</option>
            <option value="glacierMassBalance">Glacier Mass Balance (m w.e.)</option>
          </select>
        </div>

        {/* Chart Style Switcher */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
            Chart Render Style
          </label>
          <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 rounded-lg">
            {(['line', 'area', 'bar'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setChartType(style)}
                className={`flex-1 py-1 rounded text-xs font-medium uppercase font-mono transition-colors ${
                  chartType === style ? 'bg-slate-900 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Time Span Filter */}
        <div className="space-y-1">
          <label className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider block">
            Time Range Filter
          </label>
          <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 rounded-lg">
            <button
              onClick={() => setTimeRange('all')}
              className={`flex-1 py-1 rounded text-xs font-medium font-mono transition-colors ${
                timeRange === 'all' ? 'bg-sky-100 text-sky-900 font-bold border border-sky-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Full Series ({dataset.startYear}–{dataset.endYear})
            </button>
            <button
              onClick={() => setTimeRange('recent')}
              className={`flex-1 py-1 rounded text-xs font-medium font-mono transition-colors ${
                timeRange === 'recent' ? 'bg-sky-100 text-sky-900 font-bold border border-sky-200' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Recent 6 Epochs
            </button>
          </div>
        </div>

      </div>

      {/* Main Render Area: Chart or Data Table */}
      {viewMode === 'chart' ? (
        <div className="h-80 sm:h-96 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit={` ${currentConfig.unit}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line
                  type="monotone"
                  dataKey={selectedParam}
                  name={currentConfig.name}
                  stroke={currentConfig.color}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: currentConfig.color, strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            ) : chartType === 'area' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit={` ${currentConfig.unit}`} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={selectedParam}
                  name={currentConfig.name}
                  stroke={currentConfig.color}
                  fill={currentConfig.color}
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
              </AreaChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} unit={` ${currentConfig.unit}`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={selectedParam}
                  name={currentConfig.name}
                  fill={currentConfig.color}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      ) : (
        /* Data Table View */
        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase">
                <th className="py-2.5 px-4">Date/Epoch</th>
                <th className="py-2.5 px-4">Temperature (°C)</th>
                <th className="py-2.5 px-4">Wind Speed (m/s)</th>
                <th className="py-2.5 px-4">Baro Pressure (hPa)</th>
                <th className="py-2.5 px-4">Black Carbon (ng/m³)</th>
                <th className="py-2.5 px-4">Sea Ice (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              {chartData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="py-2 px-4 font-bold text-sky-800">{row.date}</td>
                  <td className="py-2 px-4">{row.temperature !== undefined ? `${row.temperature} °C` : '—'}</td>
                  <td className="py-2 px-4">{row.windSpeed !== undefined ? `${row.windSpeed} m/s` : '—'}</td>
                  <td className="py-2 px-4">{row.pressure !== undefined ? `${row.pressure} hPa` : '—'}</td>
                  <td className="py-2 px-4">{row.blackCarbon !== undefined ? `${row.blackCarbon} ng/m³` : '—'}</td>
                  <td className="py-2 px-4">{row.seaIceConcentration !== undefined ? `${row.seaIceConcentration} %` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
