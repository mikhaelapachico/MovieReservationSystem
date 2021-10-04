import { Component, OnInit} from '@angular/core';
import { MovieInfoResponse } from '../DTO/MovieInfoResponse';
import { MovieServiceService } from '../service/movie-service/movie-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Movie Reservation';
  MovieService: MovieServiceService;

  get ShowList(): boolean{
    return this.MovieService.ShowList;
  }

  constructor(private movieService: MovieServiceService) {
    this.MovieService = movieService;
  }

  ngOnInit(){
    this.MovieService.ShowList = true;
    this.MovieService.apiGetMovieInfoResponse().subscribe(data => {
      this.MovieService.MovieInfoResponse = data
    });
  }

}
