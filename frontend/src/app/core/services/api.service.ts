import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/`);   
  }

  getTopAirlines(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/top-airlines`);
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
}
