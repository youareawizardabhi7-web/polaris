'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AssistantMessage, AssistantContext, AssistantRequest } from '@/types/assistant';
import { askAssistant } from '@/lib/ai/client';
import { ChatMessage } from '@/components/ai/ChatMessage';
import { SuggestedQuestions } from '@/components/ai/SuggestedQuestions';
import { AssistantLoading } from '@/components/ai/AssistantLoading';
import { AssistantError } from '@/components/ai/AssistantError';
import { 
  Compass, 
  Send, 
  Sparkles, 
  X, 
  Layers, 
  Database, 
  BookOpen, 
  Radio, 
  Navigation,
  MessageSquare
} from 'lucide-react';

interface AssistantChatProps {
  initialContext?: AssistantContext | null;
  onClearContext?: () => void;
}

export const AssistantChat: React.FC<AssistantChatProps> = ({ initialContext, onClearContext }) => {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const [currentContext, setCurrentContext] = useState<AssistantContext | null>(initialContext || null);
  const [lastFailedRequest, setLastFailedRequest] = useState<AssistantRequest | null>(null);

  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentContext(initialContext || null);
  }, [initialContext]);

  // Auto-scroll to latest message
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, errorState]);

  const handleSend = async (questionText?: string) => {
    const query = (questionText || inputQuestion).trim();
    if (!query || isLoading) return;

    setErrorState(null);
    setInputQuestion('');

    const userMsgId = `user-${Date.now()}`;
    const userMessage: AssistantMessage = {
      id: userMsgId,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const req: AssistantRequest = {
      question: query,
      context: currentContext || undefined,
      messages: [...messages, userMessage]
    };

    try {
      const response = await askAssistant(req);
      const assistantMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setLastFailedRequest(req);
      setErrorState(err?.message || 'Unable to connect to the POLARIS AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = async () => {
    if (!lastFailedRequest || isLoading) return;
    setErrorState(null);
    setIsLoading(true);

    try {
      const response = await askAssistant(lastFailedRequest);
      const assistantMessage: AssistantMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      setErrorState(err?.message || 'Unable to connect to the POLARIS AI service.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveContext = () => {
    setCurrentContext(null);
    if (onClearContext) onClearContext();
  };

  const getContextBadgeIcon = (type: string) => {
    switch (type) {
      case 'dataset': return Database;
      case 'knowledge': return BookOpen;
      case 'expedition': return Navigation;
      case 'station': return Radio;
      default: return Layers;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] min-h-[500px] max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      
      {/* Assistant Header */}
      <div className="bg-slate-900 text-white p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-600/40 text-sky-400 flex items-center justify-center font-bold shadow-xs">
            <Compass className="w-6 h-6 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-bold font-mono tracking-tight text-white">POLARIS AI</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-950 text-sky-300 border border-sky-800">
                Scientific Assistant
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Explore polar science through the POLARIS knowledge base.
            </p>
          </div>
        </div>
      </div>

      {/* Active Context Banner */}
      {currentContext && (
        <div className="bg-sky-50 border-b border-sky-200 p-3 sm:px-6 flex items-center justify-between text-xs font-mono shrink-0">
          <div className="flex items-center space-x-2 text-sky-900">
            <span className="font-bold uppercase tracking-wider text-[10px] text-sky-700">Active Context:</span>
            <span className="px-2 py-0.5 rounded bg-sky-200 text-sky-900 font-bold uppercase text-[10px]">
              {currentContext.type}
            </span>
            <span className="font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
              {currentContext.title || currentContext.id}
            </span>
          </div>
          <button
            onClick={handleRemoveContext}
            className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-sky-300 text-slate-700 rounded-md font-bold text-[11px] flex items-center space-x-1 transition-colors"
          >
            <X className="w-3 h-3 text-slate-500" />
            <span>Remove context</span>
          </button>
        </div>
      )}

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar bg-slate-50/50">
        
        {/* Initial Empty State */}
        {messages.length === 0 && (
          <div className="space-y-6 max-w-2xl mx-auto py-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mx-auto">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Ask POLARIS AI</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Ask POLARIS about datasets, expeditions, stations and polar research across Antarctica, the Arctic, the Southern Ocean, and the Himalayas.
              </p>
            </div>

            <SuggestedQuestions onSelect={(q) => handleSend(q)} />
          </div>
        )}

        {/* Conversation Message List */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Loading Indicator */}
        {isLoading && <AssistantLoading />}

        {/* Error View */}
        {errorState && <AssistantError message={errorState} onRetry={handleRetry} />}

        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar Form */}
      <div className="p-4 bg-white border-t border-slate-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center space-x-2"
        >
          <label htmlFor="assistant-input" className="sr-only">
            Ask POLARIS AI a scientific research question
          </label>
          <input
            id="assistant-input"
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            disabled={isLoading}
            placeholder={
              currentContext 
                ? `Ask a question about ${currentContext.title || currentContext.id}...`
                : "Ask about datasets, expeditions, stations, or polar research..."
            }
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            aria-label="Send scientific question to POLARIS AI"
            className="px-5 py-3 bg-slate-900 hover:bg-sky-800 disabled:bg-slate-300 text-white rounded-xl font-mono font-bold text-xs transition-colors flex items-center space-x-1.5 shadow-2xs disabled:cursor-not-allowed shrink-0"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

    </div>
  );
};
