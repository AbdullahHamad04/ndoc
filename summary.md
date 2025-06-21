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

### 🧭 Frontend Flowchart

```mermaid
flowchart TD

A1([User Loads Interface]) --> A2[Initialize App]
A2 --> A3[Select Language / Theme]
A3 --> A4[Enter Query]

A4 --> B1{Is Input Empty?}
B1 -->|Yes| B2[Show Toast Message]
B1 -->|No| C1[Call handleSearch]

C1 --> D1[Show Spinner]
D1 --> D2[Send Request to OpenSearch API]
D2 --> D3[Receive Search Results]

D3 --> D4[Update SearchResults Component]
D4 --> E1[Update Response Display if needed]
D4 --> E2[Update Search History Tags]

E1 --> F1([Enable Copy Button])
E2 --> F1

classDef node fill:#bbdefb,stroke:#333,stroke-width:1px;
class A1,A2,A3,A4,B1,B2,C1,D1,D2,D3,D4,E1,E2,F1 node;
```
---
### ⚙️ Technical Stack

| Layer           | Technology                  | Purpose                                      |
|---------------- |-----------------------------|----------------------------------------------|
| Frontend        | React 19                    | Component-based user interface               |
| Dev Environment | Vite                        | Fast bundling, local dev server, proxy setup |
| Styling         | CSS + Custom SVG Icons      | Responsive layout and interactive elements   |
| Routing         | React Router v7             | Client-side routing                          |
| API Requests    | Fetch API                   | Communicates with OpenSearch backend         |
| State Handling  | React Hooks (useState, etc) | UI control and interaction logic             |
| Language Logic  | `navigator.language`        | Auto-detects browser language                |
| Proxy Config    | Vite Proxy                  | Bypasses CORS for local OpenSearch queries   |

---
---

### 🏆 Key Frontend Achievements

- ✅ Clean, fast, and user-friendly interface using modular React components.
- ✅ Multilingual UI supporting English, Arabic (RTL), and Polish with auto-detection and manual switching.
- ✅ Integrated dark/light theme toggle with smooth transitions.
- ✅ Dynamic search history tags that can be clicked or removed.
- ✅ Real-time feedback via toast messages and animated spinner.
- ✅ Advanced filters for refining results (date range, keywords, tags).
- ✅ Fully responsive design compatible with desktop and mobile views.
- ✅ Direct communication with OpenSearch through proxy configuration for CORS-free local development.

---
### 🔗 React ↔ OpenSearch Connection

```mermaid
flowchart LR
    A[🖥️ User on React UI] --> B[🔍 Enter Search Query]
    B --> C[📤 Fetch Request Sent]
    C --> D[Vite Proxy Server (localhost:5173)]
    D --> E[📡 OpenSearch Server (localhost:9200)]
    E --> F[📥 Search Results Returned]
    F --> G[📄 Displayed in React UI]

    classDef box fill:#e3f2fd,stroke:#333,stroke-width:1px,color:#000;
    class A,B,C,D,E,F,G box;
```

