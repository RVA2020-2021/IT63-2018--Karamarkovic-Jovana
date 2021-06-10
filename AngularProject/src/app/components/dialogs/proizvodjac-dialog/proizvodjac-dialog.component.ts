import { ProizvodjacService } from './../../../services/proizvodjac.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proizvodjac } from 'src/app/models/proizvodjac';

@Component({
  selector: 'app-proizvodjac-dialog',
  templateUrl: './proizvodjac-dialog.component.html',
  styleUrls: ['./proizvodjac-dialog.component.css']
})
export class ProizvodjacDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ProizvodjacDialogComponent>,
              @Inject (MAT_DIALOG_DATA) public data: Proizvodjac,
              public proizvodjacService: ProizvodjacService) { }

  ngOnInit(): void {
  }

  public addProizvodjac(): void {
    this.proizvodjacService.addProizvodjac(this.data)
    .subscribe(() => {
      this.snackBar.open('Uspesno dodat proizvodjac: '+this.data.naziv, 'U redu',
       {duration:2500
      });
    }), 
    (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja proizvodjaca', 'Zatvori',
       {duration:1000});
    };


}
public updateProizvodjac(): void {
    this.proizvodjacService.updateProizvodjac(this.data)
    .subscribe(data => {
      this.snackBar.open('Uspesno modifikov proizvodjac: ' + this.data.naziv, 'U redu', {
        duration: 2500
      });
    }),
    (error: Error) => {
      console.log(error.name+' '+error.message);
      this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori', 
      {duration:1000});
    };
}
public deleteProizvodjac(): void {
  this.proizvodjacService.deleteProizvodjac(this.data.id)
  .subscribe(() => {
    this.snackBar.open('Uspesno obrisan proizvodjac', 'U redu', {
      duration:2500
    });
  }),
  (error: Error) => {
    console.log(error.name+' '+error.message);
    this.snackBar.open('Doslo je do greske prilikom dodavanja racuna', 'Zatvori',
     {duration:1000});
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
