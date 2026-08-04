import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-airports-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule],
  templateUrl: './airports-page.html',
  styleUrls: ['./airports-page.scss']
})
export class AirportsPage implements OnInit {
  allAirports: any[] = [];
  filteredAirports: any[] = [];
  airportsRows: any[][] = [];
  searchQuery: string = '';
  selectedCountry: string = '';
  countries: any[] = [];
  loading: boolean = false;
  total: number = 0;
  loadedAll: boolean = false;
  searchPerformed: boolean = false;

  itemHeight: number = 220;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAirports();
    this.loadCountries();
  }

  chunkArray(array: any[], chunkSize: number = 3): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  loadAirports() {
    this.loading = true;

    const params: any = { limit: 100 };
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.selectedCountry) params.country = this.selectedCountry;

    this.apiService.getAirports(params).subscribe({
      next: (firstBatch) => {
        this.allAirports = firstBatch.items;
        this.filteredAirports = firstBatch.items;
        this.airportsRows = this.chunkArray(this.filteredAirports, 3);
        this.total = typeof firstBatch.total === 'number' ? firstBatch.total : 0;
        this.loading = false;
        console.log(`Loaded ${this.allAirports.length} airports (first batch)`);

        const fullParams: any = { limit: 100000 };
        if (this.searchQuery) fullParams.search = this.searchQuery;
        if (this.selectedCountry) fullParams.country = this.selectedCountry;

        this.apiService.getAirports(fullParams).subscribe({
          next: (fullData) => {
            this.allAirports = fullData.items;
            this.total = typeof fullData.total === 'number' ? fullData.total : 0;
            this.loadedAll = true;
            console.log(`Loaded all ${this.allAirports.length} airports`);

            if (this.searchQuery || this.selectedCountry) {
              this.filterAirports();
            } else {
              this.filteredAirports = this.allAirports;
              this.airportsRows = this.chunkArray(this.filteredAirports, 3);
            }
          },
          error: (error) => {
            console.error('Error loading full airports:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading initial airports:', error);
        this.loading = false;
      }
    });
  }

  loadCountries() {
    this.apiService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        console.log('Countries loaded:', this.countries);
      },
      error: (error) => {
        console.error('Error loading countries:', error);
      }
    });
  }

  getCountryName(isoCode: string): string {
    const country = this.countries.find(c => c.iso_code === isoCode);
    return country ? country.name : isoCode;
  }

  filterAirports() {
    this.searchPerformed = true;
    let results = this.allAirports;

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      results = results.filter(airport => {
        return (
          airport.name?.toLowerCase().includes(query) ||
          airport.iata_code?.toLowerCase().includes(query) ||
          airport.icao_code?.toLowerCase().includes(query) ||
          airport.city?.toLowerCase().includes(query)
        );
      });
    }

    if (this.selectedCountry) {
      const selectedCountryName = this.getCountryName(this.selectedCountry);
      results = results.filter(airport =>
        airport.country === selectedCountryName
      );
    }

    this.filteredAirports = results;
    this.airportsRows = this.chunkArray(this.filteredAirports, 3);
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCountry = '';
    this.searchPerformed = false;
    this.filteredAirports = this.allAirports;
    this.airportsRows = this.chunkArray(this.filteredAirports, 3);
  }
}
