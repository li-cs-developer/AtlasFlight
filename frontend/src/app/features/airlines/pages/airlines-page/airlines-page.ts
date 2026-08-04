import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-airlines-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule],
  templateUrl: './airlines-page.html',
  styleUrls: ['./airlines-page.scss']
})
export class AirlinesPage implements OnInit {
  allAirlines: any[] = [];
  filteredAirlines: any[] = [];
  airlinesRows: any[][] = []; // <--- Rows for virtual scroll
  searchQuery: string = '';
  selectedCountry: string = '';
  countries: any[] = [];
  loading: boolean = false;
  total: number = 0;
  loadedAll: boolean = false;
  searchPerformed: boolean = false;

  itemHeight: number = 200; // Height of each row

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadAirlines();
    this.loadCountries();
  }

  // Helper to chunk array into rows of 3
  chunkArray(array: any[], chunkSize: number = 3): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }

  loadAirlines() {
    this.loading = true;

    const params: any = { limit: 100 };
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.selectedCountry) params.country = this.selectedCountry;

    this.apiService.getAirlines(params).subscribe({
      next: (firstBatch) => {
        this.allAirlines = firstBatch.items;
        this.filteredAirlines = firstBatch.items;
        this.airlinesRows = this.chunkArray(this.filteredAirlines, 3);
        this.total = typeof firstBatch.total === 'number' ? firstBatch.total : 0;
        this.loading = false;
        console.log(`Loaded ${this.allAirlines.length} airlines (first batch)`);

        const fullParams: any = { limit: 100000 };
        if (this.searchQuery) fullParams.search = this.searchQuery;
        if (this.selectedCountry) fullParams.country = this.selectedCountry;

        this.apiService.getAirlines(fullParams).subscribe({
          next: (fullData) => {
            this.allAirlines = fullData.items;
            this.total = typeof fullData.total === 'number' ? fullData.total : 0;
            this.loadedAll = true;
            console.log(`Loaded all ${this.allAirlines.length} airlines`);

            if (this.searchQuery || this.selectedCountry) {
              this.filterAirlines();
            } else {
              this.filteredAirlines = this.allAirlines;
              this.airlinesRows = this.chunkArray(this.filteredAirlines, 3);
            }
          },
          error: (error) => {
            console.error('Error loading full airlines:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading initial airlines:', error);
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

  filterAirlines() {
    this.searchPerformed = true;
    let results = this.allAirlines;

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      results = results.filter(airline => {
        return (
          airline.name?.toLowerCase().includes(query) ||
          airline.icao_code?.toLowerCase().includes(query)
        );
      });
    }

    if (this.selectedCountry) {
      results = results.filter(airline =>
        airline.country_name === this.selectedCountry
      );
    }

    this.filteredAirlines = results;
    this.airlinesRows = this.chunkArray(this.filteredAirlines, 3);
  }

  clearFilters() {
    this.searchQuery = '';
    this.selectedCountry = '';
    this.searchPerformed = false;
    this.filteredAirlines = this.allAirlines;
    this.airlinesRows = this.chunkArray(this.filteredAirlines, 3);
  }
}
