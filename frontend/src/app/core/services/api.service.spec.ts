import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch dashboard stats', () => {
    const mockStats = {
      total_airports: 5911,
      total_airlines: 5852,
      total_routes: 64360,
      total_countries: 240
    };

    service.getDashboardStats().subscribe(data => {
      expect(data).toEqual(mockStats);
    });

    // FIX: Add trailing slash to match the actual request
    const req = httpMock.expectOne('http://localhost:8000/api/dashboard/');
    expect(req.request.method).toBe('GET');
    req.flush(mockStats);
  });

  it('should fetch airports with params', () => {
    const mockAirports = { total: 1, items: [{ airport_id: 1, name: 'ATL' }] };
    const params = { search: 'ATL', country: 'US' };

    service.getAirports(params).subscribe(data => {
      expect(data).toEqual(mockAirports);
    });

    // FIX: Add trailing slash and include query params in the matcher
    const req = httpMock.expectOne(
      (req) => req.url === 'http://localhost:8000/api/airports/' &&
               req.params.get('search') === 'ATL' &&
               req.params.get('country') === 'US'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockAirports);
  });

  it('should fetch countries', () => {
    const mockCountries = [{ iso_code: 'US', name: 'United States' }];

    service.getCountries().subscribe(data => {
      expect(data).toEqual(mockCountries);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/airports/countries');
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should fetch top airlines', () => {
    const mockTopAirlines = [
      { name: 'Delta', value: 883 },
      { name: 'United', value: 871 }
    ];

    service.getTopAirlines().subscribe(data => {
      expect(data).toEqual(mockTopAirlines);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/dashboard/top-airlines');
    expect(req.request.method).toBe('GET');
    req.flush(mockTopAirlines);
  });

  it('should fetch fleet data', () => {
    const mockFleet = { items: [{ icao_code: 'B738', count: 4567 }] };

    service.getFleet().subscribe(data => {
      expect(data).toEqual(mockFleet);
    });

    // FIX: Add trailing slash
    const req = httpMock.expectOne('http://localhost:8000/api/fleet/');
    expect(req.request.method).toBe('GET');
    req.flush(mockFleet);
  });

  it('should fetch routes', () => {
    const mockRoutes = { total: 2, items: [{ route_id: 1, stops: 0 }] };

    service.getRoutes({ limit: 10 }).subscribe(data => {
      expect(data).toEqual(mockRoutes);
    });

    // FIX: Add trailing slash and check query params
    const req = httpMock.expectOne(
      (req) => req.url === 'http://localhost:8000/api/routes/' &&
               req.params.get('limit') === '10'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRoutes);
  });
});
