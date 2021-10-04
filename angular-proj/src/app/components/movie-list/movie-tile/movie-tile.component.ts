import { Component, Inject, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/DTO/Movie';
import { MovieInfoResponse } from 'src/app/DTO/MovieInfoResponse';
import { MovieServiceService } from '../../../service/movie-service/movie-service.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-movie-tile',
  templateUrl: './movie-tile.component.html',
  styleUrls: ['./movie-tile.component.scss']
})
export class MovieTileComponent implements OnInit {
  
  get MovieList(): Array<Movie> {
    return this.MovieService.MovieInfoResponse.MovieList;
  }

  private movieList: Array<Movie>;
  MovieService: MovieServiceService;


  constructor(@Inject(AppComponent) private appComponent: AppComponent) {
    this.MovieService = appComponent.MovieService;
    this.movieList = new Array<Movie>();
    
   }

  ngOnInit(): void {
  }

  EditMovie(item: Movie) {
    this.MovieService.IsAdding = false;
    this.MovieService.IsEditing = true;
    this.MovieService.CurrentEditingItem = item;
  }

  ScheduleClick(MovieID: number, ShowID: number){
    this.MovieService.ShowList = false;
    this.MovieService.CurrentSchedId = ShowID;
    this.MovieService.CurrentMovieId = MovieID;
  }

  GetAvailableSeats(movieId: number){
    let movieList = this.MovieService.MovieInfoResponse.MovieList;
    let currentmovieInfo = movieList.find(x => x.MovieID == movieId)?.MovieSchedule;

    var reservedSeatCount = 0;
    var totalShowSeats = 0;
    currentmovieInfo?.forEach(sched => {
       sched.ShowBookingList.forEach(booking => {
         if(booking.BookingStatus == 1){
          reservedSeatCount = booking.BookingSeats.length + reservedSeatCount;
         }
       });

       totalShowSeats = sched.ShowSeats + totalShowSeats;
    });
    
    return totalShowSeats - reservedSeatCount;
  }

}
