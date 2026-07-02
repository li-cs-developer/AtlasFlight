import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-route-finder',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './route-finder.html',
  styleUrls: ['./route-finder.scss']
})
export class RouteFinder {
  airports = [
    // North America
    { code: 'ATL', name: 'Atlanta' },
    { code: 'LAX', name: 'Los Angeles' },
    { code: 'ORD', name: 'Chicago' },
    { code: 'DFW', name: 'Dallas' },
    { code: 'DEN', name: 'Denver' },
    { code: 'JFK', name: 'New York' },
    { code: 'SFO', name: 'San Francisco' },
    { code: 'YYZ', name: 'Toronto' },
    { code: 'YVR', name: 'Vancouver' },
    { code: 'MEX', name: 'Mexico City' },
    // Europe
    { code: 'LHR', name: 'London' },
    { code: 'CDG', name: 'Paris' },
    { code: 'FRA', name: 'Frankfurt' },
    { code: 'AMS', name: 'Amsterdam' },
    { code: 'FCO', name: 'Rome' },
    { code: 'MAD', name: 'Madrid' },
    { code: 'MUC', name: 'Munich' },
    { code: 'ZRH', name: 'Zurich' },
    { code: 'DUB', name: 'Dublin' },
    // Asia
    { code: 'HND', name: 'Tokyo' },
    { code: 'PEK', name: 'Beijing' },
    { code: 'PVG', name: 'Shanghai' },
    { code: 'HKG', name: 'Hong Kong' },
    { code: 'ICN', name: 'Seoul' },
    { code: 'BKK', name: 'Bangkok' },
    { code: 'BOM', name: 'Mumbai' },
    { code: 'DXB', name: 'Dubai' },
    { code: 'SIN', name: 'Singapore' },
    { code: 'DOH', name: 'Doha' },
    { code: 'KUL', name: 'Kuala Lumpur' },
    // Middle East & Africa
    { code: 'IST', name: 'Istanbul' },
    { code: 'CAI', name: 'Cairo' },
    { code: 'JNB', name: 'Johannesburg' },
    // Oceania
    { code: 'SYD', name: 'Sydney' },
    { code: 'MEL', name: 'Melbourne' },
    // South America
    { code: 'GRU', name: 'Sao Paulo' }
  ];

  // Expanded airline list for variety
  airlines = [
    'American Airlines',
    'Delta Air Lines',
    'United Airlines',
    'British Airways',
    'Lufthansa',
    'Air France',
    'Emirates',
    'Singapore Airlines',
    'Qantas',
    'Cathay Pacific',
    'Japan Airlines',
    'Korean Air',
    'Turkish Airlines',
    'Air Canada',
    'KLM',
    'Etihad Airways',
    'Qatar Airways',
    'Thai Airways',
    'Air New Zealand',
    'LATAM Airlines',
    'China Southern',
    'China Eastern',
    'Air China',
    'Southwest Airlines'
  ];

  fromAirport: string = '';
  toAirport: string = '';
  results: any[] = [];
  searched: boolean = false;

  findRoutes() {
    this.searched = true;
    if (this.fromAirport && this.toAirport) {
      // Generate 10-15 random routes
      const count = Math.floor(Math.random() * 6) + 10; // 10-15 results
      this.results = [];

      for (let i = 0; i < count; i++) {
        const stops = Math.random() > 0.6 ? (Math.floor(Math.random() * 2) + 1) : 0; // 40% chance of stops
        const airline = this.airlines[Math.floor(Math.random() * this.airlines.length)];
        const duration = this.generateDuration(stops);
        const price = this.generatePrice(stops);

        this.results.push({
          airline: airline,
          stops: stops,
          duration: duration,
          price: price,
          flightNumber: this.generateFlightNumber(airline)
        });
      }

      // Sort by price (cheapest first)
      this.results.sort((a, b) => {
        const priceA = parseInt(a.price.replace('$', '').replace(',', ''));
        const priceB = parseInt(b.price.replace('$', '').replace(',', ''));
        return priceA - priceB;
      });

    } else {
      this.results = [];
    }
  }

  generateDuration(stops: number): string {
    const baseHours = Math.floor(Math.random() * 6) + 6; // 6-12 hours base
    const stopHours = stops * 2; // 2 hours per stop
    const totalHours = baseHours + stopHours + Math.floor(Math.random() * 3);
    const hours = totalHours;
    const minutes = Math.floor(Math.random() * 60);
    return `${hours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  generatePrice(stops: number): string {
    const basePrice = Math.floor(Math.random() * 400) + 500; // $500-$900
    const stopCost = stops * 120; // $120 per stop
    const total = basePrice + stopCost + Math.floor(Math.random() * 200);
    return `$${total.toLocaleString()}`;
  }

  generateFlightNumber(airline: string): string {
    const codeMap: { [key: string]: string } = {
      'American Airlines': 'AA',
      'Delta Air Lines': 'DL',
      'United Airlines': 'UA',
      'British Airways': 'BA',
      'Lufthansa': 'LH',
      'Air France': 'AF',
      'Emirates': 'EK',
      'Singapore Airlines': 'SQ',
      'Qantas': 'QF',
      'Cathay Pacific': 'CX',
      'Japan Airlines': 'JL',
      'Korean Air': 'KE',
      'Turkish Airlines': 'TK',
      'Air Canada': 'AC',
      'KLM': 'KL',
      'Etihad Airways': 'EY',
      'Qatar Airways': 'QR',
      'Thai Airways': 'TG',
      'Air New Zealand': 'NZ',
      'LATAM Airlines': 'LA',
      'China Southern': 'CZ',
      'China Eastern': 'MU',
      'Air China': 'CA',
      'Southwest Airlines': 'WN'
    };

    const prefix = codeMap[airline] || 'XX';
    const number = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}${number}`;
  }

  getStopText(stops: number): string {
    if (stops === 0) return 'Direct ✈️';
    if (stops === 1) return '1 Stop';
    return `${stops} Stops`;
  }

  getStopClass(stops: number): string {
    if (stops === 0) return 'direct';
    if (stops === 1) return 'one-stop';
    return 'multi-stop';
  }
}
