export type SourceType = 
  | "dataset"
  | "knowledge"
  | "media"
  | "expedition"
  | "station";

export interface AssistantSource {
  id: string;
  type: SourceType;
  title: string;
  description?: string;
  url: string;
}

export interface AssistantResponse {
  answer: string;
  sources: AssistantSource[];
}

export interface AssistantContext {
  type: SourceType;
  id: string;
  title?: string;
}

export interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: AssistantSource[];
  timestamp?: string;
}

export interface AssistantRequest {
  question: string;
  context?: AssistantContext;
  messages?: AssistantMessage[];
}
