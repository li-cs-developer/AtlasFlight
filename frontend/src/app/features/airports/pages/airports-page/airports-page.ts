import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-airports-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './airports-page.html',
  styleUrls: ['./airports-page.scss']
})
export class AirportsPage implements OnInit {

  airports: any[] = [];
  filteredAirports: any[] = [];
  searchQuery: string = '';
  selectedCountry: string = '';
  countries: string[] = [];
  loading: boolean = false;

  ngOnInit() {
    this.loadAirports();
  }

  loadAirports() {
    this.loading = true;
    this.airports = [
      // === NORTH AMERICA (10) ===
      {
        airport_id: 1,
        name: 'Hartsfield-Jackson Atlanta International',
        iata_code: 'ATL',
        icao_code: 'KATL',
        latitude: 33.6407,
        longitude: -84.4277,
        altitude: 1026,
        time_zone: 'America/New_York',
        city: 'Atlanta',
        country: 'United States'
      },
      {
        airport_id: 2,
        name: 'Los Angeles International',
        iata_code: 'LAX',
        icao_code: 'KLAX',
        latitude: 33.9416,
        longitude: -118.4085,
        altitude: 126,
        time_zone: 'America/Los_Angeles',
        city: 'Los Angeles',
        country: 'United States'
      },
      {
        airport_id: 3,
        name: "Chicago O'Hare International",
        iata_code: 'ORD',
        icao_code: 'KORD',
        latitude: 41.9742,
        longitude: -87.9073,
        altitude: 668,
        time_zone: 'America/Chicago',
        city: 'Chicago',
        country: 'United States'
      },
      {
        airport_id: 9,
        name: 'Dallas/Fort Worth International',
        iata_code: 'DFW',
        icao_code: 'KDFW',
        latitude: 32.8998,
        longitude: -97.0403,
        altitude: 607,
        time_zone: 'America/Chicago',
        city: 'Dallas',
        country: 'United States'
      },
      {
        airport_id: 10,
        name: 'Denver International',
        iata_code: 'DEN',
        icao_code: 'KDEN',
        latitude: 39.8561,
        longitude: -104.6737,
        altitude: 5431,
        time_zone: 'America/Denver',
        city: 'Denver',
        country: 'United States'
      },
      {
        airport_id: 11,
        name: 'John F. Kennedy International',
        iata_code: 'JFK',
        icao_code: 'KJFK',
        latitude: 40.6413,
        longitude: -73.7781,
        altitude: 13,
        time_zone: 'America/New_York',
        city: 'New York',
        country: 'United States'
      },
      {
        airport_id: 12,
        name: 'San Francisco International',
        iata_code: 'SFO',
        icao_code: 'KSFO',
        latitude: 37.6213,
        longitude: -122.3790,
        altitude: 13,
        time_zone: 'America/Los_Angeles',
        city: 'San Francisco',
        country: 'United States'
      },
      {
        airport_id: 13,
        name: 'Toronto Pearson International',
        iata_code: 'YYZ',
        icao_code: 'CYYZ',
        latitude: 43.6777,
        longitude: -79.6248,
        altitude: 569,
        time_zone: 'America/Toronto',
        city: 'Toronto',
        country: 'Canada'
      },
      {
        airport_id: 14,
        name: 'Vancouver International',
        iata_code: 'YVR',
        icao_code: 'CYVR',
        latitude: 49.1947,
        longitude: -123.1792,
        altitude: 13,
        time_zone: 'America/Vancouver',
        city: 'Vancouver',
        country: 'Canada'
      },
      {
        airport_id: 15,
        name: 'Mexico City International',
        iata_code: 'MEX',
        icao_code: 'MMMX',
        latitude: 19.4363,
        longitude: -99.0721,
        altitude: 7316,
        time_zone: 'America/Mexico_City',
        city: 'Mexico City',
        country: 'Mexico'
      },
      // === EUROPE (9) ===
      {
        airport_id: 4,
        name: 'London Heathrow',
        iata_code: 'LHR',
        icao_code: 'EGLL',
        latitude: 51.4700,
        longitude: -0.4543,
        altitude: 83,
        time_zone: 'Europe/London',
        city: 'London',
        country: 'United Kingdom'
      },
      {
        airport_id: 16,
        name: 'Paris Charles de Gaulle',
        iata_code: 'CDG',
        icao_code: 'LFPG',
        latitude: 49.0097,
        longitude: 2.5479,
        altitude: 392,
        time_zone: 'Europe/Paris',
        city: 'Paris',
        country: 'France'
      },
      {
        airport_id: 17,
        name: 'Frankfurt International',
        iata_code: 'FRA',
        icao_code: 'EDDF',
        latitude: 50.0379,
        longitude: 8.5622,
        altitude: 364,
        time_zone: 'Europe/Berlin',
        city: 'Frankfurt',
        country: 'Germany'
      },
      {
        airport_id: 18,
        name: 'Amsterdam Schiphol',
        iata_code: 'AMS',
        icao_code: 'EHAM',
        latitude: 52.3105,
        longitude: 4.7683,
        altitude: -11,
        time_zone: 'Europe/Amsterdam',
        city: 'Amsterdam',
        country: 'Netherlands'
      },
      {
        airport_id: 19,
        name: 'Rome Fiumicino',
        iata_code: 'FCO',
        icao_code: 'LIRF',
        latitude: 41.8003,
        longitude: 12.2389,
        altitude: 16,
        time_zone: 'Europe/Rome',
        city: 'Rome',
        country: 'Italy'
      },
      {
        airport_id: 20,
        name: 'Madrid Barajas',
        iata_code: 'MAD',
        icao_code: 'LEMD',
        latitude: 40.4983,
        longitude: -3.5676,
        altitude: 1998,
        time_zone: 'Europe/Madrid',
        city: 'Madrid',
        country: 'Spain'
      },
      {
        airport_id: 21,
        name: 'Munich International',
        iata_code: 'MUC',
        icao_code: 'EDDM',
        latitude: 48.3537,
        longitude: 11.7750,
        altitude: 1487,
        time_zone: 'Europe/Berlin',
        city: 'Munich',
        country: 'Germany'
      },
      {
        airport_id: 22,
        name: 'Zurich Airport',
        iata_code: 'ZRH',
        icao_code: 'LSZH',
        latitude: 47.4647,
        longitude: 8.5492,
        altitude: 1416,
        time_zone: 'Europe/Zurich',
        city: 'Zurich',
        country: 'Switzerland'
      },
      {
        airport_id: 37,
        name: 'Dublin Airport',
        iata_code: 'DUB',
        icao_code: 'EIDW',
        latitude: 53.4213,
        longitude: -6.2701,
        altitude: 242,
        time_zone: 'Europe/Dublin',
        city: 'Dublin',
        country: 'Ireland'
      },
      // === ASIA (11) ===
      {
        airport_id: 5,
        name: 'Tokyo Haneda',
        iata_code: 'HND',
        icao_code: 'RJTT',
        latitude: 35.5494,
        longitude: 139.7798,
        altitude: 21,
        time_zone: 'Asia/Tokyo',
        city: 'Tokyo',
        country: 'Japan'
      },
      {
        airport_id: 23,
        name: 'Beijing Capital International',
        iata_code: 'PEK',
        icao_code: 'ZBAA',
        latitude: 40.0799,
        longitude: 116.6031,
        altitude: 115,
        time_zone: 'Asia/Shanghai',
        city: 'Beijing',
        country: 'China'
      },
      {
        airport_id: 24,
        name: 'Shanghai Pudong',
        iata_code: 'PVG',
        icao_code: 'ZSPD',
        latitude: 31.1443,
        longitude: 121.8083,
        altitude: 13,
        time_zone: 'Asia/Shanghai',
        city: 'Shanghai',
        country: 'China'
      },
      {
        airport_id: 25,
        name: 'Hong Kong International',
        iata_code: 'HKG',
        icao_code: 'VHHH',
        latitude: 22.3080,
        longitude: 113.9185,
        altitude: 28,
        time_zone: 'Asia/Hong_Kong',
        city: 'Hong Kong',
        country: 'Hong Kong'
      },
      {
        airport_id: 26,
        name: 'Seoul Incheon',
        iata_code: 'ICN',
        icao_code: 'RKSI',
        latitude: 37.4602,
        longitude: 126.4407,
        altitude: 23,
        time_zone: 'Asia/Seoul',
        city: 'Seoul',
        country: 'South Korea'
      },
      {
        airport_id: 27,
        name: 'Bangkok Suvarnabhumi',
        iata_code: 'BKK',
        icao_code: 'VTBS',
        latitude: 13.6811,
        longitude: 100.7471,
        altitude: 5,
        time_zone: 'Asia/Bangkok',
        city: 'Bangkok',
        country: 'Thailand'
      },
      {
        airport_id: 28,
        name: 'Mumbai Chhatrapati Shivaji',
        iata_code: 'BOM',
        icao_code: 'VABB',
        latitude: 19.0896,
        longitude: 72.8656,
        altitude: 39,
        time_zone: 'Asia/Kolkata',
        city: 'Mumbai',
        country: 'India'
      },
      {
        airport_id: 6,
        name: 'Dubai International',
        iata_code: 'DXB',
        icao_code: 'OMDB',
        latitude: 25.2532,
        longitude: 55.3657,
        altitude: 62,
        time_zone: 'Asia/Dubai',
        city: 'Dubai',
        country: 'United Arab Emirates'
      },
      {
        airport_id: 7,
        name: 'Singapore Changi',
        iata_code: 'SIN',
        icao_code: 'WSSS',
        latitude: 1.3644,
        longitude: 103.9915,
        altitude: 22,
        time_zone: 'Asia/Singapore',
        city: 'Singapore',
        country: 'Singapore'
      },
      {
        airport_id: 29,
        name: 'Doha Hamad International',
        iata_code: 'DOH',
        icao_code: 'OTHH',
        latitude: 25.2732,
        longitude: 51.6081,
        altitude: 13,
        time_zone: 'Asia/Qatar',
        city: 'Doha',
        country: 'Qatar'
      },
      {
        airport_id: 38,
        name: 'Kuala Lumpur International',
        iata_code: 'KUL',
        icao_code: 'WMKK',
        latitude: 2.7456,
        longitude: 101.7099,
        altitude: 70,
        time_zone: 'Asia/Kuala_Lumpur',
        city: 'Kuala Lumpur',
        country: 'Malaysia'
      },
      // === MIDDLE EAST & AFRICA (3) ===
      {
        airport_id: 30,
        name: 'Cairo International',
        iata_code: 'CAI',
        icao_code: 'HECA',
        latitude: 30.1219,
        longitude: 31.4056,
        altitude: 382,
        time_zone: 'Africa/Cairo',
        city: 'Cairo',
        country: 'Egypt'
      },
      {
        airport_id: 31,
        name: 'Johannesburg O.R. Tambo',
        iata_code: 'JNB',
        icao_code: 'FAOR',
        latitude: -26.1392,
        longitude: 28.2460,
        altitude: 5558,
        time_zone: 'Africa/Johannesburg',
        city: 'Johannesburg',
        country: 'South Africa'
      },
      {
        airport_id: 39,
        name: 'Istanbul Airport',
        iata_code: 'IST',
        icao_code: 'LTFM',
        latitude: 41.2606,
        longitude: 28.7424,
        altitude: 325,
        time_zone: 'Europe/Istanbul',
        city: 'Istanbul',
        country: 'Turkey'
      },
      // === OCEANIA (4) ===
      {
        airport_id: 8,
        name: 'Sydney Kingsford Smith',
        iata_code: 'SYD',
        icao_code: 'YSSY',
        latitude: -33.9399,
        longitude: 151.1753,
        altitude: 21,
        time_zone: 'Australia/Sydney',
        city: 'Sydney',
        country: 'Australia'
      },
      {
        airport_id: 32,
        name: 'Melbourne Tullamarine',
        iata_code: 'MEL',
        icao_code: 'YMML',
        latitude: -37.6690,
        longitude: 144.8410,
        altitude: 434,
        time_zone: 'Australia/Melbourne',
        city: 'Melbourne',
        country: 'Australia'
      },
      {
        airport_id: 33,
        name: 'Brisbane Airport',
        iata_code: 'BNE',
        icao_code: 'YBBN',
        latitude: -27.3956,
        longitude: 153.1176,
        altitude: 13,
        time_zone: 'Australia/Brisbane',
        city: 'Brisbane',
        country: 'Australia'
      },
      {
        airport_id: 34,
        name: 'Auckland Airport',
        iata_code: 'AKL',
        icao_code: 'NZAA',
        latitude: -37.0082,
        longitude: 174.7850,
        altitude: 23,
        time_zone: 'Pacific/Auckland',
        city: 'Auckland',
        country: 'New Zealand'
      },
      // === SOUTH AMERICA (2) ===
      {
        airport_id: 35,
        name: 'São Paulo Guarulhos',
        iata_code: 'GRU',
        icao_code: 'SBGR',
        latitude: -23.4356,
        longitude: -46.4731,
        altitude: 2459,
        time_zone: 'America/Sao_Paulo',
        city: 'São Paulo',
        country: 'Brazil'
      },
      {
        airport_id: 36,
        name: 'Buenos Aires Ezeiza',
        iata_code: 'EZE',
        icao_code: 'SAEZ',
        latitude: -34.8222,
        longitude: -58.5358,
        altitude: 67,
        time_zone: 'America/Argentina/Buenos_Aires',
        city: 'Buenos Aires',
        country: 'Argentina'
      }
    ];

    this.filteredAirports = this.airports;
    this.extractCountries();
    this.loading = false;
  }

  extractCountries() {
    const countrySet = new Set(this.airports.map(a => a.country));
    this.countries = Array.from(countrySet).sort();
  }

  filterAirports() {
    this.filteredAirports = this.airports.filter(airport => {
      const matchesSearch = this.searchQuery === '' ||
        airport.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        airport.iata_code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        airport.icao_code.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        airport.city.toLowerCase().includes(this.searchQuery.toLowerCase());

      const matchesCountry = this.selectedCountry === '' ||
        airport.country === this.selectedCountry;

      return matchesSearch && matchesCountry;
    });
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCountry = '';
    this.filterAirports();
  }
}
