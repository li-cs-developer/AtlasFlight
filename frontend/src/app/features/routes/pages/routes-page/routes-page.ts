import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './routes-page.html',
  styleUrls: ['./routes-page.scss']
})
export class RoutesPage implements OnInit {
  routes: any[] = [];

  ngOnInit() {
    this.routes = [
      // === NORTH AMERICA (10 routes) ===
      { from: 'ATL', to: 'LAX', airline: 'Delta Air Lines', stops: 0, distance: '1,945 mi' },
      { from: 'LAX', to: 'ORD', airline: 'American Airlines', stops: 0, distance: '1,744 mi' },
      { from: 'JFK', to: 'SFO', airline: 'United Airlines', stops: 0, distance: '2,586 mi' },
      { from: 'DFW', to: 'MIA', airline: 'American Airlines', stops: 0, distance: '1,118 mi' },
      { from: 'ATL', to: 'JFK', airline: 'Delta Air Lines', stops: 0, distance: '762 mi' },
      { from: 'ORD', to: 'LAX', airline: 'United Airlines', stops: 0, distance: '1,744 mi' },
      { from: 'YYZ', to: 'YVR', airline: 'Air Canada', stops: 0, distance: '2,088 mi' },
      { from: 'ATL', to: 'MEX', airline: 'Delta Air Lines', stops: 0, distance: '1,312 mi' },
      { from: 'LAX', to: 'JFK', airline: 'JetBlue', stops: 0, distance: '2,475 mi' },
      { from: 'SFO', to: 'ORD', airline: 'United Airlines', stops: 0, distance: '1,846 mi' },

      // === TRANSATLANTIC (8 routes) ===
      { from: 'JFK', to: 'LHR', airline: 'British Airways', stops: 0, distance: '3,451 mi' },
      { from: 'ATL', to: 'LHR', airline: 'Delta Air Lines', stops: 0, distance: '4,214 mi' },
      { from: 'ORD', to: 'FRA', airline: 'Lufthansa', stops: 0, distance: '4,356 mi' },
      { from: 'LAX', to: 'CDG', airline: 'Air France', stops: 0, distance: '5,669 mi' },
      { from: 'JFK', to: 'CDG', airline: 'Air France', stops: 0, distance: '3,628 mi' },
      { from: 'SFO', to: 'LHR', airline: 'British Airways', stops: 0, distance: '5,356 mi' },
      { from: 'ORD', to: 'LHR', airline: 'United Airlines', stops: 0, distance: '3,950 mi' },
      { from: 'BOS', to: 'LHR', airline: 'British Airways', stops: 0, distance: '3,267 mi' },

      // === EUROPEAN (7 routes) ===
      { from: 'LHR', to: 'CDG', airline: 'British Airways', stops: 0, distance: '217 mi' },
      { from: 'LHR', to: 'FRA', airline: 'Lufthansa', stops: 0, distance: '409 mi' },
      { from: 'AMS', to: 'LHR', airline: 'KLM', stops: 0, distance: '230 mi' },
      { from: 'MAD', to: 'LHR', airline: 'British Airways', stops: 0, distance: '779 mi' },
      { from: 'FCO', to: 'MAD', airline: 'LATAM', stops: 0, distance: '843 mi' },
      { from: 'FRA', to: 'CDG', airline: 'Lufthansa', stops: 0, distance: '280 mi' },
      { from: 'AMS', to: 'FRA', airline: 'KLM', stops: 0, distance: '229 mi' },

      // === MIDDLE EAST (5 routes) ===
      { from: 'LHR', to: 'DXB', airline: 'Emirates', stops: 0, distance: '3,421 mi' },
      { from: 'DXB', to: 'DOH', airline: 'Emirates', stops: 0, distance: '235 mi' },
      { from: 'DXB', to: 'IST', airline: 'Emirates', stops: 0, distance: '1,893 mi' },
      { from: 'DOH', to: 'LHR', airline: 'Qatar Airways', stops: 0, distance: '3,425 mi' },
      { from: 'IST', to: 'JFK', airline: 'Turkish Airlines', stops: 0, distance: '4,971 mi' },

      // === ASIA (10 routes) ===
      { from: 'DXB', to: 'SIN', airline: 'Emirates', stops: 0, distance: '3,644 mi' },
      { from: 'SIN', to: 'SYD', airline: 'Singapore Airlines', stops: 0, distance: '3,908 mi' },
      { from: 'HND', to: 'SYD', airline: 'Qantas', stops: 0, distance: '4,856 mi' },
      { from: 'PEK', to: 'LAX', airline: 'Air China', stops: 0, distance: '6,238 mi' },
      { from: 'HKG', to: 'LHR', airline: 'Cathay Pacific', stops: 0, distance: '5,996 mi' },
      { from: 'ICN', to: 'JFK', airline: 'Korean Air', stops: 0, distance: '6,900 mi' },
      { from: 'BKK', to: 'LHR', airline: 'Thai Airways', stops: 0, distance: '5,948 mi' },
      { from: 'SIN', to: 'LHR', airline: 'Singapore Airlines', stops: 0, distance: '6,751 mi' },
      { from: 'HND', to: 'LAX', airline: 'Japan Airlines', stops: 0, distance: '5,489 mi' },
      { from: 'ICN', to: 'SFO', airline: 'Korean Air', stops: 0, distance: '5,634 mi' },

      // === OCEANIA (3 routes) ===
      { from: 'SYD', to: 'LAX', airline: 'Qantas', stops: 0, distance: '7,487 mi' },
      { from: 'MEL', to: 'SIN', airline: 'Singapore Airlines', stops: 0, distance: '3,748 mi' },
      { from: 'AKL', to: 'LAX', airline: 'Air New Zealand', stops: 0, distance: '6,525 mi' },

      // === SOUTH AMERICA (2 routes) ===
      { from: 'GRU', to: 'MIA', airline: 'LATAM', stops: 0, distance: '4,008 mi' },
      { from: 'EZE', to: 'MAD', airline: 'LATAM', stops: 0, distance: '6,252 mi' }
    ];
  }
}
