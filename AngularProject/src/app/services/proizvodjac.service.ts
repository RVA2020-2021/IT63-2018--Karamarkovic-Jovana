import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PROIZVODJAC_URL } from '../app.constants';
import { Proizvodjac } from '../models/proizvodjac';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(public httpClient: HttpClient) { }

  public getAllProizvodjaci(): Observable<any> {
    return this.httpClient.get(`${PROIZVODJAC_URL}`);

  }

  public addProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    proizvodjac.id=0;
   return  this.httpClient.post(`${PROIZVODJAC_URL}`, proizvodjac);
  }

  public updateProizvodjac(proizvodjac: Proizvodjac): Observable<any> {
    return this.httpClient.put(`${PROIZVODJAC_URL}`, proizvodjac);
  }

  public deleteProizvodjac(id: number): Observable<any> {
    return this.httpClient.delete(`${PROIZVODJAC_URL}/${id}`);
  }
}
