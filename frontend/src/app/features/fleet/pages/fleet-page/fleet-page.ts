import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fleet-page.html',
  styleUrls: ['./fleet-page.scss']
})
export class FleetPage implements OnInit {

  aircraftTypes: any[] = [];
  filteredAircraft: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  isProgressiveLoading: boolean = false;

  sortOption: string = 'count-desc';
  sortOptions = [
    { value: 'count-desc', label: 'Total Aircraft (Most)' },
    { value: 'count-asc', label: 'Total Aircraft (Least)' },
    { value: 'operators-desc', label: 'Operators (Most)' },
    { value: 'operators-asc', label: 'Operators (Least)' },
    { value: 'registrations-desc', label: 'Registrations (Most)' },
    { value: 'registrations-asc', label: 'Registrations (Least)' },
    { value: 'active-desc', label: 'Active Aircraft (Most)' },
    { value: 'active-asc', label: 'Active Aircraft (Least)' }
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadFleet();
  }

  loadFleet() {
    this.loading = true;
    this.isProgressiveLoading = true;

    this.apiService.getFleet().subscribe({
      next: (data) => {
        this.aircraftTypes = data.items;
        this.filteredAircraft = data.items;
        this.isProgressiveLoading = false;
        this.loading = false;
        console.log('Fleet data loaded:', this.aircraftTypes);
        this.applyFilters();
      },
      error: (error) => {
        console.error('Error loading fleet:', error);
        this.loading = false;
        this.isProgressiveLoading = false;
      }
    });
  }

  applyFilters() {
    let results = [...this.aircraftTypes];

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      results = results.filter(aircraft => {
        return aircraft.name?.toLowerCase().includes(query);
      });
    }

    results = this.sortAircraft(results);
    this.filteredAircraft = results;
  }

  sortAircraft(items: any[]): any[] {
    const sorted = [...items];
    switch (this.sortOption) {
      case 'count-desc':
        return sorted.sort((a, b) => (b.count || 0) - (a.count || 0));
      case 'count-asc':
        return sorted.sort((a, b) => (a.count || 0) - (b.count || 0));
      case 'operators-desc':
        return sorted.sort((a, b) => (b.operators || 0) - (a.operators || 0));
      case 'operators-asc':
        return sorted.sort((a, b) => (a.operators || 0) - (b.operators || 0));
      case 'registrations-desc':
        return sorted.sort((a, b) => (b.registrations || 0) - (a.registrations || 0));
      case 'registrations-asc':
        return sorted.sort((a, b) => (a.registrations || 0) - (b.registrations || 0));
      case 'active-desc':
        return sorted.sort((a, b) => (b.active || 0) - (a.active || 0));
      case 'active-asc':
        return sorted.sort((a, b) => (a.active || 0) - (b.active || 0));
      default:
        return sorted;
    }
  }

  clearFilters() {
    this.searchQuery = '';
    this.sortOption = 'count-desc';
    this.applyFilters();
  }

  getTotalAircraft(): number {
    return this.aircraftTypes.reduce((sum, type) => sum + (type.count || 0), 0);
  }

  getTotalOperators(): number {
    return this.aircraftTypes.reduce((sum, type) => sum + (type.operators || 0), 0);
  }

  getTotalRegistrations(): number {
    return this.aircraftTypes.reduce((sum, type) => sum + (type.registrations || 0), 0);
  }

  getPercentage(count: number): number {
    const total = this.getTotalAircraft();
    return total > 0 ? (count / total) * 100 : 0;
  }
}
