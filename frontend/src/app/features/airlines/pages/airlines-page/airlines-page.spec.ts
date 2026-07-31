import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AirlinesPage } from './airlines-page';
import { ApiService } from '../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

describe('AirlinesPage', () => {
  let component: AirlinesPage;
  let fixture: ComponentFixture<AirlinesPage>;
  let mockApiService: any;

  const mockAirlines = {
    total: 5852,
    items: [
      { name: 'Delta Air Lines', iata_code: 'DL', icao_code: 'DAL', callsign: 'DELTA', country_name: 'United States', active: 'Y' },
      { name: 'United Airlines', iata_code: 'UA', icao_code: 'UAL', callsign: 'UNITED', country_name: 'United States', active: 'Y' },
      { name: 'American Airlines', iata_code: 'AA', icao_code: 'AAL', callsign: 'AMERICAN', country_name: 'United States', active: 'Y' },
      { name: 'British Airways', iata_code: 'BA', icao_code: 'BAW', callsign: 'SPEEDBIRD', country_name: 'United Kingdom', active: 'Y' }
    ]
  };

  const mockCountries = [
    { iso_code: 'US', name: 'United States' },
    { iso_code: 'GB', name: 'United Kingdom' }
  ];

  beforeEach(async () => {
    mockApiService = {
      getAirlines: jest.fn().mockReturnValue(of(mockAirlines)),
      getCountries: jest.fn().mockReturnValue(of(mockCountries))
    };

    await TestBed.configureTestingModule({
      imports: [AirlinesPage, FormsModule, ScrollingModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AirlinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load airlines on init', () => {
    expect(mockApiService.getAirlines).toHaveBeenCalled();
    expect(component.allAirlines.length).toBe(4);
    expect(component.filteredAirlines.length).toBe(4);
    expect(component.airlinesRows.length).toBe(2); // 4 items / 3 per row = 2 rows
    expect(component.airlinesRows[0].length).toBe(3);
    expect(component.airlinesRows[1].length).toBe(1);
  });

  it('should load countries on init', () => {
    expect(mockApiService.getCountries).toHaveBeenCalled();
    expect(component.countries.length).toBe(2);
  });

  it('should chunk array into rows of specified size', () => {
    const items = [1, 2, 3, 4, 5, 6, 7];
    const chunked = component.chunkArray(items, 3);
    expect(chunked.length).toBe(3);
    expect(chunked[0]).toEqual([1, 2, 3]);
    expect(chunked[1]).toEqual([4, 5, 6]);
    expect(chunked[2]).toEqual([7]);
  });

  it('should filter airlines by search query', () => {
    component.allAirlines = mockAirlines.items;
    component.searchQuery = 'Delta';
    component.filterAirlines();
    expect(component.filteredAirlines.length).toBe(1);
    expect(component.filteredAirlines[0].name).toBe('Delta Air Lines');
    expect(component.airlinesRows.length).toBe(1);
    expect(component.airlinesRows[0][0].name).toBe('Delta Air Lines');
  });

  it('should filter airlines by country using country_name', () => {
    component.allAirlines = mockAirlines.items;
    component.selectedCountry = 'United States';
    component.filterAirlines();
    expect(component.filteredAirlines.length).toBe(3);
    expect(component.airlinesRows.length).toBe(1); // 3 items / 3 per row = 1 row
    expect(component.airlinesRows[0].length).toBe(3);
  });

  it('should return 0 results when country filter has no match', () => {
    component.allAirlines = mockAirlines.items;
    component.selectedCountry = 'Canada';
    component.filterAirlines();
    expect(component.filteredAirlines.length).toBe(0);
    expect(component.airlinesRows.length).toBe(0);
  });

  it('should clear filters', () => {
    component.allAirlines = mockAirlines.items;
    component.searchQuery = 'Delta';
    component.selectedCountry = 'United States';
    component.clearFilters();
    expect(component.searchQuery).toBe('');
    expect(component.selectedCountry).toBe('');
    expect(component.filteredAirlines).toEqual(mockAirlines.items);
    expect(component.airlinesRows.length).toBe(2); // 4 items / 3 per row = 2 rows
  });

  it('should update airlinesRows when filtering', () => {
    component.allAirlines = mockAirlines.items;
    component.searchQuery = 'British';
    component.filterAirlines();
    expect(component.airlinesRows.length).toBe(1);
    expect(component.airlinesRows[0][0].name).toBe('British Airways');
  });

  it('should handle error when loading airlines', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    mockApiService.getAirlines.mockReturnValue(throwError(() => new Error('API Error')));

    component.loadAirlines();
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
