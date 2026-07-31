import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../core/services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard implements OnInit {

  stats: any = {
    total_airports: 0,
    total_airlines: 0,
    total_routes: 0,
    total_countries: 0
  };
  loading = true;

  topAirlines: any[] = [];
  aircraftDistribution: any[] = [];
  routeStats: any[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;

    // 1. Get dashboard stats
    this.apiService.getDashboardStats().subscribe({
      next: (data) => {
        this.stats = data;
        console.log('Dashboard stats loaded:', data);
      },
      error: (error) => {
        console.error('Error loading dashboard stats:', error);
      }
    });

    // 2. Get top airlines by route count (real data!)
    this.apiService.getTopAirlines().subscribe({
      next: (data) => {
        this.topAirlines = data;
        console.log('Top airlines loaded:', this.topAirlines);
      },
      error: (error) => {
        console.error('Error loading top airlines:', error);
        // No fallback - keep empty
      }
    });

    // 3. Get aircraft distribution from fleet data
    this.apiService.getFleet().subscribe({
      next: (data) => {
        this.aircraftDistribution = (data.items || [])
          .slice(0, 5)
          .map((a: any) => ({
            name: a.name || a.icao_code || 'Unknown',
            value: a.count || 0
          }))
          .sort((a: any, b: any) => b.value - a.value);

        console.log('Aircraft distribution loaded:', this.aircraftDistribution);
      },
      error: (error) => {
        console.error('Error loading fleet:', error);
        // No fallback - keep empty
      }
    });

    // 4. Route stats - calculate from actual routes
    this.apiService.getRoutes({ limit: 100000 }).subscribe({
      next: (data) => {
        const routes = data.items || [];
        const total = routes.length || 1;

        const direct = routes.filter((r: any) => r.stops === 0).length;
        const oneStop = routes.filter((r: any) => r.stops === 1).length;
        const multiStop = routes.filter((r: any) => r.stops >= 2).length;

        // Calculate with 2 decimal precision
        const directPct = (direct / total) * 100;
        const oneStopPct = (oneStop / total) * 100;
        const multiStopPct = (multiStop / total) * 100;

        this.routeStats = [
          {
            name: 'Direct Routes',
            value: Math.round(directPct * 100) / 100,
            count: direct,
            pct: directPct
          },
          {
            name: '1 Stop',
            value: Math.round(oneStopPct * 100) / 100,
            count: oneStop,
            pct: oneStopPct
          },
          {
            name: '2+ Stops',
            value: Math.round(multiStopPct * 100) / 100,
            count: multiStop,
            pct: multiStopPct
          }
        ];
        console.log('Route stats loaded:', this.routeStats);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading routes:', error);
        this.routeStats = [];
        this.loading = false;
      }
    });
  }

  // Helper to check if route stats are available
  hasRouteStats(): boolean {
    return this.routeStats && this.routeStats.length > 0;
  }

  getMaxValue(data: any[]): number {
    if (!data || data.length === 0) return 100;
    return Math.max(...data.map((item: any) => item.value || 0));
  }

  // Format percentage for display
  formatPercent(value: number): string {
    if (value === undefined || value === null) return '0.00';
    return value.toFixed(2);
  }

  goToAirports() {
    this.router.navigate(['/airports']);
  }

  goToAirlines() {
    this.router.navigate(['/airlines']);
  }

  goToRoutes() {
    this.router.navigate(['/routes']);
  }

  goToFleet() {
    this.router.navigate(['/fleet']);
  }

  goToRouteFinder() {
    this.router.navigate(['/route-finder']);
  }
}
