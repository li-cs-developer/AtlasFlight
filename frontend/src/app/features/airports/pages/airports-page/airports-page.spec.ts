import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AirportsPage } from './airports-page';
import { ApiService } from '../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('AirportsPage', () => {
  let component: AirportsPage;
  let fixture: ComponentFixture<AirportsPage>;
  let mockApiService: any;

  const mockAirports = {
    total: 5911,
    items: [
      { airport_id: 1, name: 'Atlanta International', iata_code: 'ATL', city: 'Atlanta', country: 'United States', country_iso: 'US', altitude: 1026 },
      { airport_id: 2, name: 'Los Angeles International', iata_code: 'LAX', city: 'Los Angeles', country: 'United States', country_iso: 'US', altitude: 126 },
      { airport_id: 3, name: 'London Heathrow', iata_code: 'LHR', city: 'London', country: 'United Kingdom', country_iso: 'GB', altitude: 83 },
      { airport_id: 4, name: 'Tokyo Haneda', iata_code: 'HND', city: 'Tokyo', country: 'Japan', country_iso: 'JP', altitude: 21 }
    ]
  };

  const mockCountries = [
    { iso_code: 'US', name: 'United States' },
    { iso_code: 'GB', name: 'United Kingdom' },
    { iso_code: 'JP', name: 'Japan' }
  ];

  beforeEach(async () => {
    mockApiService = {
      getAirports: jest.fn().mockReturnValue(of(mockAirports)),
      getCountries: jest.fn().mockReturnValue(of(mockCountries))
    };

    await TestBed.configureTestingModule({
      imports: [AirportsPage, FormsModule, ScrollingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AirportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load airports on init', () => {
    expect(mockApiService.getAirports).toHaveBeenCalled();
    expect(component.allAirports.length).toBe(4);
    expect(component.filteredAirports.length).toBe(4);
    expect(component.airportsRows.length).toBe(2); // 4 items / 3 per row = 2 rows
    expect(component.airportsRows[0].length).toBe(3);
    expect(component.airportsRows[1].length).toBe(1);
  });

  it('should load countries on init', () => {
    expect(mockApiService.getCountries).toHaveBeenCalled();
    expect(component.countries.length).toBe(3);
  });

  it('should chunk array into rows of specified size', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    const chunked = component.chunkArray(items, 3);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toEqual([1, 2, 3]);
    expect(chunked[1]).toEqual([4, 5, 6]);
    expect(chunked[2]).toEqual([7]);
  });

  it('should filter airports by search query', () => {
    component.allAirports = mockAirports.items;
    component.searchQuery = 'ATL';
    component.filterAirports();
    expect(component.filteredAirports.length).toBe(1);
    expect(component.filteredAirports[0].iata_code).toBe('ATL');
    expect(component.airportsRows.length).toBe(1);
    expect(component.airportsRows[0][0].iata_code).toBe('ATL');
  });

  it('should filter airports by country using country_iso', () => {
    component.allAirports = mockAirports.items;
    component.selectedCountry = 'US';
    component.filterAirports();
    expect(component.filteredAirports.length).toBe(2);
    expect(component.airportsRows.length).toBe(1); // 2 items / 3 per row = 1 row
    expect(component.airportsRows[0].length).toBe(2);
  });

  it('should return 0 results when country filter has no match', () => {
    component.allAirports = mockAirports.items;
    component.selectedCountry = 'FR';
    component.filterAirports();
    expect(component.filteredAirports.length).toBe(0);
    expect(component.airportsRows.length).toBe(0);
  });

  it('should clear filters', () => {
    component.allAirports = mockAirports.items;
    component.searchQuery = 'ATL';
    component.selectedCountry = 'US';
    component.clearFilters();
    expect(component.searchQuery).toBe('');
    expect(component.selectedCountry).toBe('');
    expect(component.filteredAirports).toEqual(mockAirports.items);
    expect(component.airportsRows.length).toBe(2); // 4 items / 3 per row = 2 rows
  });

  it('should update airportsRows when filtering', () => {
    component.allAirports = mockAirports.items;
    component.searchQuery = 'Atlanta';
    component.filterAirports();
    expect(component.airportsRows.length).toBe(1);
    expect(component.airportsRows[0][0].name).toBe('Atlanta International');
  });

  it('should handle error when loading airports', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockApiService.getAirports.mockReturnValue(throwError(() => new Error('API Error')));

    component.loadAirports();
    expect(consoleSpy).toHaveBeenCalled();
    expect(component.loading).toBe(false);
    consoleSpy.mockRestore();
  });

  it('should handle error when loading countries', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockApiService.getCountries.mockReturnValue(throwError(() => new Error('API Error')));

    component.loadCountries();
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
