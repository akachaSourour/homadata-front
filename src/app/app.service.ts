import { Injectable } from '@angular/core';
import {environment} from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getEstimation(data){
    return this.http.post<any>(this.apiUrl + '/house/estimate', data);
  }
}
