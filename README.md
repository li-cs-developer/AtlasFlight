# ✈️ AtlasFlight

**A full-stack aviation analytics dashboard built with Angular 21, FastAPI, and SQL Server.**  
 Version 2.0 – Now with Full Backend & Database | [View v1.0.0 (Frontend UI & Dashboard Prototype](https://github.com/li-cs-developer/AtlasFlight/tree/v1.0.0)

🌐 **Live Demo:** [AtlasFlight on Azure](https://gray-plant-0a6a46c0f.7.azurestaticapps.net)

**AtlasFlight** started as a frontend-only prototype ([v1.0.0](https://github.com/li-cs-developer/AtlasFlight/tree/v1.0.0)) and has evolved into a complete full-stack application (v2.0). This repository contains the latest version with a Python FastAPI backend, SQL Server database, and a fully interactive Angular frontend.

## 🆕 What's New in v2.0

| Component | v1.0.0 (Prototype) | v2.0 (Full-Stack) |
| :--- | :--- | :--- |
| **Frontend** | ✅ Angular 21 with mock data | ✅ Angular 21 with real API integration |
| **Backend** | ❌ None | ✅ FastAPI with 9 REST endpoints |
| **Database** | ❌ Mock JSON data | ✅ SQL Server with 777,000+ records |
| **Data** | 36 airports, 30 airlines | 5,911 airports, 5,852 airlines, 64,360 routes |
| **Charts** | Static mock data | Real-time data from database |
| **Search** | Client-side only | Server-side filtering with country/name search |
| **Route Finder** | Mock results | Real route data from database |
| **Testing** | ❌ None | ✅ Jest (frontend) + pytest (backend) |
| **Deployment** | Vercel (Frontend only) |  Azure Cloud (Static Web Apps + App Service + SQL) |

---

## 🎯 Overview

AtlasFlight is a complete full-stack application that transforms historical aviation data into an interactive analytics dashboard. It demonstrates modern web development practices across the entire stack:

- **Frontend:** Angular 21 with standalone components, lazy loading, and virtual scrolling

- **Backend:** FastAPI with SQLAlchemy for high-performance API endpoints

- **Database:** SQL Server Express with 500,000+ records from OpenFlights data

- **Testing:** Jest (frontend) and pytest (backend) for production-ready quality

The platform provides insights into global aviation networks based on historical OpenFlights data (downloaded and cleaned in 2025), including airport statistics, airline fleet analytics, route optimization, and interactive flight search.

---

## ✨ Feature

### 📊 Analytics Dashboard

- Key metrics from historical aviation data (airports, airlines, routes, countries)
- Interactive bar charts showing top airlines by route count
- Aircraft type distribution visualization
- Route type breakdown (direct vs. connecting flights)
- One-click navigation to all feature pages

### ✈️ Airport Explorer

- Search 5,000+ airports by name, IATA, or ICAO code
- Country-based filtering
- Detailed airport metadata (location, timezone, altitude, coordinates)
- Virtual scrolling for smooth performance with large datasets

### 🏢 Airlines Directory

- Browse 5,800+ global airlines
- Search by airline name, IATA, or ICAO
- Country-based filtering
- Active/inactive status indicators

### 🗺️ Route Optimization

- 64,000+ flight routes
- Dual search: source and destination filtering
- Stop count indicators (Direct, 1 Stop, 2+ Stops)
- Smart sorting by stop count
- Virtual scrolling for smooth performance

### 🛩️ Fleet Analytics

- Aircraft type distribution
- Operator count per aircraft type
- Progressive loading for large datasets

### 🔍 Route Finder

- Interactive flight search between any two airports
- Searchable dropdown with autocomplete
- Real-time route results with airline, duration, and pricing
- Sort by price, duration, stops, or airline (ascending/descending)
- Swap function for easy origin/destination reversal

---

## 🛠️ Technology Stack

### Frontend

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Angular** | 21 | Core framework (standalone components) |
| **TypeScript** | 5.x | Type safety |
| **SCSS** | - | Styling with CSS Custom Properties |
| **Angular Material** | 21 | UI components (autocomplete, icons) |
| **Angular CDK** | 21 | Virtual scrolling for large datasets |
| **RxJS** | 7.x | Reactive state management |
| **Jest** | 30.x | Unit testing framework |

### Backend

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **FastAPI** | 0.115.6 | High-performance API framework |
| **Python** | 3.12 | Core language |
| **SQLAlchemy** | 2.0.36 | Database toolkit |
| **PyODBC** | 5.2.0 | SQL Server driver |
| **Pydantic** | 2.10.4 | Data validation |
| **pytest** | 8.3.4 | Unit testing |
| **Alembic** | 1.14.1 | Database migrations |

### Database

| Technology | Version |
| :--- | :--- |
| **SQL Server Express** | 2025 (17.x) |
| **Data Source** | OpenFlights (historical data) |
| **Records** | 777,853+ |


---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Angular Frontend                         │
│                   (http://localhost:4200)                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐        │
│  │Dashboard│  │Airports │  │Airlines │  │ Routes   │        │
│  └─────────┘  └─────────┘  └─────────┘  └──────────┘        │
│  ┌─────────┐  ┌─────────┐                                   │
│  │  Fleet  │  │ Route   │                                   │
│  │         │  │ Finder  │                                   │
│  └─────────┘  └─────────┘                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │  HTTP / REST API
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    FastAPI Backend                          │
│                   (http://localhost:8000)                   │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌──────────┐        │
│  │ Airports│  │Airlines │  │ Routes  │  │  Fleet   │        │
│  │  API    │  │  API    │  │  API    │  │  API     │        │
│  └─────────┘  └─────────┘  └─────────┘  └──────────┘        │
│  ┌─────────┐  ┌─────────┐                                   │
│  │Dashboard│  │Route    │                                   │
│  │  API    │  │Finder   │                                   │
│  └─────────┘  └─────────┘                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │  SQLAlchemy
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    SQL Server Express                       │
│                   (localhost\SQLEXPRESS)                    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  240 Countries | 5,594 Cities | 5,911 Airports      │    │
│  │  5,852 Airlines | 64,360 Routes | 501,358 Routes    │    │
│  │  27,639 Aircraft | 166,679 Route-Aircraft Links     │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
AtlasFlight/
├── frontend/                          # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/                  # Core services
│   │   │   │   └── services/
│   │   │   │       └── api.service.ts
│   │   │   ├── dashboard/             # Dashboard component
│   │   │   ├── features/
│   │   │   │   ├── airports/          # Airport explorer
│   │   │   │   ├── airlines/          # Airlines directory
│   │   │   │   ├── routes/            # Routes table
│   │   │   │   ├── fleet/             # Fleet analytics
│   │   │   │   └── route-finder/      # Route search
│   │   │   ├── shared/
│   │   │   │   └── components/
│   │   │   │       ├── header/        # Navigation
│   │   │   │       └── footer/        # Footer
│   │   │   ├── app.config.ts
│   │   │   ├── app.routes.ts
│   │   │   └── app.ts
│   │   ├── assets/
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   ├── angular.json
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                            # FastAPI application
│   ├── app/
│   │   ├── api/                        # API endpoints
│   │   │   ├── airports.py
│   │   │   ├── airlines.py
│   │   │   ├── routes.py
│   │   │   ├── fleet.py
│   │   │   └── dashboard.py
│   │   ├── core/                       # Core configuration
│   │   │   ├── config.py
│   │   │   └── database.py
│   │   ├── models/                     # SQLAlchemy models
│   │   │   ├── airport.py
│   │   │   ├── airline.py
│   │   │   ├── route.py
│   │   │   └── ...
│   │   ├── schemas/                    # Pydantic schemas
│   │   │   └── airport.py
│   │   └── scripts/                    # Database scripts
│   │       ├── create_database.py
│   │       ├── create_tables.py
│   │       ├── import_data.py
│   │       └── drop_tables.py
│   ├── alembic/                        # Database migrations
│   ├── tests/                          # Backend tests
│   ├── main.py                         # Entry point
│   ├── requirements.txt
│   └── .env
│
├── database/                           # SQLite source data
│   └── airline.db                      # 51.6MB OpenFlights data
│
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start

### Prerequisites

| Tool | Version | Installation |
| :--- | :--- | :--- |
| **Node.js** | v20+ | [Download](https://nodejs.org/) |
| **npm** | v10+ | Included with Node.js |
| **Angular CLI** | v21 | `npm install -g @angular/cli` |
| **Python** | 3.12 | [Download](https://www.python.org/) |
| **SQL Server Express** | 2022+ | [Download](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) |
| **SQL Server Management Studio** | 	Latest | [Download](https://learn.microsoft.com/en-us/ssms/sql-server-management-studio-ssms) |

### Installation

```bash
# Clone the repository
git clone https://github.com/li-cs-developer/AtlasFlight.git
cd AtlasFlight
```

---

## 🗄️ Database Setup

### Step 1: Install SQL Server Express

1. Download SQL Server Express from Microsoft
2. Install with default settings
3. Note the instance name (default: `localhost\SQLEXPRESS`)
4. Install SQL Server Management Studio (SSMS)

### Step 2: Create Database

The database setup is automated via Python scripts in the `backend/scripts/` directory.

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Step 1: Create the database
python -m scripts.create_database
```

**What this does:** Connects to SQL Server and creates a database named `AtlasFlight` if it doesn't already exist.

### Step 3: Create Tables

```bash
# Step 2: Create tables with NVARCHAR for Unicode support
python -m scripts.create_tables
```

**What this does:** 

- Creates all tables: Country, City, Airport, Airline, AircraftType, Aircraft, Route, OperatedUsing, RouteAircraft
- Uses `NVARCHAR` for text columns to support Unicode characters (accents, Cyrillic, etc.)
- Sets up primary keys and foreign key relationships

### Step 4: Import Data

The source data is stored in `database/airline.db` 

```bash
# Step 3: Import data from SQLite to SQL Server
python -m scripts.import_data
```

**What this does:** 
- Connects to the SQLite database at database/airline.db
- Reads data from all tables in the correct order (respecting foreign key dependencies)
- Cleans airport names (removes [Duplicate] prefix)
- Handles Unicode characters properly
- Skips invalid rows (e.g., airlines with NULL ICAO codes)
- Inserts data into SQL Server

**Expected Output:**

```
✅ Connected to SQL Server
✅ Connected to SQLite: database/airline.db
✅ Country: imported 240 rows
✅ City: imported 5594 rows
✅ Airport: imported 5911 rows
✅ Airline: imported 5852 rows
✅ AircraftType: imported 219 rows
✅ Aircraft: imported 27639 rows
✅ Route: imported 64360 rows
✅ OperatedUsing: imported 501358 rows
✅ RouteAircraft: imported 166679 rows
✅ Import complete!
```

## Step 5: Verify Data

```bash
-- In SSMS or sqlcmd
SELECT COUNT(*) FROM Airport;   -- Should return 5911
SELECT COUNT(*) FROM Airline;   -- Should return 5852
SELECT COUNT(*) FROM Route;     -- Should return 64360
```

## Step 6: Reset Database (if needed)

```bash
# This will delete ALL data - use with caution!
python -m scripts.drop_tables
```

**What this does:** Drops all tables in the correct order (respecting foreign key dependencies) and asks for confirmation before proceeding.

---

## 🚀 Running the Application

### Backend

```bash
cd backend

# Activate virtual environment
.\venv\Scripts\activate

# Start the FastAPI server
python main.py
```

The backend will be available at: [http://localhost:8000](http://localhost:8000)

API Documentation:
* Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
* ReDoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### Frontend

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start the development server
ng serve --open
```

The frontend will be available at: [http://localhost:4200](http://localhost:4200)

### Full Stack Testing

With both servers running:

1. Open [http://localhost:4200](http://localhost:4200) in your browser
2. The dashboard should load with real data from the database
3. Navigate through all pages:
   * Airports: search and filter 5,911 airports
   * Airlines: browse 5,852 airlines
   * Routes: explore 64,360 routes with from/to search
   * Fleet: view aircraft distribution
   * Route Finder: search flights between airports

---

## ☁️ DevOps & Cloud Infrastructure
This project is deployed on Microsoft Azure using a modern cloud-native architecture with fully automated CI/CD pipelines.

### Azure Services Used

| Service | Purpose |
|---------|----------|
| **Azure Static Web Apps** | Hosts the Angular frontend with automatic CI/CD from GitHub |
| **Azure App Service** | Hosts the FastAPI backend with Python runtime |
| **Azure SQL** | Hosts the SQL Server database with high availability |
| **GitHub Actions** | CI/CD pipeline for automated builds and deployments |

### CI/CD Pipeline Architecture
The project uses dual GitHub Actions workflows for automated deployment:

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Repository                        │
│                   (Source Control)                          │
└─────────────────────┬───────────────────────────────────────┘
                      │  Push to main
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions                           │
│                   (CI/CD Pipeline)                          │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Workflow 1: Frontend (Azure Static Web Apps)       │    │
│  │  - Build Angular app                                │    │
│  │  - Deploy to Azure Static Web Apps                  │    │
│  │  - Preview deployments for PRs                      │    │
│  └─────────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Workflow 2: Backend (Azure App Service)            │    │
│  │  - Build Python environment                         │    │
│  │  - Deploy to Azure App Service                      │    │
│  │  - Run Gunicorn with Uvicorn workers                │    │
│  └─────────────────────────────────────────────────────┘    │
└───────────────────────────┬─────────────────────────────────┘
                            │
                ┌───────────┴───────────┐
                ▼                       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Azure Cloud                              │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │  Static Web Apps    │  │  App Service (Python)       │   │
│  │  (Angular Frontend) │<-│  (FastAPI Backend)          │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
│                                    │                        │
│                                    ▼                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Azure SQL Database (SQL Server)                    │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```












---
## 🧪 Testing

### Frontend Tests (Jest)

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Backend Tests (pytest)

```bash
cd backend

# Activate virtual environment
.\venv\Scripts\activate

# Run all tests
pytest

# Run tests with coverage
pytest --cov=app

# Run specific test file
pytest tests/test_airports.py
```

---

## 🏛️ Architecture Decisions

### Why FastAPI?

FastAPI was chosen for its modern, async-capable architecture and automatic OpenAPI documentation generation. Key considerations:
* **Performance:** One of the fastest Python frameworks, comparable to Node.js and Go
* **Developer Experience:** Automatic API docs, type hints, and Pydantic validation
* **Modern Python:** Leverages Python 3.12+ features and async/await patterns
* **Industry Adoption:** Gaining traction in enterprise and startup environments

### Why SQL Server Express?

SQL Server Express was selected due to:
* **Local Enterprise Standards:** Widely used in enterprise environments, particularly in organizations with Microsoft-centric infrastructure
* **Familiarity:** Many developers and employers are already familiar with SQL Server
* **Integration:** Seamless integration with existing Microsoft tools and workflows
* **Scalability:** Can scale from Express to Enterprise without code changes
* **Free Tier:** SQL Server Express is free for development and small-scale production use

### Why Raw SQL over ORM?

While SQLAlchemy ORM is available, this project uses raw SQL queries with `SQLAlchemy text()` for:
* **Fine Control:** Precise control over query optimization
* **Performance:** Raw SQL can be faster for complex joins and aggregations
* **Readability:** SQL is more readable and maintainable for complex queries
* **Portability:** Raw SQL is easier to debug and tune

### Why Angular?

Angular 21 was chosen for its enterprise-grade features:
* **Standalone Components:** Modern, modular architecture
* **Lazy Loading:** Route-level code splitting for performance
* **Virtual Scrolling:** Efficient rendering of large datasets (64,360 routes, 5,911 airports)
* **Angular Material:** Consistent, accessible UI components
* **TypeScript:** Full type safety across the application

---

## 🤖 AI-Assisted Development

This project was developed with assistance from modern AI tools.

### Tools Used

| Tool | Purpose |
| :--- | :--- |
| **GitHub Copilot** | Code completion, refactoring suggestions |
| **ChatGPT** | Architecture decisions, code generation |
| **Gemini** | Debugging assistance, documentation |

### AI Contributions

* **Code Generation:** Component scaffolding, API endpoints, database scripts
* **Debugging:** Error resolution and optimization (encoding issues, foreign key constraints)
* **Documentation:** README creation, code comments
* **Data Modeling:** Structuring aviation data effectively
* **UI/UX Suggestions:** Layout patterns and interaction design
* **Testing:** Test generation for both frontend and backend

### Development Workflow

The AI-assisted development process included:
1. **Rapid Prototyping:** AI helped generate initial component structures and API endpoints
2. **Problem Solving:** AI-assisted debugging of complex issues (UTF-8 encoding, duplicate data handling)
3. **Optimization:** Suggestions for performance improvements (virtual scrolling, query optimization)
4. **Best Practices:** AI provided guidance on Angular and FastAPI best practices

---

## 🌐 Environment & Cross-Platform Compliance

* **Responsive Framework:** Liquid UI grids handling Desktop (>1200px), Tablet (768-1200px), and Mobile (<768px)
* **Input Standard:** Multi-modality optimization supporting mouse, trackpad, and touch gestures
* **Target Environments:** Chrome, Firefox, Edge, and Safari (macOS/iOS)

---

## 🔒 Browser Support

| Browser | Version |
| :--- | :--- |
| **Chrome** | Latest |
| **Firefox** | Latest |
| **Edge** | Latest |
| **Safari** | Latest (macOS/iOS) |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
