## 🖥️ Implementation of React Frontend

To complement the backend system, the **frontend of NeuroDoc** was developed using **React**, providing a modern, fast, and user-friendly interface. It allows users to search and explore enterprise documents through a clean and responsive interface.

The frontend communicates directly with the OpenSearch backend through structured queries, and it dynamically displays results with highlights, metadata, and smart UI interactions. The interface also supports multilingual options, theme switching, and advanced filtering for an enhanced user experience.

---

### 🔧 Core Capabilities

- **Multilingual UI**: supports English, Arabic (with RTL layout), and Polish, with automatic language detection and manual selection.
- **Live Interaction**: search results are updated dynamically based on user queries.
- **Dynamic Filters**: optional filters include date ranges, content keywords, signature, and tags, all accessible via a collapsible panel.
- **Search History Tags**: recently searched queries are shown as clickable tags that can be reused or removed.
- **Dark Mode Toggle**: users can switch between light and dark themes with smooth transitions.
- **File Upload Placeholder**: includes a UI button for uploading documents (planned for future functionality).
---


### 🔄 Frontend Workflow

1. The user types a query in the floating input field.
2. When submitted, the query is sent to the backend API using a `fetch` request.
3. The frontend builds a structured request, including optional language and filter data.
4. The results from the backend are displayed using styled blocks showing titles, snippets, and metadata.
5. If no results are returned, a fallback message is shown to the user.
6. The query is stored in the search history and displayed as a tag.
7. A loading spinner appears during the request, and a toast message shows warnings like empty queries or errors.

---
```mermaid
flowchart TD

A1([User Loads Interface]) --> A2[Initialize App]
A2 --> A3[Select Language / Theme]
A3 --> A4[Enter Query or Upload File]

A4 --> B1{Is Input Empty?}
B1 -->|Yes| B2[Show Toast Message]
B1 -->|No| B3{Input Type}

B3 -->|Query| C1[Call handleSearch]
B3 -->|File| C2[Call handleFileUpload]
C1 --> D1[Show Spinner]
C2 --> D1

D1 --> D2[Send Request to Backend API]
D2 --> D3[Wait for LLM Response]

D3 --> D4[Animate Typing of Response]
D4 --> D5[Update Response Area]

D5 --> E1[Show File Name if Uploaded]
D5 --> E2[Enable Copy Button]
D5 --> E3[Enable Clear History Button]
D5 --> E4[Update Search History]
D5 --> E5[Allow Scroll to Top]

E1 --> F1([Display Search Result])
E2 --> F1
E3 --> F1
E4 --> F1
E5 --> F1

classDef node fill:#bbdefb,stroke:#333,stroke-width:1px;
class A1,A2,A3,A4,B1,B2,B3,C1,C2,D1,D2,D3,D4,D5,E1,E2,E3,E4,E5,F1 node;
```
---
