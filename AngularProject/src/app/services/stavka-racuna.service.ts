import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAVKA_RACUNA_URL, STAVKE_ZA_RACUNE_URL } from '../app.constants';
import { StavkaRacuna } from '../models/stavkaRacuna';

@Injectable({
  providedIn: 'root'
})
export class StavkaRacunaService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaRacune(idRacuna: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_ZA_RACUNE_URL}/${idRacuna}`);
  }

  public addStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    stavkaRacuna.id = 0;
    return this.httpClient.post(`${STAVKA_RACUNA_URL}`, stavkaRacuna);
  }

  public updateStavkaRacuna(stavkaRacuna: StavkaRacuna): Observable<any> {
    return this.httpClient.put(`${STAVKA_RACUNA_URL}`, stavkaRacuna);
  }

  public deleteStavkaRacuna(id: number): Observable<any> {
    return this.httpClient.delete(`${STAVKA_RACUNA_URL}/${id}`);
  }
}
