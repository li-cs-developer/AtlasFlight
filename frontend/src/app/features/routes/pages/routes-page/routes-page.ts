import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-routes-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ScrollingModule],
  templateUrl: './routes-page.html',
  styleUrls: ['./routes-page.scss']
})
export class RoutesPage implements OnInit {
  allRoutes: any[] = [];
  filteredRoutes: any[] = [];
  fromSearch: string = '';
  toSearch: string = '';
  loading: boolean = false;
  total: number = 0;
  loadedAll: boolean = false;
  searchPerformed: boolean = false;

  // Virtual scroll settings
  itemHeight: number = 56; // Height of each row in pixels

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadRoutes();
  }

  loadRoutes() {
    this.loading = true;

    // First: Load 100 routes immediately
    this.apiService.getRoutes({ limit: 100 }).subscribe({
      next: (firstBatch) => {
        this.allRoutes = firstBatch.items;
        this.filteredRoutes = firstBatch.items;
        this.total = typeof firstBatch.total === 'number' ? firstBatch.total : 0;
        this.loading = false;
        console.log(`Loaded ${this.allRoutes.length} routes (first batch)`);

        // Then: Load all remaining routes in background
        this.apiService.getRoutes({ limit: 100000 }).subscribe({
          next: (fullData) => {
            this.allRoutes = fullData.items;
            this.total = typeof fullData.total === 'number' ? fullData.total : 0;
            this.loadedAll = true;
            console.log(`Loaded all ${this.allRoutes.length} routes`);

            // Re-apply filters if any are active
            if (this.fromSearch || this.toSearch) {
              this.filterRoutes();
            } else {
              this.filteredRoutes = this.allRoutes;
            }
          },
          error: (error) => {
            console.error('Error loading full routes:', error);
          }
        });
      },
      error: (error) => {
        console.error('Error loading initial routes:', error);
        this.loading = false;
      }
    });
  }

  filterRoutes() {
    this.searchPerformed = true;
    let results = this.allRoutes;

    // Filter by "From"
    if (this.fromSearch.trim()) {
      const fromQuery = this.fromSearch.toLowerCase().trim();
      results = results.filter(route => {
        return (
          route.source_name?.toLowerCase().includes(fromQuery) ||
          route.source_airport?.toLowerCase().includes(fromQuery)
        );
      });
    }

    // Filter by "To"
    if (this.toSearch.trim()) {
      const toQuery = this.toSearch.toLowerCase().trim();
      results = results.filter(route => {
        return (
          route.destination_name?.toLowerCase().includes(toQuery) ||
          route.destination_airport?.toLowerCase().includes(toQuery)
        );
      });
    }

    // Sort by stops (least to most)
    this.filteredRoutes = results.sort((a, b) => a.stops - b.stops);
  }

  clearFromSearch() {
    this.fromSearch = '';
    if (this.toSearch) {
      this.filterRoutes();
    } else {
      this.filteredRoutes = this.allRoutes;
    }
  }

  clearToSearch() {
    this.toSearch = '';
    if (this.fromSearch) {
      this.filterRoutes();
    } else {
      this.filteredRoutes = this.allRoutes;
    }
  }

  clearAllFilters() {
    this.fromSearch = '';
    this.toSearch = '';
    this.searchPerformed = false;
    this.filteredRoutes = this.allRoutes;
  }
}
