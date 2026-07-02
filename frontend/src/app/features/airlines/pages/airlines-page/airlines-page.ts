import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-airlines-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './airlines-page.html',
  styleUrls: ['./airlines-page.scss']
})
export class AirlinesPage implements OnInit {

  airlines: any[] = [];

  ngOnInit() {
    this.airlines = [
      // North America
      { name: 'American Airlines', iata: 'AA', country: 'United States', fleet: 945, active: true },
      { name: 'Delta Air Lines', iata: 'DL', country: 'United States', fleet: 883, active: true },
      { name: 'United Airlines', iata: 'UA', country: 'United States', fleet: 871, active: true },
      { name: 'Southwest Airlines', iata: 'WN', country: 'United States', fleet: 733, active: true },
      { name: 'Air Canada', iata: 'AC', country: 'Canada', fleet: 200, active: true },
      { name: 'Alaska Airlines', iata: 'AS', country: 'United States', fleet: 231, active: true },
      { name: 'JetBlue Airways', iata: 'B6', country: 'United States', fleet: 282, active: true },
      { name: 'WestJet', iata: 'WS', country: 'Canada', fleet: 114, active: true },
      // Europe
      { name: 'British Airways', iata: 'BA', country: 'United Kingdom', fleet: 276, active: true },
      { name: 'Lufthansa', iata: 'LH', country: 'Germany', fleet: 276, active: true },
      { name: 'Air France', iata: 'AF', country: 'France', fleet: 211, active: true },
      { name: 'KLM Royal Dutch Airlines', iata: 'KL', country: 'Netherlands', fleet: 156, active: true },
      { name: 'Ryanair', iata: 'FR', country: 'Ireland', fleet: 582, active: true },
      { name: 'easyJet', iata: 'U2', country: 'United Kingdom', fleet: 326, active: true },
      { name: 'Turkish Airlines', iata: 'TK', country: 'Turkey', fleet: 346, active: true },
      { name: 'Swiss International', iata: 'LX', country: 'Switzerland', fleet: 90, active: true },
      // Asia Pacific
      { name: 'Emirates', iata: 'EK', country: 'UAE', fleet: 269, active: true },
      { name: 'Singapore Airlines', iata: 'SQ', country: 'Singapore', fleet: 155, active: true },
      { name: 'Qantas', iata: 'QF', country: 'Australia', fleet: 132, active: true },
      { name: 'Japan Airlines', iata: 'JL', country: 'Japan', fleet: 166, active: true },
      { name: 'Cathay Pacific', iata: 'CX', country: 'Hong Kong', fleet: 153, active: true },
      { name: 'Air China', iata: 'CA', country: 'China', fleet: 430, active: true },
      { name: 'China Southern', iata: 'CZ', country: 'China', fleet: 620, active: true },
      { name: 'China Eastern', iata: 'MU', country: 'China', fleet: 580, active: true },
      { name: 'Korean Air', iata: 'KE', country: 'South Korea', fleet: 166, active: true },
      { name: 'Thai Airways', iata: 'TG', country: 'Thailand', fleet: 80, active: true },
      { name: 'Air New Zealand', iata: 'NZ', country: 'New Zealand', fleet: 52, active: true },
      // Middle East & Africa
      { name: 'Etihad Airways', iata: 'EY', country: 'UAE', fleet: 99, active: true },
      { name: 'Qatar Airways', iata: 'QR', country: 'Qatar', fleet: 200, active: true },
      // South America
      { name: 'LATAM Airlines', iata: 'LA', country: 'Chile', fleet: 140, active: true }
    ];
  }
}
