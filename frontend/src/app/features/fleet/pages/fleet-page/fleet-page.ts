import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fleet-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fleet-page.html',
  styleUrls: ['./fleet-page.scss']
})
export class FleetPage implements OnInit {

  aircraftTypes: any[] = [];

  ngOnInit() {
    this.aircraftTypes = [
      // Boeing
      { icao: 'B737', name: 'Boeing 737-700', count: 1234, airlines: 112, range: '2,350 mi' },
      { icao: 'B738', name: 'Boeing 737-800', count: 4567, airlines: 245, range: '2,935 mi' },
      { icao: 'B739', name: 'Boeing 737-900ER', count: 876, airlines: 45, range: '3,100 mi' },
      { icao: 'B763', name: 'Boeing 767-300ER', count: 678, airlines: 34, range: '3,900 mi' },
      { icao: 'B764', name: 'Boeing 767-400ER', count: 89, airlines: 12, range: '4,500 mi' },
      { icao: 'B772', name: 'Boeing 777-200', count: 2234, airlines: 89, range: '5,240 mi' },
      { icao: 'B773', name: 'Boeing 777-300ER', count: 567, airlines: 45, range: '6,014 mi' },
      { icao: 'B787', name: 'Boeing 787 Dreamliner', count: 989, airlines: 45, range: '7,635 mi' },
      { icao: 'B787-9', name: 'Boeing 787-9', count: 345, airlines: 23, range: '7,635 mi' },
      { icao: 'B747', name: 'Boeing 747-400', count: 278, airlines: 23, range: '7,285 mi' },
      // Airbus
      { icao: 'A319', name: 'Airbus A319', count: 1456, airlines: 78, range: '3,750 mi' },
      { icao: 'A320', name: 'Airbus A320', count: 3891, airlines: 210, range: '3,300 mi' },
      { icao: 'A321', name: 'Airbus A321', count: 2345, airlines: 156, range: '3,200 mi' },
      { icao: 'A330', name: 'Airbus A330-300', count: 1456, airlines: 78, range: '6,350 mi' },
      { icao: 'A330-200', name: 'Airbus A330-200', count: 567, airlines: 34, range: '7,250 mi' },
      { icao: 'A340', name: 'Airbus A340-600', count: 123, airlines: 12, range: '7,500 mi' },
      { icao: 'A350', name: 'Airbus A350-900', count: 567, airlines: 23, range: '8,100 mi' },
      { icao: 'A350-1000', name: 'Airbus A350-1000', count: 234, airlines: 15, range: '8,700 mi' },
      { icao: 'A380', name: 'Airbus A380', count: 251, airlines: 14, range: '8,000 mi' },
      // Regional Jets
      { icao: 'CRJ9', name: 'Bombardier CRJ900', count: 789, airlines: 56, range: '1,550 mi' },
      { icao: 'E175', name: 'Embraer E175', count: 567, airlines: 34, range: '2,150 mi' },
      { icao: 'E190', name: 'Embraer E190', count: 345, airlines: 23, range: '2,400 mi' },
      { icao: 'E195', name: 'Embraer E195', count: 234, airlines: 18, range: '2,600 mi' },
      // Narrow-body
      { icao: 'A220', name: 'Airbus A220-300', count: 345, airlines: 12, range: '3,350 mi' },
      { icao: 'B38M', name: 'Boeing 737 MAX 8', count: 456, airlines: 34, range: '3,550 mi' },
      { icao: 'B39M', name: 'Boeing 737 MAX 9', count: 123, airlines: 8, range: '3,550 mi' },
      // Cargo (for flavor)
      { icao: 'B748F', name: 'Boeing 747-8F Cargo', count: 45, airlines: 6, range: '4,390 mi' },
      { icao: 'B77F', name: 'Boeing 777F Cargo', count: 67, airlines: 8, range: '4,900 mi' },
      { icao: 'A330F', name: 'Airbus A330-200F Cargo', count: 34, airlines: 5, range: '4,000 mi' },
      { icao: 'B763F', name: 'Boeing 767-300F Cargo', count: 89, airlines: 12, range: '3,200 mi' }
    ];
  }

  getTotalAircraft(): number {
    return this.aircraftTypes.reduce((sum, type) => sum + type.count, 0);
  }

  getPercentage(count: number): number {
    const total = this.getTotalAircraft();
    return (count / total) * 100;
  }
}
