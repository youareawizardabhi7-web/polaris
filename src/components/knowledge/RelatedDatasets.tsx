'use client';

import React from 'react';
import Link from 'next/link';
import { MOCK_DATASETS } from '@/lib/data/datasets';
import { DatasetCard } from '@/components/datasets/DatasetCard';
import { Database, ExternalLink } from 'lucide-react';

interface RelatedDatasetsProps {
  datasetIds: string[];
}

export const RelatedDatasets: React.FC<RelatedDatasetsProps> = ({ datasetIds }) => {
  if (!datasetIds || datasetIds.length === 0) return null;

  const matchedDatasets = MOCK_DATASETS.filter((d) => datasetIds.includes(d.id));

  if (matchedDatasets.length === 0) return null;

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center font-bold">
            <Database className="w-4 h-4 text-sky-700" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Connected Scientific Datasets</h3>
            <p className="text-xs text-slate-500">
              Observational dataset packages collected and archived for this scientific research area.
            </p>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-sky-50 text-sky-800 border border-sky-200 rounded text-xs font-mono font-bold">
          {matchedDatasets.length} Linked Datasets
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchedDatasets.map((ds) => (
          <DatasetCard key={ds.id} dataset={ds} />
        ))}
      </div>
    </section>
  );
};
