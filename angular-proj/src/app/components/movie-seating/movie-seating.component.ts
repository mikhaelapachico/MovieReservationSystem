import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Booking } from 'src/app/DTO/Booking';
import { Movie } from 'src/app/DTO/Movie';
import { Schedule } from 'src/app/DTO/Schedule';
import { MovieServiceService } from 'src/app/service/movie-service/movie-service.service';
import { AppComponent } from '../app.component';

declare var $: any;

@Component({
  selector: 'app-movie-seating',
  templateUrl: './movie-seating.component.html',
  styleUrls: ['./movie-seating.component.scss']
})
export class MovieSeatingComponent implements OnInit {

  MovieService: MovieServiceService;
  // NumberOfSeats: number;
  // Seats: Array<number>;
  
  get NumberOfSeats(): Array<number> {
    return this.seats;
  }

  set NumberOfSeats(seats: Array<number>){
    this.seats = seats;
  }

  get SeatPrice(): number {
    return this.price;
  }

  set SeatPrice(value: number){
    this.price = value;
  }

  get MovieImage(): string {
    return this.image;
  }

  set MovieImage(value: string){
    this.image = value;
  }

  get MovieName(): string {
    return this.movieName;
  }

  set MovieName(value: string){
    this.movieName = value;
  }

  get MovieTime(): Date {
    return this.movieTime;
  }

  set MovieTime(value: Date){
    this.movieTime = value;
  }


  get TotalAmount(): number {
    return this.totalAmount;
  }

  set TotalAmount(value: number){
    this.totalAmount = value;
  }

  get formControls() {
    return this.BookingForm.controls;
  }

  get BookingHistory(): Array<Booking> {
    return this.bookingHistory;
  }

  set BookingHistory(value: Array<Booking>) {
    this.bookingHistory = value;
  }




  private seats: Array<number> = [];
  private price: number = 0.00;
  private image: string = "" ;
  private selectedSeats: Array<number> = [];
  private totalAmount: number = 0.00;
  private reservedSeats: Array<number> = [];
  private bookingHistory: Array<Booking> = [];
  private movieName: string = "";
  private movieTime: Date;
  BookingForm: FormGroup;

  constructor(@Inject(AppComponent) private appComponent: AppComponent) {
    this.MovieService = appComponent.MovieService;
    this.BookingForm = new FormGroup({});
    this.movieTime = new Date();
  }


  ngOnInit(): void {
    this.GetCurrentMovieSched();
    this.InitializeForm();

    setTimeout(() => {
      this.LoadReservedSeats();
    }, 100)

  }

  Cancel() {
    this.MovieService.ShowList = true;
  }

  Save() {
    let bookingInfo: Booking = new Booking();

    bookingInfo.BookingName = this.formControls['BookingName'].value;
    bookingInfo.BookingStatus = 1;
    bookingInfo.BookingAmount = this.TotalAmount;
    bookingInfo.BookingSeats = this.selectedSeats;

    let movieInfo: Movie = new Movie();
    let movieSched: Schedule = new Schedule();

    movieSched.ShowID = this.MovieService.CurrentSchedId;
    movieSched.ShowBookingList.push(bookingInfo);

    movieInfo.MovieID = this.MovieService.CurrentMovieId;
    movieInfo.MovieSchedule.push(movieSched);  
    
    this.MovieService.apiSaveBookingInfo(movieInfo).subscribe(data => {
      this.MovieService.MovieInfoResponse = data;
      this.Cancel();
    });
  }

  LoadReservedSeats(){
    this.reservedSeats.forEach(element => {
      $('#seat-box-' + element).css('background-color', 'red');
    }); 
  }

  Reset() {
    this.selectedSeats.forEach(element => {
      $('#seat-box-' + element).css('background-color', 'gray');
    });  
    this.TotalAmount = 0.00;
}

InitializeForm() {
  this.BookingForm = new FormGroup({
    BookingName: new FormControl('', Validators.required)
  });

}

  GetCurrentMovieSched() {
    let movieList = this.MovieService.MovieInfoResponse.MovieList;
    let currentmovieInfo = movieList.find(x => x.MovieID == this.MovieService.CurrentMovieId)?.MovieSchedule
                                    .find(x => x.ShowID == this.MovieService.CurrentSchedId);
    
    this.MovieImage = movieList.find(x => x.MovieID == this.MovieService.CurrentMovieId)?.MovieImage!;
    this.MovieName =  movieList.find(x => x.MovieID == this.MovieService.CurrentMovieId)?.MovieName!;
    if(currentmovieInfo){
      this.NumberOfSeats = new Array(currentmovieInfo.ShowSeats);
      this.SeatPrice = currentmovieInfo.ShowPrice;
      this.BookingHistory = currentmovieInfo.ShowBookingList;
      this.MovieTime = currentmovieInfo.ShowTime;
      currentmovieInfo.ShowBookingList.forEach(element => {
        if(element.BookingSeats.length > 0 && element.BookingStatus == 1){
          element.BookingSeats.forEach(data => {
              this.reservedSeats.push(data);
           });  
        }
      });      
    }    
  }

  SelectSeat(event: any, seat: number){

    if(!this.selectedSeats.includes(seat) && !this.reservedSeats.includes(seat)) {
      $(event.target).css('background-color', 'green');
      this.selectedSeats.push(seat);
      this.TotalAmount = this.selectedSeats.length * this.SeatPrice;
    }

  }

  CancelBooking(bookingID: number){
    let bookingInfo: Booking = new Booking();

    bookingInfo.BookingID = bookingID;
    bookingInfo.BookingStatus = 0;

    this.MovieService.apiCancelBooking(bookingInfo).subscribe(data => {
      this.MovieService.MovieInfoResponse = data;
      this.reservedSeats = [];
      this.GetCurrentMovieSched();
      this.ReloadSeats();
    });
  }

  ReloadSeats(){
    $(".seat-box").css('background-color', 'gray');
    
    this.selectedSeats.forEach((data) => {
      $('#seat-box-' + data).css('background-color', 'green');
    });

    this.LoadReservedSeats();

  }

}
