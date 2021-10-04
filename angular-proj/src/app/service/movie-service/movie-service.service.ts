import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';    
import { Observable, of, Subject } from 'rxjs';
import { MovieInfoResponse } from 'src/app/DTO/MovieInfoResponse';
import { Movie } from 'src/app/DTO/Movie';
import { Schedule } from 'src/app/DTO/Schedule';
import { Booking } from 'src/app/DTO/Booking';

@Injectable({
  providedIn: 'root'
})
export class MovieServiceService {

  get IsAdding(): boolean {
    return this._isAdding;
  }
  
  set IsAdding(isAdding: boolean){
    this._isAdding = isAdding;
  }

  get IsEditing(): boolean {
    return this._isEditing;
  }

  set IsEditing(isEditing: boolean){
    this._isEditing = isEditing;
  }

  get ShowList(): boolean {
    return this._showList;
  }
  
  set ShowList(showList: boolean){
    this._showList = showList;
  }

  get MovieInfoResponse(): MovieInfoResponse {
    return this._movieInfoResponse;
  }

  set MovieInfoResponse(movieInfoResponse: MovieInfoResponse){
    this._movieInfoResponse = movieInfoResponse;
  }

  get CurrentSchedId(): number {
    return this._currentschedId;
  }

  set CurrentSchedId(currentschedId: number){
    this._currentschedId = currentschedId;
  }

  get CurrentMovieId(): number {
    return this._currentMovieId
  }

  set CurrentMovieId(currentMovieId: number) {
    this._currentMovieId = currentMovieId;
  }

  get CurrentMovieSchedInfo(): Schedule{
    return this._currentMovieSchedInfo;
  }

  set CurrentMovieSchedInfo(currentMovieSchedInfo: Schedule){
    this._currentMovieSchedInfo = currentMovieSchedInfo;
  }

  get CurrentEditingItem(): Movie {
    return this._currentEditingItem;
  }

  set CurrentEditingItem(value: Movie){
    this._currentEditingItem = value;
  }

  private _isAdding: boolean = false;
  private _showList: boolean = true;
  private _movieInfoResponse: MovieInfoResponse;
  private _currentschedId: number = 0;
  private _currentMovieId: number = 0;
  private _currentMovieSchedInfo: Schedule;
  private _currentEditingItem: Movie;
  private _isEditing: boolean = false;

  constructor(private http: HttpClient )
  {
    this._movieInfoResponse = new MovieInfoResponse();
    this._currentMovieSchedInfo = new Schedule();
    this._currentEditingItem = new Movie();
  }

  public apiGetMovieInfoResponse(): Observable<MovieInfoResponse> {
    return this.http.get <MovieInfoResponse> ("https://localhost:5001/api/Movie"); 
  }

  public apiSaveMovieInfo(movieInfo: Movie): Observable<MovieInfoResponse> {
    return this.http.post <MovieInfoResponse> ("https://localhost:5001/api/Movie", movieInfo); 
  }

  public apiSaveBookingInfo(bookingInfo: Movie): Observable<MovieInfoResponse> {
    return this.http.post <MovieInfoResponse> ('https://localhost:5001/api/Booking', bookingInfo); 
  }

  public apiCancelBooking(bookingInfo: Booking) : Observable<MovieInfoResponse>{
    return this.http.put <MovieInfoResponse> ('https://localhost:5001/api/Booking', bookingInfo);
  }

  public UploadFile(fileToUpload: any): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http
      .post('https://localhost:5001/api/UploadImage', formData);
  }

  private GetMovieInfoResponseTemp(): Observable<MovieInfoResponse> {
    var objectjson ={"MovieList":[{"MovieID":1,"MovieName":"Harry Potter","MovieImage":"assets/harrypotter.jpg","MovieSchedule":[{"ShowID":1,"ShowTime":"2021-09-26T14:42:47.937","ShowSeats":20,"ShowPrice":100.00,"ShowBookingList":[]},{"ShowID":2,"ShowTime":"2021-09-26T15:43:08.35","ShowSeats":18,"ShowPrice":200.00,"ShowBookingList":[]},{"ShowID":3,"ShowTime":"2021-09-26T16:43:16.157","ShowSeats":18,"ShowPrice":200.00,"ShowBookingList":[]},{"ShowID":4,"ShowTime":"2021-09-26T17:43:20.997","ShowSeats":18,"ShowPrice":200.00,"ShowBookingList":[]},{"ShowID":5,"ShowTime":"2021-09-26T18:43:24.173","ShowSeats":18,"ShowPrice":200.00,"ShowBookingList":[]}]},{"MovieID":2,"MovieName":"Hunger Games","MovieImage":"assets/hungergames.jpg","MovieSchedule":[{"ShowID":6,"ShowTime":"2021-09-26T14:43:58.81","ShowSeats":63,"ShowPrice":200.00,"ShowBookingList":[]},{"ShowID":7,"ShowTime":"2021-09-26T15:44:14.987","ShowSeats":63,"ShowPrice":150.00,"ShowBookingList":[]},{"ShowID":8,"ShowTime":"2021-09-26T16:44:22.697","ShowSeats":63,"ShowPrice":150.00,"ShowBookingList":[]},{"ShowID":9,"ShowTime":"2021-09-26T17:44:36.893","ShowSeats":40,"ShowPrice":150.00,"ShowBookingList":[]},{"ShowID":10,"ShowTime":"2021-09-26T18:44:39.513","ShowSeats":40,"ShowPrice":150.00,"ShowBookingList":[]}]},{"MovieID":3,"MovieName":"Maze Runner","MovieImage":"assets/mazerunner.jpg","MovieSchedule":[{"ShowID":13,"ShowTime":"2021-09-26T14:47:58.1","ShowSeats":24,"ShowPrice":110.00,"ShowBookingList":[]},{"ShowID":14,"ShowTime":"2021-09-26T15:48:11.29","ShowSeats":24,"ShowPrice":110.00,"ShowBookingList":[]},{"ShowID":15,"ShowTime":"2021-09-26T16:48:37.807","ShowSeats":100,"ShowPrice":10.00,"ShowBookingList":[]},{"ShowID":16,"ShowTime":"2021-09-26T17:48:57.09","ShowSeats":74,"ShowPrice":20.00,"ShowBookingList":[]},{"ShowID":17,"ShowTime":"2021-09-26T18:49:07.903","ShowSeats":18,"ShowPrice":20.00,"ShowBookingList":[]}]}],"Result":1,"FailureMessage":""};

    return of(JSON.parse(JSON.stringify(objectjson)));
  }
}
