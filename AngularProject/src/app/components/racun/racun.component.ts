import { MatPaginator } from '@angular/material/paginator';
import { RacunDialogComponent } from './../dialogs/racun-dialog/racun-dialog.component';
import { RacunService } from './../../services/racunservice';
import { Racun } from './../../models/racun';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-racun',
  templateUrl: './racun.component.html',
  styleUrls: ['./racun.component.css']
})
export class RacunComponent implements OnInit, OnDestroy {

  displayedColumns = ['id', 'datum', 'nacinPlacanja', 'actions'];
  dataSource: MatTableDataSource<Racun>;
  selektovanRacun: Racun;
  subscription: Subscription;
  @ViewChild(MatSort, {static: false}) sort:MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  constructor(private racunServise: RacunService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  public loadData() {
    this.subscription = this.racunServise.getAllRacuni()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

      }),
      (error: Error) => {
        console.log(error.name + ' ' + error.message);
      }

  }
  public openDialog(flag: number, id?: number, datum?: Date, nacinPlacanja?: string) {
    const dialogRef = this.dialog.open(RacunDialogComponent, { data: { id, datum, nacinPlacanja } });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed()
      .subscribe(result => {
        if (result === 1) {
          this.loadData();
        }
      })
  }
  selectRow(row: any) {
    // console.log(row);
    this.selektovanRacun = row;
    console.log(this.selektovanRacun);
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;

  }
}