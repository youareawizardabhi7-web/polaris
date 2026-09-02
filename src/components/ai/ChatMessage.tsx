'use client';

import React from 'react';
import { AssistantMessage } from '@/types/assistant';
import { SourceCard } from '@/components/ai/SourceCard';
import { Compass, User, Database } from 'lucide-react';

interface ChatMessageProps {
  message: AssistantMessage;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} animate-in fade-in duration-150`}>
      {/* Role Avatar */}
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border shadow-2xs ${
        isUser
          ? 'bg-slate-900 border-slate-800 text-sky-300'
          : 'bg-gradient-to-br from-slate-900 to-sky-950 border-sky-800 text-sky-400'
      }`}>
        {isUser ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
      </div>

      {/* Message Bubble Container */}
      <div className={`max-w-3xl space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
        
        {/* Text Content */}
        <div className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-2xs font-sans ${
          isUser
            ? 'bg-slate-900 text-white rounded-tr-xs border border-slate-800'
            : 'bg-white text-slate-800 rounded-tl-xs border border-slate-200'
        }`}>
          {message.content}
        </div>

        {/* Sources Section (For Assistant Responses) */}
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="flex items-center space-x-1.5 text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5 text-sky-600" />
              <span>Referenced Scientific Sources ({message.sources.length}):</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {message.sources.map((src) => (
                <SourceCard key={src.id} source={src} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
