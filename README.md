# BharatVeda — Indian Heritage & Travel Discovery Platform

**BharatVeda** is a location-based Indian cultural tourism and travel planning web application. It integrates verified historical monuments, curated heritage stays, regional gastronomies, spatial PIN-code geocoding, interactive Leaflet maps, and structured day-by-day itinerary planning into a unified, user-friendly interface.

---

## 🧭 Product Positioning & Architectural Comparison

While travelers today have access to general-purpose AI chatbots, commercial booking portals, and online encyclopedias, each tool has distinct trade-offs. BharatVeda is designed specifically to bridge the gap between **cultural exploration, spatial navigation, and actionable trip planning**.

### Grounded Feature & Scope Comparison

| Capability | General AI Chatbots *(ChatGPT, Gemini)* | Commercial OTAs *(Booking.com, MMT)* | Encyclopedic Portals *(Wikipedia, Official Tourism)* | **BharatVeda Platform** |
|---|---|---|---|---|
| **Primary Focus** | General text conversation | High-volume hotel transactions | Static historical articles | **Curated Indian cultural discovery & trip planning** |
| **Spatial Grounding & Maps** | ❌ Plain text output without interactive coordinates | ⚠️ Commercial maps prioritized by ad revenue | ❌ Static maps or links only | ✅ **Interactive Leaflet + OpenStreetMap with exact Haversine distance calculations** |
| **6-Digit PIN Code Geocoding** | ❌ Cannot resolve postal PINs to radius entities | ❌ City-level search only | ❌ Article search only | ✅ **Resolves Indian PIN codes (e.g. `282001`, `600001`) to nearby sights, stays, and emergency services** |
| **Travel Budget Estimation (2026)** | ⚠️ Vague global ranges without itemization | ❌ Shows only room tariffs; ignores transit & passes | ❌ No pricing tools | ✅ **Itemized regional estimates (Rail/Air transit, rooms with GST, meals, ASI passes, local cabs)** |
| **Stays Marketplace Workflow** | ❌ Text-only; cannot calculate taxes or bookings | ✅ Extensive live room inventory | ❌ No stay integration | ✅ **Curated heritage inventory with room selection, GST calculations, and booking simulation** |
| **Intangible Heritage & Cultural Etiquette** | ⚠️ Generic summaries | ❌ Not included | ✅ Authoritative text | ✅ **Integrated dress codes, temple protocols, seasonal festival calendars, and GI craft guides** |
| **Multilingual Indian Typography** | ⚠️ Raw machine translation | ⚠️ Limited Indian script rendering | ⚠️ Separate language sub-sites | ✅ **Bundled local webfonts (Devanagari, Bengali, Tamil, Telugu, English) with instant switcher** |

---

## 🎯 Practical Real-World Use Cases

### 1. In-Page Cultural Monument & Heritage Exploration
* A traveler exploring a heritage city like **Agra**, **Jaipur**, **Madurai**, or **Hampi** can view historical epoch overviews, architectural highlights, verified ASI entry fees, and nearby attractions directly on the home page without juggling multiple apps.

### 2. Location & Spatial Radius Discovery
* Users can enter a city, monument, or 6-digit Indian PIN code (e.g. `282001` Agra, `302001` Jaipur, `600001` Chennai, `403001` Goa, `752111` Konark) to view surrounding attractions, restaurants, verified hotels, and public safety services with exact distances in kilometers.

### 3. Transparent Regional Budget Estimation
* Travelers can configure their starting city (e.g. New Delhi, Mumbai, Bengaluru), duration, party size, comfort level (*Budget Friendly, Standard Comfort, Royal Luxury*), and transit mode (*High-Speed Train, Flight, Road Cab*) to receive an itemized cost estimate benchmarked against 2026 regional tariff averages.

### 4. Cohesive Stay & Itinerary Integration
* Travelers can search curated heritage palaces, boutique stays, and backpacker hostels, review room options with transparent 12%/18% GST breakdowns, and connect their stay directly into a structured daily itinerary with morning, afternoon, and twilight activity schedules.

### 5. Essential Public Safety & Traveler Intelligence
* Access verified 24/7 emergency hospital addresses, trauma desks, high-altitude medical centers (e.g. SNM Hospital Leh), tourist police assistance cells, and cultural dress codes for active sanctums.

---

## 🏛️ Core Product Modules

```text
BHARATVEDA
├── 1. Universal Search & Geocoding (Places, Cities, Districts, States, 6-digit PIN codes)
├── 2. Front-Page Destination Hub (In-page details, history, highlights, and travel essentials)
├── 3. Spatial Leaflet Map Explorer (Color-coded pins for Heritage, Food, Stays, Transit, Services)
├── 4. Stays Marketplace (Filters by price, star rating, property type, review score, breakfast, cancellation)
├── 5. Day-by-Day Smart Itinerary Planner (Chronological schedules, pro-tips, sunset points, etiquette)
├── 6. Dynamic Travel Cost Calculator (Itemized breakdown in INR for 1-10 travelers)
├── 7. Pan-India States & Cultural Atlas (28 States & 8 UTs with dances, crafts, languages, monuments)
├── 8. Living Traditions & Regional Gastronomy (Spice matrixes, signature dishes, verified festival and dance imagery)
├── 9. Heritage Circuits (Ordered route stops, highlights, seasons, and circuit inquiry actions)
├── 10. Saved Places & Bookmarking System (Local storage sync with JSON export)
└── 11. VedaGuide AI Travel Assistant (Domain-grounded, multilingual conversational travel assistant)
```

---

## 🛠️ Technology Stack & Architecture

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript + Vite | High-performance single-page application |
| **Styling & Design System** | Tailwind CSS + Custom CSS Variables | Calm palette: Warm Ivory (`#F7F5EF`), Forest Green (`#1F6B4F`), Accent Orange (`#E98B4A`) |
| **Mapping Engine** | Leaflet + OpenStreetMap | Spatial pins, bounding box camera navigation, and Google Maps direction links |
| **Typography & Fonts** | Google Fonts + `@fontsource` Packages | Bundled webfonts: Sora, Inter, Noto Sans Devanagari, Bengali, Tamil, Telugu |
| **Icons** | Lucide React | Clean, accessible SVG stroke-based icons (`aria-hidden="true"`) |
| **Backend Server** | Node.js + Fastify + TypeScript | High-throughput REST API and static production serving |
| **Data Validation** | Zod | Runtime schema validation across all queries and API payloads |
| **AI Reliability** | Fastify throttling + request timeout | Per-IP chat limits and bounded upstream LLM requests |
| **Testing** | Vitest | Unit test coverage for geocoding, pricing, and schemas |

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/search/suggest?q=...` | Instant typeahead suggestions across places, PINs, cities, and states |
| `GET` | `/api/search/resolve?q=...&radius=35` | Spatial geocoding and proximity resolution using Haversine distance |
| `GET` | `/api/destinations` | Filter destinations by search query, region, category, and UNESCO status |
| `GET` | `/api/destinations/:id` | Full destination details, historical context, and nearby ecosystem |
| `GET` | `/api/hotels` | Stays marketplace search with price, rating, cancellation, and facility filters |
| `GET` | `/api/hotels/:id` | Single hotel details with all available room tiers |
| `POST` | `/api/hotels/booking` | Create validated room reservation with GST and taxes calculation |
| `POST` | `/api/itinerary/generate` | Generate day-by-day chronological itinerary |
| `POST` | `/api/cost/calculate` | Calculate itemized trip cost estimate in INR |
| `POST` | `/api/chat` | AI Travel Assistant conversation endpoint; accepts `language` (`en`, `hi`, `bn`, `ta`, or `te`) and `messages` |
| `GET` | `/api/states` | 28 States and 8 Union Territories cultural catalog |
| `GET` | `/api/cuisines` | Regional culinary matrix and signature dishes with verified imagery |
| `GET` | `/api/festivals` | Sacred festivals calendar and cultural significance |
| `GET` | `/api/trails` | Curated multi-destination thematic tourism circuits |
| `POST` | `/api/inquiry` | Register customized travel consultation request |
| `GET` | `/api/health` | Health check endpoint |

---

## 🚀 Local Setup & Installation

### Prerequisites
* **Node.js** v20.x or higher
* **npm** v10.x or higher

### 1. Installation
```powershell
# Clone the repository
git clone https://github.com/niloydebbarma-code/bharatveda.git
cd bharatveda

# Install all dependencies
npm install
```

### 2. Environment Configuration
```powershell
# Copy example environment configuration
Copy-Item .env.example .env
```

Optional AI provider keys can be added to `.env`:

```dotenv
OPENAI_API_KEY=your_openai_key
# or
GROQ_API_KEY=your_groq_key
```

When Groq is configured, the server uses the models in `GROQ_MODELS` in order.
If a model is unavailable, rate-limited, or returns a server error, the next
configured model is tried. Keep two or three models enabled in the Groq
organization and set them as a comma-separated list, for example:

```dotenv
GROQ_MODELS=openai/gpt-oss-120b,openai/gpt-oss-20b
```

When neither key is configured, `/api/chat` uses the built-in travel knowledge
engine. Upstream AI requests are limited to 15 seconds and the API returns a
controlled fallback response if the provider is unavailable. Restart the
backend after changing `.env`; do not commit `.env` or print provider keys in
logs.

### 3. Development Mode
```powershell
# Runs both Fastify backend (port 3001) and Vite frontend (port 5173) concurrently
npm run dev
```

### 4. Running the Test Suite
```powershell
# Execute unit and integration tests via Vitest
npm run test

# Run the focused hotel and AI chat tests
npm test -- src/__tests__/hotelsAndChat.test.ts
```

### 5. Production Build & Execution
```powershell
# Run TypeScript validation and compile both frontend and backend
npm run typecheck
npm run build

# Detect unused locals and parameters in frontend and backend TypeScript
npm run check:dead-code

# Start production server (serves API and static bundle on single port)
npm start
```

### Responsive and multilingual UI notes

The language selector supports English, Hindi, Bengali, Tamil, and Telugu.
The application bundles matching Noto Sans fonts and applies language-aware
wrapping so longer translated navigation labels, headings, and assistant
messages remain inside the viewport on mobile devices.

The VedaGuide assistant sends the selected language with every chat request,
keeps the message history bounded before calling an external provider, and
uses a scrollable, viewport-constrained chat panel. The backend allows up to
12 chat requests per client IP in a rolling 60-second window. Requests over
that limit receive HTTP `429` and a `Retry-After` header.

### Heritage circuit ordering and imagery

Each circuit in `server/data/trails.ts` defines `routeStops` in canonical
travel order: the first array item is the departure point and the last item is
the final stop. The `/api/trails` response preserves that array order, and the
web UI renders it as a numbered route with directional arrows. Route highlights
and the circuit description are kept alongside the same trail record so the
website and API present one consistent circuit definition.

Classical dance and festival cards use subject-specific image URLs rather than
reusing destination photos. The classical dance images are sourced from
Wikimedia Commons and should be replaced only with another image depicting the
same dance tradition.

---

## ⚖️ Transparency & Limitations Disclaimer

* **Tariff & Cost Estimates:** All accommodation, dining, and transit figures are calculated using 2026 regional benchmark averages. They are intended as planning estimates and may vary based on seasonal peak demand and booking lead times.
* **Booking Simulation:** The accommodation reservation flow generates structured vouchers (`BV-STAY-XXXXXX`) for demonstration and trip planning; real-world commercial bookings should be finalized through licensed property operators.
* **AI Knowledge Assistant:** The assistant operates on grounded domain datasets with optional LLM connectivity when environment API keys (`OPENAI_API_KEY` or `GROQ_API_KEY`) are supplied.

---

## 🛡️ License
Distributed under the [MIT License](./LICENSE). Cultural datasets and heritage documentation are curated for educational and respectful exploration of Indian heritage.
