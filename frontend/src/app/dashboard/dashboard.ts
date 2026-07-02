import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {

  // Chart data - hardcoded for reliability
  topAirlines = [
    { name: 'American Airlines', value: 945 },
    { name: 'Delta Air Lines', value: 883 },
    { name: 'United Airlines', value: 871 },
    { name: 'Southwest Airlines', value: 733 },
    { name: 'Emirates', value: 269 }
  ];

  aircraftDistribution = [
    { name: 'Boeing 737', value: 4567 },
    { name: 'Airbus A320', value: 3891 },
    { name: 'Boeing 777', value: 2234 },
    { name: 'Airbus A330', value: 1456 },
    { name: 'Boeing 787', value: 989 }
  ];

  routeStats = [
    { name: 'Direct Routes', value: 68 },
    { name: '1 Stop', value: 23 },
    { name: '2+ Stops', value: 9 }
  ];

  constructor(private router: Router) {}

  getMaxValue(data: any[]): number {
    return Math.max(...data.map(item => item.value));
  }

  // Navigation methods - now using Router
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
