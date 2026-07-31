import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-route-finder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  templateUrl: './route-finder.html',
  styleUrls: ['./route-finder.scss']
})
export class RouteFinder implements OnInit {
  airports: any[] = [];
  filteredFromAirports: any[] = [];
  filteredToAirports: any[] = [];

  fromAirportInput: string = '';
  toAirportInput: string = '';
  fromAirportCode: string = '';
  toAirportCode: string = '';
  fromAirportName: string = '';
  toAirportName: string = '';

  results: any[] = [];
  filteredResults: any[] = [];
  searched: boolean = false;
  loading: boolean = false;

  // Sort options
  sortOption: string = 'price-asc';
  sortOptions = [
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'duration-asc', label: 'Duration (Shortest)' },
    { value: 'duration-desc', label: 'Duration (Longest)' },
    { value: 'stops-asc', label: 'Stops (Least)' },
    { value: 'stops-desc', label: 'Stops (Most)' },
    { value: 'airline-asc', label: 'Airline (A-Z)' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.loading = true;
    this.apiService.getAirports().subscribe({
      next: (data) => {
        this.airports = data.items
          .filter((a: any) => a.iata_code && a.iata_code.length === 3)
          .sort((a: any, b: any) => a.name.localeCompare(b.name));

        this.filteredFromAirports = this.airports.slice(0, 50);
        this.filteredToAirports = this.airports.slice(0, 50);
        this.loading = false;
        console.log('Airports loaded:', this.airports.length);
      },
      error: (error) => {
        console.error('Error loading airports:', error);
        this.loading = false;
      }
    });
  }

  onFromInput(value: string): void {
    if (!this.airports || this.airports.length === 0) return;
    this.filteredFromAirports = this.filterAirports(value);

    const match = this.airports.find(a =>
      a.name.toLowerCase() === value.toLowerCase() ||
      a.iata_code === value.toUpperCase()
    );

    if (match) {
      this.fromAirportCode = match.iata_code;
      this.fromAirportName = match.name;
      this.fromAirportInput = `${match.name} (${match.iata_code})`;
    } else {
      this.fromAirportCode = '';
      this.fromAirportName = '';
    }
  }

  onToInput(value: string): void {
    if (!this.airports || this.airports.length === 0) return;
    this.filteredToAirports = this.filterAirports(value);

    const match = this.airports.find(a =>
      a.name.toLowerCase() === value.toLowerCase() ||
      a.iata_code === value.toUpperCase()
    );

    if (match) {
      this.toAirportCode = match.iata_code;
      this.toAirportName = match.name;
      this.toAirportInput = `${match.name} (${match.iata_code})`;
    } else {
      this.toAirportCode = '';
      this.toAirportName = '';
    }
  }

  onFromOptionSelected(option: any): void {
    if (option && option.iata_code) {
      this.fromAirportCode = option.iata_code;
      this.fromAirportName = option.name;
      this.fromAirportInput = `${option.name} (${option.iata_code})`;
      this.filteredFromAirports = this.airports.slice(0, 50);
    }
  }

  onToOptionSelected(option: any): void {
    if (option && option.iata_code) {
      this.toAirportCode = option.iata_code;
      this.toAirportName = option.name;
      this.toAirportInput = `${option.name} (${option.iata_code})`;
      this.filteredToAirports = this.airports.slice(0, 50);
    }
  }

  filterAirports(query: string): any[] {
    if (!this.airports || this.airports.length === 0) return [];
    if (!query || query.length === 0) {
      return this.airports.slice(0, 50);
    }
    const search = query.toLowerCase().trim();
    return this.airports
      .filter(a =>
        a.name.toLowerCase().includes(search) ||
        a.iata_code.toLowerCase().includes(search) ||
        (a.icao_code && a.icao_code.toLowerCase().includes(search))
      )
      .slice(0, 50);
  }

  displayAirport(option: any): string {
    if (!option) return '';
    if (typeof option === 'string') {
      if (!this.airports || this.airports.length === 0) return option;
      const airport = this.airports.find(a => a.iata_code === option);
      return airport ? `${airport.name} (${airport.iata_code})` : option;
    }
    if (option.name && option.iata_code) {
      return `${option.name} (${option.iata_code})`;
    }
    return '';
  }

  findRoutes() {
    this.searched = true;
    this.loading = true;

    if (this.fromAirportCode && this.toAirportCode) {
      const from = this.fromAirportCode;
      const to = this.toAirportCode;

      if (from === to) {
        this.results = [];
        this.filteredResults = [];
        this.loading = false;
        return;
      }

      this.fromAirportName = this.airports.find(a => a.iata_code === from)?.name || from;
      this.toAirportName = this.airports.find(a => a.iata_code === to)?.name || to;

      this.apiService.findRoutes(from, to).subscribe({
        next: (data) => {
          const filteredData = (data || []).filter((route: any) =>
            route.source_airport !== route.destination_airport
          );

          if (filteredData && filteredData.length > 0 && filteredData[0].source_name) {
            this.results = filteredData.map((route: any) => ({
              airline: route.airline || 'Unknown',
              stops: route.stops || 0,
              flightNumber: route.airline ? this.generateFlightNumber(route.airline) : 'N/A',
              duration: this.generateDuration(route.stops || 0),
              price: this.generatePrice(route.stops || 0)
            }));
            console.log('Real routes found:', this.results.length);
          } else {
            this.generateMockRoutes();
          }
          // Apply sorting
          this.applySort();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error finding routes:', error);
          this.generateMockRoutes();
          this.applySort();
          this.loading = false;
        }
      });
    } else {
      this.results = [];
      this.filteredResults = [];
      this.loading = false;
    }
  }

  applySort() {
    const sorted = [...this.results];
    switch (this.sortOption) {
      case 'price-asc':
        sorted.sort((a, b) => this.parsePrice(a.price) - this.parsePrice(b.price));
        break;
      case 'price-desc':
        sorted.sort((a, b) => this.parsePrice(b.price) - this.parsePrice(a.price));
        break;
      case 'duration-asc':
        sorted.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration));
        break;
      case 'duration-desc':
        sorted.sort((a, b) => this.parseDuration(b.duration) - this.parseDuration(a.duration));
        break;
      case 'stops-asc':
        sorted.sort((a, b) => a.stops - b.stops);
        break;
      case 'stops-desc':
        sorted.sort((a, b) => b.stops - a.stops);
        break;
      case 'airline-asc':
        sorted.sort((a, b) => a.airline.localeCompare(b.airline));
        break;
      default:
        break;
    }
    this.filteredResults = sorted;
  }

  parsePrice(price: string): number {
    if (!price) return 999999;
    return parseInt(price.replace('$', '').replace(',', ''));
  }

  parseDuration(duration: string): number {
    if (!duration) return 999999;
    const parts = duration.split('h ');
    const hours = parseInt(parts[0]) || 0;
    const minutes = parseInt(parts[1]?.replace('m', '')) || 0;
    return hours * 60 + minutes;
  }

  generateMockRoutes() {
    const count = Math.floor(Math.random() * 6) + 3;
    this.results = [];
    for (let i = 0; i < count; i++) {
      const stops = Math.random() > 0.5 ? (Math.floor(Math.random() * 2) + 1) : 0;
      const airline = this.getRandomAirline();
      this.results.push({
        airline: airline,
        stops: stops,
        duration: this.generateDuration(stops),
        price: this.generatePrice(stops),
        flightNumber: this.generateFlightNumber(airline)
      });
    }
  }

  getRandomAirline(): string {
    const airlines = [
      'American Airlines', 'Delta Air Lines', 'United Airlines',
      'British Airways', 'Lufthansa', 'Air France', 'Emirates',
      'Singapore Airlines', 'Qantas', 'Cathay Pacific',
      'Japan Airlines', 'Korean Air', 'Turkish Airlines',
      'Air Canada', 'KLM', 'Etihad Airways', 'Qatar Airways',
      'Thai Airways', 'Air New Zealand', 'LATAM Airlines'
    ];
    return airlines[Math.floor(Math.random() * airlines.length)];
  }

  generateDuration(stops: number): string {
    const baseHours = Math.floor(Math.random() * 6) + 4;
    const stopHours = stops * 2;
    const totalHours = baseHours + stopHours + Math.floor(Math.random() * 2);
    const minutes = Math.floor(Math.random() * 60);
    return `${totalHours}h ${minutes.toString().padStart(2, '0')}m`;
  }

  generatePrice(stops: number): string {
    const basePrice = Math.floor(Math.random() * 400) + 400;
    const stopCost = stops * 100;
    const total = basePrice + stopCost + Math.floor(Math.random() * 150);
    return `$${total.toLocaleString()}`;
  }

  generateFlightNumber(airline: string): string {
    const codeMap: { [key: string]: string } = {
      'American Airlines': 'AA', 'Delta Air Lines': 'DL', 'United Airlines': 'UA',
      'British Airways': 'BA', 'Lufthansa': 'LH', 'Air France': 'AF',
      'Emirates': 'EK', 'Singapore Airlines': 'SQ', 'Qantas': 'QF',
      'Cathay Pacific': 'CX', 'Japan Airlines': 'JL', 'Korean Air': 'KE',
      'Turkish Airlines': 'TK', 'Air Canada': 'AC', 'KLM': 'KL',
      'Etihad Airways': 'EY', 'Qatar Airways': 'QR', 'Thai Airways': 'TG',
      'Air New Zealand': 'NZ', 'LATAM Airlines': 'LA'
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

  swapAirports(): void {
    const tempCode = this.fromAirportCode;
    const tempInput = this.fromAirportInput;
    const tempName = this.fromAirportName;

    this.fromAirportCode = this.toAirportCode;
    this.fromAirportInput = this.toAirportInput;
    this.fromAirportName = this.toAirportName;

    this.toAirportCode = tempCode;
    this.toAirportInput = tempInput;
    this.toAirportName = tempName;
  }

  onSortChange() {
    this.applySort();
  }
}
