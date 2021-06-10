import { ViewChild } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Proizvodjac } from 'src/app/models/proizvodjac';
import { ProizvodjacService } from 'src/app/services/proizvodjac.service';
import { ProizvodjacDialogComponent } from '../dialogs/proizvodjac-dialog/proizvodjac-dialog.component';

@Component({
  selector: 'app-proizvodjac',
  templateUrl: './proizvodjac.component.html',
  styleUrls: ['./proizvodjac.component.css']
})
export class ProizvodjacComponent implements OnInit, OnDestroy{

  displayedColumns = ['id', 'adresa', 'kontakt','naziv', 'actions'];
  dataSource: MatTableDataSource<Proizvodjac>;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort:MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private proizvodjacService: ProizvodjacService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public loadData() {
    this.subscription = this.proizvodjacService.getAllProizvodjaci()
      .subscribe(data => {
       //console.log(data);
       this.dataSource= new MatTableDataSource(data);
       this.dataSource.sort = this.sort;
       this.dataSource.paginator = this.paginator;
      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

  }
  public openDialog(flag: number, id?: number,adresa?: string, kontakt?: string, naziv?:string) {
    const dialogRef = this.dialog.open(ProizvodjacDialogComponent, {data: {id, adresa, kontakt, naziv}});
    dialogRef.componentInstance.flag = flag; 
    dialogRef.afterClosed()
    .subscribe(result => {
      if(result===1) {
        this.loadData();
      }
    })
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;

  }

}
