import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './_routing/app-routing.module';
import { AppComponent } from './app.component';
import { MovieFormComponent } from './movie-list/movie-form/movie-form.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieSeatingComponent } from './movie-seating/movie-seating.component';
import { MovieTileComponent } from './movie-list/movie-tile/movie-tile.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieServiceService } from '../service/movie-service/movie-service.service';

@NgModule({
  declarations: [
    AppComponent,
    MovieFormComponent,
    MovieListComponent,
    MovieSeatingComponent,
    MovieTileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    ],
  providers: [MovieServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
