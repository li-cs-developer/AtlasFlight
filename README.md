# ✈️ AtlasFlight

**A high-performance aviation analytics dashboard engineered with modern Angular (v21).**

**🔗 Live Demo:** [frontend-a4ffmld96-cyl.vercel.app](https://frontend-a4ffmld96-cyl.vercel.app)

---

## 🎯 Architectural Intent & Design Approach

AtlasFlight is a production-ready frontend architecture blueprint designed to showcase scalable, maintainable, and highly performant Angular development patterns. It serves as a practical demonstration of building enterprise-scale dashboards utilizing:

- **Modern Angular Ecosystem:** 100% Standalone component architecture utilizing cutting-edge framework features for a lightweight dependency tree.
- **Dependency-Free Visualizations:** Custom-built SVG and SCSS layout engines that deliver high-performance data tracking without third-party bundle bloat.
- **Performance-First Design:** Route-level lazy loading boundaries, modular code-splitting, and decoupled state management.
- **Design Tokens & Responsiveness:** Clean, mobile-first layouts styled with component-first SCSS and CSS Custom Properties for unified theme handling.

---

## ✨ Feature Breakdown

### 📊 Performance Analytics Dashboard
- High-level operational KPIs at a glance.
- Native, dependency-free SVG/SCSS data visualizations for optimized rendering performance.
- Direct operational deep-links for streamlined user workflows.

### ✈️ Airport Explorer
- Predictive search interface with reactive country-based filtration.
- Dynamic data presentation rendering deeply nested airport metadata.

### 🏢 Fleet & Airline Intelligence
- Comprehensive fleet metrics and operational active-status monitoring.
- Scalable data grid patterns optimized for real-time tracking.

### 🗺️ Route Optimization Engine
- Tabular flight path matrix featuring multi-stop and layover indicator logic.
- Complex data sorting algorithms handling relational distance and airline matrices.

### 🔍 Route Finder
- Interactive, reactive flight search utility generating real-time itineraries.
- Dynamic result transformations supporting multi-attribute sorting (e.g., price, duration).

---

## 🛠️ Engineered Tech Stack

| Engineering Layer | Technology Selection | Architectural Purpose |
|:---|:---|:---|
| **Core Framework** | Angular 21 | Standalone Component Architecture, Modern Reactivity |
| **Language** | TypeScript 5.x | Strict type safety and robust domain interfaces |
| **Styling Architecture** | Advanced SCSS | Maintainable design tokens using CSS Custom Properties |
| **Routing Strategy** | Angular Router | Code-splitting via Route-Level Lazy Loading |
| **State Management** | Localized Component State | Deterministic unidirectional data flow (Signals/RxJS) |
| **Data Visualization** | Raw SVG & Flexbox/Grid | Zero-dependency, lightweight, performant rendering |
| **CI/CD & Deployment** | Vercel Edge Networks | Automated production builds and instant global delivery |

---

## 📁 Project Structure
```
AtlasFlight/
    └── frontend/
        ├── src/
        │   ├── app/
        │   │   ├── dashboard/          # Main dashboard
        │   │   ├── features/           # Feature modules
        │   │   │   ├── airports/       # Airport explorer
        │   │   │   ├── airlines/       # Airlines listing
        │   │   │   ├── routes/         # Routes table
        │   │   │   ├── fleet/          # Fleet analytics
        │   │   │   └── route-finder/   # Route search
        │   │   ├── shared/             # Shared components
        │   │   │   └── components/
        │   │   │       └── header/     # Navigation header
        │   │   ├── app.config.ts
        │   │   ├── app.routes.ts
        │   │   └── app.ts
        │   ├── assets/                 # Static assets
        │   ├── index.html
        │   ├── main.ts
        │   └── styles.scss
        ├── angular.json
        ├── package.json
        └── tsconfig.json
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Installation |
| :--- | :--- | :--- |
| **Node.js** | v20+ | [Download](https://nodejs.org/) |
| **npm** | v10+ | Included with Node.js |
| **Angular CLI** | v21 | `npm install -g @angular/cli` |

### Installation & Running

```bash
# Clone the repository
git clone [github.com/li-cs-developer/AtlasFlight.git](https://github.com/li-cs-developer/AtlasFlight.git)
cd AtlasFlight/frontend

# Install dependencies
npm install

# Start development server
ng serve --open

# Build for production
ng build --configuration=production
```

---

## 📊 Mock Data Strategy

To maintain a fully decoupled, zero-configuration client prototype, AtlasFlight implements **client-side state hydration** using deterministic mock data models. The relational schemas for these datasets are directly modeled after authentic real-world aviation configurations:

- **Airports:** Complete tracking profiles incorporating precise geographical coordinates, target timezones, and valid IATA/ICAO codes.
- **Airlines:** Multi-variable metrics capturing operator fleet sizing, sovereign origin countries, and true/false operational status tracking.
- **Global Routes:** Dynamic linking tables connecting origins to destinations, evaluating path distances, and validating stopover logic.

---

## 📱 Environment & Cross-Platform Compliance

- **Responsive Framework:** Liquid UI grids handling Desktop (≥1200px, standard grid), Tablet (768–1200px, continuous scale), and Mobile (≤768px, vertical single-column layouts).
- **Input Standard:** Multi-modality optimization supporting precise mouse clicks, trackpad sweeps, and low-latency mobile touch gestures.
- **Target Environments:** Verified cross-compatibility across all modern rendering engines (Chromium-based engines, Gecko/Firefox, and WebKit/Safari for macOS/iOS systems).

---

## 🔓 Browser Support

| Browser | Version |
| :--- | :--- |
| Chrome | Latest |
| Firefox | Latest |
| Edge | Latest |
| Safari | Latest (macOS/iOS) |


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
