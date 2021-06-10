import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { AboutComponent } from './components/core/about/about.component';
import { RacunComponent } from './components/racun/racun.component';
import { ProizvodjacComponent } from './components/proizvodjac/proizvodjac.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { StavkaRacunaComponent } from './components/stavka-racuna/stavka-racuna.component';
import { RacunDialogComponent } from './components/dialogs/racun-dialog/racun-dialog.component';
import { FormsModule } from '@angular/forms';


import { ProizvodjacDialogComponent } from './components/dialogs/proizvodjac-dialog/proizvodjac-dialog.component';
import { ProizvodDialogComponent } from './components/dialogs/proizvod-dialog/proizvod-dialog.component';
import { StavkaRacunaDialogComponent } from './components/dialogs/stavka-racuna-dialog/stavka-racuna-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthorComponent,
    AboutComponent,
    RacunComponent,
    ProizvodjacComponent,
    ProizvodComponent,
    StavkaRacunaComponent,
    RacunDialogComponent,
    ProizvodjacDialogComponent,
    ProizvodDialogComponent,
    StavkaRacunaDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule, 
    MatSidenavModule, 
    MatListModule, 
    MatGridListModule, 
    MatExpansionModule,
    MatTableModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
