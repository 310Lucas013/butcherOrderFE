import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {TokenStorageService} from '../token-storage/token-storage.service';
import {Observable} from 'rxjs';
import {LocationDto} from '../../model/location-dto';
import {Location} from '../../model/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  public bearerToken = '';

  public locationSource = environment.gatewayPath + '/locations';

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
      Authentication: this.bearerToken }),
  };

  constructor(private http: HttpClient, private tokenStorageService: TokenStorageService) {
    this.updateBearerToken();
  }

  createLocation(locationDto: LocationDto): Observable<Location> {
    this.updateBearerToken();
    return this.http.post<Location>(this.locationSource, locationDto, this.httpOptions);
  }

  getLocationById(locationId: number): Observable<Location> {
    this.updateBearerToken();
    return this.http.get<Location>(this.locationSource + '/' + locationId, this.httpOptions);
  }

  updateBearerToken(): void {
    this.bearerToken = this.tokenStorageService.getToken();
  }
}
