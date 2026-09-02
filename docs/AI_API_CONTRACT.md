# POLARIS AI Assistant — Frontend API Contract Specification

This document defines the RESTful JSON contract between the **POLARIS Frontend** and the **Teammate Backend AI Service**.

---

## Service Endpoint

- **URL**: `${NEXT_PUBLIC_API_URL}/api/assistant`
- **Method**: `POST`
- **Headers**:
  ```http
  Content-Type: application/json
  ```

---

## 1. Request Payload (`AssistantRequest`)

```json
{
  "question": "Find datasets related to Maitri Station",
  "context": {
    "type": "dataset",
    "id": "POL-ANT-2024-001",
    "title": "Antarctic Surface Meteorology & AWS High-Resolution Time Series"
  },
  "messages": [
    {
      "id": "user-1718000000000",
      "role": "user",
      "content": "Tell me about Maitri."
    },
    {
      "id": "assistant-1718000001000",
      "role": "assistant",
      "content": "Maitri is India's second permanent Antarctic station..."
    }
  ]
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `question` | `string` | **Yes** | The user's input scientific question or prompt. |
| `context` | `object` | Optional | Research context if invoked from a specific record page. |
| `context.type` | `string` | Optional | Entity type: `"dataset" \| "knowledge" \| "media" \| "expedition" \| "station"` |
| `context.id` | `string` | Optional | Unique ID of the record (e.g. `POL-ANT-2024-001`). |
| `context.title` | `string` | Optional | Display title of the contextual record. |
| `messages` | `array` | Optional | Active conversation history array (`AssistantMessage[]`). |

---

## 2. Response Payload (`AssistantResponse`)

```json
{
  "answer": "I found several POLARIS records related to Maitri Station in Antarctica including surface meteorology datasets and ice core palaeoclimate reports.",
  "sources": [
    {
      "id": "station-maitri",
      "type": "station",
      "title": "Maitri Research Station",
      "description": "India's second permanent Antarctic research station in Schirmacher Oasis.",
      "url": "/map?station=maitri-station"
    },
    {
      "id": "POL-ANT-2024-001",
      "type": "dataset",
      "title": "Antarctic Surface Meteorology & AWS High-Resolution Time Series",
      "description": "Continuous 10-minute surface air temperature, katabatic wind vector, and pressure records.",
      "url": "/datasets/POL-ANT-2024-001"
    }
  ]
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---|---|
| `answer` | `string` | **Yes** | The generated plain text / markdown scientific explanation. |
| `sources` | `array` | **Yes** | List of referenced POLARIS records (`AssistantSource[]`). |
| `sources[].id` | `string` | **Yes** | Unique entity identifier. |
| `sources[].type` | `string` | **Yes** | Entity type: `"dataset" \| "knowledge" \| "media" \| "expedition" \| "station"` |
| `sources[].title` | `string` | **Yes** | Title of the referenced resource. |
| `sources[].description` | `string` | Optional | Short summary snippet of the resource. |
| `sources[].url` | `string` | **Yes** | Relative frontend route (e.g., `/datasets/POL-ANT-2024-001` or `/map?station=maitri-station`). |

---

## 3. Environment Configuration

- Set backend URL in `.env.local`:
  ```env
  NEXT_PUBLIC_API_URL=https://api.polaris.example.org
  ```
- To toggle development client-side mock mode:
  ```env
  NEXT_PUBLIC_AI_MOCK=true
  ```

---

## 4. Architectural Guarantee

- The frontend does **NOT** store secret API keys, invoke vector databases, or call LLM endpoints directly from the client.
- All RAG retrieval, prompt formatting, embedding search, and model calls remain completely encapsulated inside the teammate's backend server.
