import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from '../movie-list/movie-list.component';
import { MovieSeatingComponent } from '../movie-seating/movie-seating.component';

const routes: Routes = [
  {path:'Movie',component:MovieListComponent},
  {path:'Booking',component:MovieSeatingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
