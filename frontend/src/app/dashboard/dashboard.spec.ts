import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Dashboard } from './dashboard';
import { ApiService } from '../core/services/api.service';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let mockApiService: any;
  let mockRouter: any;

  const mockStats = {
    total_airports: 5911,
    total_airlines: 5852,
    total_routes: 64360,
    total_countries: 240
  };

  const mockTopAirlines = [
    { name: 'Delta', value: 883 },
    { name: 'United', value: 871 },
    { name: 'American', value: 945 }
  ];

  const mockFleet = {
    items: [
      { name: 'Boeing 737', count: 4567 },
      { name: 'Airbus A320', count: 3891 }
    ]
  };

  const mockRoutes = {
    items: [{ stops: 0 }, { stops: 0 }, { stops: 1 }]
  };

  beforeEach(async () => {
    mockApiService = {
      getDashboardStats: jest.fn().mockReturnValue(of(mockStats)),
      getTopAirlines: jest.fn().mockReturnValue(of(mockTopAirlines)),
      getFleet: jest.fn().mockReturnValue(of(mockFleet)),
      getRoutes: jest.fn().mockReturnValue(of(mockRoutes)),
      getCountries: jest.fn().mockReturnValue(of([])),
      getAirports: jest.fn().mockReturnValue(of({ items: [] })),
      getAirlines: jest.fn().mockReturnValue(of({ items: [] }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: ApiService, useValue: mockApiService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard stats on init', () => {
    expect(mockApiService.getDashboardStats).toHaveBeenCalled();
    expect(component.stats).toEqual(mockStats);
  });

  it('should load top airlines on init', () => {
    expect(mockApiService.getTopAirlines).toHaveBeenCalled();
    expect(component.topAirlines).toEqual(mockTopAirlines);
  });

  it('should load fleet data on init', () => {
    expect(mockApiService.getFleet).toHaveBeenCalled();
  });

  it('should calculate route stats from routes data', () => {
    expect(component.routeStats.length).toBe(3);
    expect(component.routeStats[0].name).toBe('Direct Routes');
    expect(component.routeStats[0].count).toBe(2);
    expect(component.routeStats[1].name).toBe('1 Stop');
    expect(component.routeStats[1].count).toBe(1);
    expect(component.routeStats[2].name).toBe('2+ Stops');
    expect(component.routeStats[2].count).toBe(0);
  });

  it('should return true when route stats exist', () => {
    expect(component.hasRouteStats()).toBe(true);
  });

  it('should return false when route stats are empty', () => {
    component.routeStats = [];
    expect(component.hasRouteStats()).toBe(false);
  });

  it('should calculate max value correctly', () => {
    const data = [{ value: 100 }, { value: 200 }, { value: 150 }];
    expect(component.getMaxValue(data)).toBe(200);
  });

  it('should return 100 when data is empty', () => {
    expect(component.getMaxValue([])).toBe(100);
  });

  it('should format percentage correctly', () => {
    expect(component.formatPercent(66.666)).toBe('66.67');
    expect(component.formatPercent(33.333)).toBe('33.33');
    expect(component.formatPercent(0)).toBe('0.00');
  });

  it('should navigate to airports page', () => {
    component.goToAirports();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/airports']);
  });

  it('should navigate to airlines page', () => {
    component.goToAirlines();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/airlines']);
  });

  it('should navigate to routes page', () => {
    component.goToRoutes();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/routes']);
  });

  it('should navigate to fleet page', () => {
    component.goToFleet();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/fleet']);
  });

  it('should navigate to route-finder page', () => {
    component.goToRouteFinder();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/route-finder']);
  });
});
