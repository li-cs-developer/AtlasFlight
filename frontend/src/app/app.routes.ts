import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard')
      .then(m => m.Dashboard)
  },
  {
    path: 'airports',
    loadComponent: () => import('./features/airports/pages/airports-page/airports-page')
      .then(m => m.AirportsPage)
  },
  {
    path: 'airlines',
    loadComponent: () => import('./features/airlines/pages/airlines-page/airlines-page')
      .then(m => m.AirlinesPage)
  },
  {
    path: 'routes',
    loadComponent: () => import('./features/routes/pages/routes-page/routes-page')
      .then(m => m.RoutesPage)
  },
  {
    path: 'fleet',
    loadComponent: () => import('./features/fleet/pages/fleet-page/fleet-page')
      .then(m => m.FleetPage)
  },
  {
    path: 'route-finder',
    loadComponent: () => import('./features/route-finder/route-finder')
      .then(m => m.RouteFinder)
  }
];
