import { ProizvodService } from './../../services/proizvodservice';
import { Proizvod } from './../../models/proizvod';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodDialogComponent } from '../dialogs/proizvod-dialog/proizvod-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-proizvod',
  templateUrl: './proizvod.component.html',
  styleUrls: ['./proizvod.component.css']
})
export class ProizvodComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'naziv', 'proizvodjac', 'actions'];
  dataSource: MatTableDataSource<Proizvod>;
  selektovanProizvod: Proizvod;
  proizvodSubscription: Subscription;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private proizvodService: ProizvodService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }
  ngOnDestroy(): void {
    this.proizvodSubscription.unsubscribe();
  }

  public loadData() {
    this.proizvodSubscription = this.proizvodService.getAllProizvodi()
      .subscribe(data => {
       //console.log(data);
       this.dataSource= new MatTableDataSource(data);

       // pretraga po nazivu ugnježdenog objekta
       this.dataSource.filterPredicate = (data:any, filter: string) => {
        const accumulator = (currentTerm:any, key:any) => {
          return key === 'proizvodjac' ? currentTerm + data.proizvodjac.naziv : currentTerm +data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
        // sortiranje po nazivu ugnježdenog objekta
        this.dataSource.sortingDataAccessor = (data:any, property) => {
          switch (property) {
            case 'dobavljac': return data.proizvodjac.naziv.toLocaleLowerCase();
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
  public openDialog(flag: number, id?: number, naziv?:string, proizvodjac?: Proizvodjac) {
    const dialogRef = this.dialog.open(ProizvodDialogComponent, {data: {id,naziv,proizvodjac}});
    dialogRef.componentInstance.flag = flag; 
    dialogRef.afterClosed()
    .subscribe(result => {
      if(result===1) {
        this.loadData();
      }
    })
  }
  selectRow(row: any) {
    console.log(row);
    //this.selektovanProizvod= row;
    //console.log(this.selektovanProizvod);
  }
  applyFilter(filterValue: string){
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }
}
