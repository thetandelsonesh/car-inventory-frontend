import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // apiURL: string = 'http://localhost/car_inventory/api';
  apiURL: string = 'https://car-inventory-codemax.000webhostapp.com/api';

  constructor(private httpClient: HttpClient) { }

  public getManufacturers() {
    return this.httpClient.get(`${this.apiURL}/manufacturer`);
  }

  public addManufacturer(data) {
    return this.httpClient.post(`${this.apiURL}/manufacturer`, data);
  }
  
  public addCarModel(data) {
    return this.httpClient.post(`${this.apiURL}/car`, data);
  }

  public getCarModels(page) {
    return this.httpClient.get(`${this.apiURL}/car/${page}`);
  }

  public MarkAsSold(id) {
    return this.httpClient.delete(`${this.apiURL}/car/${id}`,);
  }
}
