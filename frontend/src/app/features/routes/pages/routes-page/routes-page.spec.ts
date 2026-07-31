import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RoutesPage } from './routes-page';
import { ApiService } from '../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('RoutesPage', () => {
  let component: RoutesPage;
  let fixture: ComponentFixture<RoutesPage>;
  let mockApiService: any;

  const mockRoutes = {
    total: 64360,
    items: [
      { route_id: 1, source_airport: 'ATL', source_name: 'Atlanta', destination_airport: 'LAX', destination_name: 'Los Angeles', stops: 0 },
      { route_id: 2, source_airport: 'JFK', source_name: 'New York', destination_airport: 'LHR', destination_name: 'London', stops: 0 },
      { route_id: 3, source_airport: 'ORD', source_name: 'Chicago', destination_airport: 'DFW', destination_name: 'Dallas', stops: 1 }
    ]
  };

  beforeEach(async () => {
    mockApiService = {
      getRoutes: jest.fn().mockReturnValue(of(mockRoutes))
    };

    await TestBed.configureTestingModule({
      imports: [RoutesPage, FormsModule, ScrollingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RoutesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load routes on init', () => {
    expect(mockApiService.getRoutes).toHaveBeenCalledWith({ limit: 100 });
    expect(component.allRoutes.length).toBe(3);
    expect(component.filteredRoutes.length).toBe(3);
  });

  it('should filter routes by from search', () => {
    component.allRoutes = mockRoutes.items;
    component.fromSearch = 'ATL';
    component.filterRoutes();
    expect(component.filteredRoutes.length).toBe(1);
    expect(component.filteredRoutes[0].source_airport).toBe('ATL');
  });

  it('should filter routes by to search', () => {
    component.allRoutes = mockRoutes.items;
    component.toSearch = 'LHR';
    component.filterRoutes();
    expect(component.filteredRoutes.length).toBe(1);
    expect(component.filteredRoutes[0].destination_airport).toBe('LHR');
  });

  it('should filter routes by both from and to search', () => {
    component.allRoutes = mockRoutes.items;
    component.fromSearch = 'ATL';
    component.toSearch = 'LAX';
    component.filterRoutes();
    expect(component.filteredRoutes.length).toBe(1);
    expect(component.filteredRoutes[0].source_airport).toBe('ATL');
    expect(component.filteredRoutes[0].destination_airport).toBe('LAX');
  });

  it('should sort routes by stops', () => {
    component.allRoutes = mockRoutes.items;
    component.filterRoutes();
    expect(component.filteredRoutes[0].stops).toBe(0);
    expect(component.filteredRoutes[1].stops).toBe(0);
    expect(component.filteredRoutes[2].stops).toBe(1);
  });

  it('should clear from search', () => {
    component.allRoutes = mockRoutes.items;
    component.fromSearch = 'ATL';
    component.toSearch = '';
    component.clearFromSearch();
    expect(component.fromSearch).toBe('');
    expect(component.filteredRoutes).toEqual(mockRoutes.items);
  });

  it('should clear to search', () => {
    component.allRoutes = mockRoutes.items;
    component.toSearch = 'LHR';
    component.fromSearch = '';
    component.clearToSearch();
    expect(component.toSearch).toBe('');
    expect(component.filteredRoutes).toEqual(mockRoutes.items);
  });

  it('should clear all filters', () => {
    component.allRoutes = mockRoutes.items;
    component.fromSearch = 'ATL';
    component.toSearch = 'LAX';
    component.searchPerformed = true;
    component.clearAllFilters();
    expect(component.fromSearch).toBe('');
    expect(component.toSearch).toBe('');
    expect(component.searchPerformed).toBe(false);
    expect(component.filteredRoutes).toEqual(mockRoutes.items);
  });

  it('should load remaining routes in background', () => {
    const secondBatch = { total: 64360, items: [...mockRoutes.items, { route_id: 4, source_airport: 'SFO', source_name: 'San Francisco', destination_airport: 'JFK', destination_name: 'New York', stops: 0 }] };
    mockApiService.getRoutes.mockReturnValueOnce(of(mockRoutes)).mockReturnValueOnce(of(secondBatch));

    component.loadRoutes();
    expect(mockApiService.getRoutes).toHaveBeenCalledWith({ limit: 100000 });
  });
});
