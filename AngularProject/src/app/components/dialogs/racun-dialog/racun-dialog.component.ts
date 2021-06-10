import { Racun } from './../../../models/racun';
import { RacunService } from './../../../services/racunservice';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'


@Component({
  selector: 'app-racun-dialog',
  templateUrl: './racun-dialog.component.html',
  styleUrls: ['./racun-dialog.component.css']
})
export class RacunDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RacunDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Racun,
              public RacunService: RacunService) { }

  ngOnInit(): void {
  }
  public addRacun(): void {
    this.RacunService.addRacun(this.data).subscribe(() => {
      this.snackBar.open('Uspesno dodat artikl: '+this.data.nacinPlacanja, 'OK', {duration:2500});
    }), (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori', {duration:2500});
    };


}
public updateRacun(): void {
    this.RacunService.updateRacun(this.data)
    .subscribe(data => {
      this.snackBar.open('Uspesno modifikova: ' + data.nacinPlacanja, 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori', {duration:2500});
    };
}
public deleteRacun(): void {
  this.RacunService.deleteRacun(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisan racun', 'U redu', {
      duration:2500
    });
  }),
  (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori', {duration:2500});
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
