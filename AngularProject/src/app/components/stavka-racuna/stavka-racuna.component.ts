import { Observable } from 'rxjs';
import { StavkaRacunaService } from './../../services/stavka-racuna.service';
import { Proizvod } from './../../models/proizvod';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StavkaRacuna } from 'src/app/models/stavkaRacuna';
import { Racun } from 'src/app/models/racun';
import { MatDialog } from '@angular/material/dialog';
import { StavkaRacunaDialogComponent } from '../dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-stavka-racuna',
  templateUrl: './stavka-racuna.component.html',
  styleUrls: ['./stavka-racuna.component.css']
})
export class StavkaRacunaComponent implements OnInit, OnChanges {

  displayedColumns = ['id', 'redniBroj', 'kolicina', 'jedinicaMere', 'cena',  'racun', 'proizvod', 'actions'];
  dataSource: MatTableDataSource<StavkaRacuna>;
  @Input() selektovanRacun: Racun;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  //selektovanProizvod: Proizvod;
  

  constructor(private stavkaRacunaService: StavkaRacunaService, 
              private dialogs: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnChanges(): void {
    if(this.selektovanRacun) {
      this.loadData();
    }
  }
  public loadData() {
    this.stavkaRacunaService.getStavkeZaRacune(this.selektovanRacun.id)
    .subscribe(data => {
      console.log("Dobijene stavke racuna:" + data);
      this.dataSource = new MatTableDataSource(data);

         // pretraga po nazivu ugnježdenog objekta
         this.dataSource.filterPredicate = (data:any, filter: string) => {
          const accumulator = (currentTerm:any, key:any) => {
            return key === 'proizvod' ? currentTerm + data.proizvod.naziv : currentTerm +data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
          // sortiranje po nazivu ugnježdenog objekta
          this.dataSource.sortingDataAccessor = (data:any, property) => {
            switch (property) {
              case 'proizvod': return data.proizvod.naziv.toLocaleLowerCase();
              default: return data[property];
            }
          };
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
    }),
    (error: Error) => {
      console.log(error.name + ' ' + error.message);
    }
    
  }

  public openDialog(flag:number, id?: number, redniBroj?: number, kolicina?: number, jedinicaMere?: string,
    cena?: number, racun?: Racun, proizvod?: Proizvod){
          const dialogRef = this.dialogs.open(StavkaRacunaDialogComponent, {
            data: {id, redniBroj, kolicina, jedinicaMere, cena, racun, proizvod}
          });
          dialogRef.componentInstance.flag=flag;  
          if(flag===1) {
            dialogRef.componentInstance.data.racun = this.selektovanRacun;
          }
          dialogRef.afterClosed()
          .subscribe(result => {
            if(result === 1) {
              this.loadData();
            }
          })
    }
    applyFilter(filterValue: string){
      filterValue = filterValue.trim();
      filterValue = filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }
} 
