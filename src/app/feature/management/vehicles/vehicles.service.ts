import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Vehicle } from './vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehiclesService {
  endpoint: string = `vehicles`;
  url: string = environment.apiUrl + `/${this.endpoint}`;
  constructor(private http: HttpClient) {}

  addvehicle(vehicle: Vehicle) {
    return this.http.post(this.url, vehicle);
  }

  getVehicle(id: string) {
    const params = new HttpParams().append(`id`, id);
    return this.http.get(this.url, { params });
  }

  getVehicles() {
    return this.http.get(this.url);
  }

  updateVehicle(id: string, vehicle: Partial<Vehicle>) {
    const params = new HttpParams().append(`id`, id);
    return this.http.put(this.url, vehicle, { params });
  }

  deleteVehicle(id: string) {
    const params = new HttpParams().append(`id`, id);
    return this.http.delete(this.url, { params });
  }
}
