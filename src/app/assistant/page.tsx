'use client';

import React, { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { AssistantChat } from '@/components/ai/AssistantChat';
import { AssistantContext, SourceType } from '@/types/assistant';

function AssistantContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const contextType = searchParams.get('contextType') as SourceType | null;
  const contextId = searchParams.get('contextId');
  const contextTitle = searchParams.get('contextTitle') || undefined;

  const initialContext: AssistantContext | null = contextType && contextId ? {
    type: contextType,
    id: contextId,
    title: contextTitle
  } : null;

  const handleClearContext = () => {
    router.push('/assistant');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <AssistantChat 
          initialContext={initialContext} 
          onClearContext={handleClearContext} 
        />
      </div>
    </div>
  );
}

export default function AssistantPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 py-12 text-center text-xs font-mono text-slate-500">
        Loading POLARIS AI Assistant...
      </div>
    }>
      <AssistantContent />
    </Suspense>
  );
}
