import { Proizvod } from './proizvod';
import { Racun } from './racun';
export class StavkaRacuna{
    id: number;
    redniBroj: number;
    kolicina: number;
    jedinicaMere: string;
    cena: number;
    racun: Racun;
    proizvod: Proizvod;
}