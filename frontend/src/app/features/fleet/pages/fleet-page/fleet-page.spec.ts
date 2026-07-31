import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FleetPage } from './fleet-page';
import { ApiService } from '../../../../core/services/api.service';
import { FormsModule } from '@angular/forms';

describe('FleetPage', () => {
  let component: FleetPage;
  let fixture: ComponentFixture<FleetPage>;
  let mockApiService: any;

  const mockFleetData = {
    items: [
      { icao_code: 'B738', name: 'Boeing 737-800', count: 4567, operators: 120, registrations: 5678, active: 4234 },
      { icao_code: 'A320', name: 'Airbus A320', count: 3891, operators: 98, registrations: 4321, active: 3567 },
      { icao_code: 'B788', name: 'Boeing 787-8', count: 1234, operators: 45, registrations: 1567, active: 1123 }
    ]
  };

  beforeEach(async () => {
    mockApiService = {
      getFleet: jest.fn().mockReturnValue(of(mockFleetData))
    };

    await TestBed.configureTestingModule({
      imports: [FleetPage, FormsModule],
      providers: [
        { provide: ApiService, useValue: mockApiService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FleetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load fleet data on init', () => {
    expect(mockApiService.getFleet).toHaveBeenCalled();
    expect(component.aircraftTypes.length).toBe(3);
    expect(component.filteredAircraft.length).toBe(3);
  });

  it('should filter fleet by search query (name)', () => {
    component.aircraftTypes = mockFleetData.items;
    component.searchQuery = 'Boeing';
    component.applyFilters();
    expect(component.filteredAircraft.length).toBe(2);
    expect(component.filteredAircraft[0].name).toContain('Boeing');
  });

  it('should filter fleet by search query (icao_code)', () => {
    component.aircraftTypes = mockFleetData.items;
    component.searchQuery = 'A320';
    component.applyFilters();
    expect(component.filteredAircraft.length).toBe(1);
    expect(component.filteredAircraft[0].icao_code).toBe('A320');
  });

  it('should sort by count descending', () => {
    component.aircraftTypes = mockFleetData.items;
    component.sortOption = 'count-desc';
    component.applyFilters();
    expect(component.filteredAircraft[0].count).toBe(4567);
    expect(component.filteredAircraft[1].count).toBe(3891);
    expect(component.filteredAircraft[2].count).toBe(1234);
  });

  it('should sort by count ascending', () => {
    component.aircraftTypes = mockFleetData.items;
    component.sortOption = 'count-asc';
    component.applyFilters();
    expect(component.filteredAircraft[0].count).toBe(1234);
    expect(component.filteredAircraft[1].count).toBe(3891);
    expect(component.filteredAircraft[2].count).toBe(4567);
  });

  it('should sort by operators descending', () => {
    component.aircraftTypes = mockFleetData.items;
    component.sortOption = 'operators-desc';
    component.applyFilters();
    expect(component.filteredAircraft[0].operators).toBe(120);
    expect(component.filteredAircraft[1].operators).toBe(98);
    expect(component.filteredAircraft[2].operators).toBe(45);
  });

  it('should sort by active descending', () => {
    component.aircraftTypes = mockFleetData.items;
    component.sortOption = 'active-desc';
    component.applyFilters();
    expect(component.filteredAircraft[0].active).toBe(4234);
    expect(component.filteredAircraft[1].active).toBe(3567);
    expect(component.filteredAircraft[2].active).toBe(1123);
  });

  it('should clear filters', () => {
    component.aircraftTypes = mockFleetData.items;
    component.searchQuery = 'Boeing';
    component.sortOption = 'count-asc';
    component.clearFilters();
    expect(component.searchQuery).toBe('');
    expect(component.sortOption).toBe('count-desc');
    expect(component.filteredAircraft).toEqual(mockFleetData.items);
  });

  it('should calculate total aircraft count', () => {
    component.aircraftTypes = mockFleetData.items;
    const total = component.getTotalAircraft();
    expect(total).toBe(4567 + 3891 + 1234);
  });

  it('should calculate total operators', () => {
    component.aircraftTypes = mockFleetData.items;
    const total = component.getTotalOperators();
    expect(total).toBe(120 + 98 + 45);
  });

  it('should calculate total registrations', () => {
    component.aircraftTypes = mockFleetData.items;
    const total = component.getTotalRegistrations();
    expect(total).toBe(5678 + 4321 + 1567);
  });

  it('should calculate percentage correctly', () => {
    component.aircraftTypes = mockFleetData.items;
    const percentage = component.getPercentage(4567);
    const total = component.getTotalAircraft();
    expect(percentage).toBe((4567 / total) * 100);
  });
});
