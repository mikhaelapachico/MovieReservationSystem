import { Component, Inject, OnInit } from '@angular/core';
import { MovieInfoResponse } from 'src/app/DTO/MovieInfoResponse';
import { MovieServiceService } from '../../service/movie-service/movie-service.service';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  get IsAdding(): boolean{
    return this.MovieService.IsAdding;
  }

  get IsEditing(): boolean {
    return this.MovieService.IsEditing;
  }
  MovieService: MovieServiceService;

  constructor(@Inject(AppComponent) private appComponent: AppComponent) {
      this.MovieService = appComponent.MovieService;
  }

  ngOnInit(): void {
  }

  AddMovie(){
    this.MovieService.IsAdding = true;
    this.MovieService.IsEditing = false;
  }

}
