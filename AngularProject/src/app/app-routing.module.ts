import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/core/about/about.component';
import { AuthorComponent } from './components/core/author/author.component';
import { HomeComponent } from './components/core/home/home.component';
import { ProizvodComponent } from './components/proizvod/proizvod.component';
import { ProizvodjacComponent } from './components/proizvodjac/proizvodjac.component';
import { RacunComponent } from './components/racun/racun.component';

const routes: Routes = [
  { path: 'proizvod', component: ProizvodComponent },
  { path: 'proizvodjac', component: ProizvodjacComponent },
  { path: 'racun', component: RacunComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'author', component: AuthorComponent },
  { path:'', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
