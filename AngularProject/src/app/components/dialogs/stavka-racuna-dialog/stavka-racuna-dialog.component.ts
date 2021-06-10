import { StavkaRacunaService } from './../../../services/stavka-racuna.service';
import { ProizvodService } from 'src/app/services/proizvodservice';
import { StavkaRacuna } from 'src/app/models/stavkaRacuna';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvod } from 'src/app/models/proizvod';

@Component({
  selector: 'app-stavka-racuna-dialog',
  templateUrl: './stavka-racuna-dialog.component.html',
  styleUrls: ['./stavka-racuna-dialog.component.css']
})
export class StavkaRacunaDialogComponent implements OnInit {

  proizvod: Proizvod[];
  public flag: number;


  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<StavkaRacunaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StavkaRacuna,
    public stavkaRacunaService: StavkaRacunaService,
    public proizvodService: ProizvodService) { }

  ngOnInit(): void {
    this.proizvodService.getAllProizvodi()
      .subscribe(proizvod => {
        this.proizvod = proizvod;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      };
  }

  compareTo(a: any, b: any) {
    return a.id === b.id
  }

  public add(): void {
    this.stavkaRacunaService.addStavkaRacuna(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspesno dodata stavka racuna.', 'U redu',
          {
            duration: 2500
          });
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greska.', 'Zatvori',
          {
            duration: 1000
          });
      };
  }
  public update(): void {
    this.stavkaRacunaService.updateStavkaRacuna(this.data)
      .subscribe(() => {
        this.snackBar.open('Uspesno modifikovana stavka racuna', 'U redu', {
          duration: 2500
        });
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greska.', 'Zatvori',
          {
            duration: 1000
          });
      };

  }

  public delete(): void {
    this.stavkaRacunaService.deleteStavkaRacuna(this.data.id)
      .subscribe(() => {
        this.snackBar.open('Uspesno obrisana stavka racuna', 'U redu',
          {
            duration: 2500
          });
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
        this.snackBar.open('Dogodila se greska.', 'Zatvori',
          {
            duration: 1000
          });
      };
  }
  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'Zatvori', {
      duration: 2500
    });
  }

}
