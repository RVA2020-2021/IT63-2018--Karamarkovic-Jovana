import { ProizvodjacService } from './../../../services/proizvodjac.service';
import { Proizvod } from './../../../models/proizvod';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodService } from 'src/app/services/proizvodservice';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-proizvod-dialog',
  templateUrl: './proizvod-dialog.component.html',
  styleUrls: ['./proizvod-dialog.component.css']
})
export class ProizvodDialogComponent implements OnInit, OnDestroy {

  proizvodjaci: Proizvodjac[];
  public flag: number;
  proizvodjaciSubscribe: Subscription;

  constructor(public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<ProizvodDialogComponent>,
    @Inject (MAT_DIALOG_DATA) public data: Proizvod,
              public proizvodService: ProizvodService, 
              public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {
      this.proizvodService.getAllProizvodi()
      .subscribe(proizvodjaci => {
        this.proizvodjaci = proizvodjaci
      }),
      (error: Error) => {
        console.log(error.name+' '+error.message);
      }  
      }
  ngOnDestroy(): void {
    this.proizvodjaciSubscribe.unsubscribe();
  }

  compareTo(a:any, b:any) {
    return a.id == b.id;
  }

  public addProizvod(): void {
    this.proizvodService.addProizvod(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat proizvod: '+this.data.naziv, 'OK',
       {duration:2500});
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja proizvoda', 'Zatvori', 
      {duration:2500});
    };
  }

    public updateProizvod(): void {
      this.proizvodService.updateProizvod(this.data)
      .subscribe(data => {
        this.snackBar.open('Uspesno modifikovan proizvod: ' + data.naziv, 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name+' '+error.message);
        this.snackBar.open('Doslo je do greske prilikom modifikovanja proizvoda', 'Zatvori',
         {duration:2500});
      };
  }
  public deleteProizvod(): void {
    this.proizvodService.deleteProizvod(this.data.id)
    .subscribe(() => {
      this.snackBar.open('Uspesno obrisan proizvod', 'U redu', {
        duration:2500
      });
    }),
    (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom brisanja proizvoda', 'Zatvori', 
      {duration:2500});
    };
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste od izmena!', 'U redu', 
    {
      duration: 1000
    });
  }


}


