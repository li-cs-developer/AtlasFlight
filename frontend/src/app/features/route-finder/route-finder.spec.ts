import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RouteFinder } from './route-finder';
import { ApiService } from '../../core/services/api.service';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RouteFinder', () => {
  let component: RouteFinder;
  let fixture: ComponentFixture<RouteFinder>;
  let mockApiService: any;

  const mockAirports = {
    items: [
      { airport_id: 1, name: 'Atlanta International', iata_code: 'ATL', icao_code: 'KATL', city: 'Atlanta' },
      { airport_id: 2, name: 'Los Angeles International', iata_code: 'LAX', icao_code: 'KLAX', city: 'Los Angeles' },
      { airport_id: 3, name: 'John F Kennedy International', iata_code: 'JFK', icao_code: 'KJFK', city: 'New York' }
    ]
  };

  const mockRoutes = [
    { source_airport: 'ATL', destination_airport: 'LAX', stops: 0, airline: 'Delta', source_name: 'Atlanta', destination_name: 'Los Angeles' }
  ];

  beforeEach(async () => {
    mockApiService = {
      getAirports: jest.fn().mockReturnValue(of(mockAirports)),
      findRoutes: jest.fn().mockReturnValue(of(mockRoutes))
    };

    await TestBed.configureTestingModule({
      imports: [
        RouteFinder,
        FormsModule,
        MatAutocompleteModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteFinder);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load airports on init', () => {
    expect(mockApiService.getAirports).toHaveBeenCalled();
    expect(component.airports.length).toBe(3);
  });

  it('should filter airports on from input', () => {
    component.airports = mockAirports.items;
    component.onFromInput('ATL');
    expect(component.fromAirportCode).toBe('ATL');
    expect(component.fromAirportName).toBe('Atlanta International');
    expect(component.fromAirportInput).toBe('Atlanta International (ATL)');
  });

  it('should filter airports on to input', () => {
    component.airports = mockAirports.items;
    component.onToInput('LAX');
    expect(component.toAirportCode).toBe('LAX');
    expect(component.toAirportName).toBe('Los Angeles International');
    expect(component.toAirportInput).toBe('Los Angeles International (LAX)');
  });

  it('should handle no match on from input', () => {
    component.airports = mockAirports.items;
    component.onFromInput('XYZ');
    expect(component.fromAirportCode).toBe('');
    expect(component.fromAirportName).toBe('');
  });

  it('should handle no match on to input', () => {
    component.airports = mockAirports.items;
    component.onToInput('XYZ');
    expect(component.toAirportCode).toBe('');
    expect(component.toAirportName).toBe('');
  });

  it('should find routes between airports', () => {
    component.fromAirportCode = 'ATL';
    component.toAirportCode = 'LAX';
    component.airports = mockAirports.items;
    component.findRoutes();
    expect(mockApiService.findRoutes).toHaveBeenCalledWith('ATL', 'LAX');
    expect(component.results.length).toBe(1);
    expect(component.searched).toBe(true);
  });

  it('should not find routes when airports are same', () => {
    component.fromAirportCode = 'ATL';
    component.toAirportCode = 'ATL';
    component.findRoutes();
    expect(component.results.length).toBe(0);
    expect(component.loading).toBe(false);
  });

  it('should generate mock routes when API fails', () => {
    mockApiService.findRoutes.mockReturnValue(of(null));
    component.fromAirportCode = 'ATL';
    component.toAirportCode = 'LAX';
    component.findRoutes();
    expect(component.results.length).toBeGreaterThan(0);
  });

  it('should swap airports', () => {
    component.fromAirportCode = 'ATL';
    component.fromAirportInput = 'Atlanta International (ATL)';
    component.fromAirportName = 'Atlanta International';
    component.toAirportCode = 'LAX';
    component.toAirportInput = 'Los Angeles International (LAX)';
    component.toAirportName = 'Los Angeles International';

    component.swapAirports();

    expect(component.fromAirportCode).toBe('LAX');
    expect(component.fromAirportInput).toBe('Los Angeles International (LAX)');
    expect(component.fromAirportName).toBe('Los Angeles International');
    expect(component.toAirportCode).toBe('ATL');
    expect(component.toAirportInput).toBe('Atlanta International (ATL)');
    expect(component.toAirportName).toBe('Atlanta International');
  });

  it('should get correct stop text', () => {
    expect(component.getStopText(0)).toBe('Direct ✈️');
    expect(component.getStopText(1)).toBe('1 Stop');
    expect(component.getStopText(3)).toBe('3 Stops');
  });

  it('should get correct stop class', () => {
    expect(component.getStopClass(0)).toBe('direct');
    expect(component.getStopClass(1)).toBe('one-stop');
    expect(component.getStopClass(3)).toBe('multi-stop');
  });

  it('should apply sorting', () => {
    component.results = [
      { airline: 'Delta', price: '$500', duration: '5h 30m', stops: 0 },
      { airline: 'United', price: '$300', duration: '6h 00m', stops: 1 },
      { airline: 'American', price: '$400', duration: '4h 45m', stops: 0 }
    ];

    component.sortOption = 'price-asc';
    component.applySort();
    expect(component.filteredResults[0].price).toBe('$300');
    expect(component.filteredResults[1].price).toBe('$400');
    expect(component.filteredResults[2].price).toBe('$500');

    component.sortOption = 'duration-asc';
    component.applySort();
    expect(component.filteredResults[0].duration).toBe('4h 45m');

    component.sortOption = 'stops-asc';
    component.applySort();
    expect(component.filteredResults[0].stops).toBe(0);
    expect(component.filteredResults[2].stops).toBe(1);

    component.sortOption = 'airline-asc';
    component.applySort();
    expect(component.filteredResults[0].airline).toBe('American');
  });

  it('should parse price correctly', () => {
    expect(component.parsePrice('$1,234')).toBe(1234);
    expect(component.parsePrice('$500')).toBe(500);
    expect(component.parsePrice('')).toBe(999999);
  });

  it('should parse duration correctly', () => {
    expect(component.parseDuration('5h 30m')).toBe(330);
    expect(component.parseDuration('6h 00m')).toBe(360);
    expect(component.parseDuration('')).toBe(999999);
  });
});
