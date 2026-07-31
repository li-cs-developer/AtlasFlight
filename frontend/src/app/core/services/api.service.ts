import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/`);  
  }

  // Airports
  getAirports(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/airports/`, { params });
  }

  getAirportByIATA(iata: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/airports/${iata}`);
  }

  getCountries(): Observable<any> {
    return this.http.get(`${this.apiUrl}/airports/countries`);
  }

  // Airlines
  getAirlines(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/airlines/`, { params });
  }

  // Routes
  getRoutes(params?: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/routes/`, { params });
  }

  // Fleet
  getFleet(): Observable<any> {
    return this.http.get(`${this.apiUrl}/fleet/`);
  }

  // Route Finder - find routes between airports
  findRoutes(from: string, to: string): Observable<any[]> {
    const params = new HttpParams()
      .set('from', from)
      .set('to', to);
    return this.http.get<any[]>(`${this.apiUrl}/routes/find`, { params });
  }

  getTopAirlines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/top-airlines`);
  }
}
