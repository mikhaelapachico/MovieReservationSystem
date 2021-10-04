import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Movie } from 'src/app/DTO/Movie';
import { Schedule } from 'src/app/DTO/Schedule';
import { MovieServiceService } from 'src/app/service/movie-service/movie-service.service';
import { AppComponent } from '../../app.component';

declare var $: any;


@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.scss']
})


export class MovieFormComponent implements OnInit {

  MovieService: MovieServiceService;
  MovieForm: FormGroup;
  fileToUpload: File | null;
  Image: string = '';

  get IsAdding(): boolean {
    return this.MovieService.IsAdding;
  }

  get formControls() {
    return this.MovieForm.controls;
  }

  
  constructor(@Inject(AppComponent) private appComponent: AppComponent,) { 
    this.MovieService = appComponent.MovieService;
    this.MovieForm = new FormGroup({});
    this.fileToUpload = null;
  }

  ngOnInit(): void {
    this.InitializeForm();
    this.SetForm();
  }

  InitializeForm() {
    if(this.IsAdding) {
      this.MovieForm = new FormGroup({
        Title: new FormControl('', Validators.required),
        Image: new FormControl(''),
        Price: new FormControl('', Validators.required),
        Schedule1Time: new FormControl(Validators.required),
        Schedule1Seat: new FormControl(18, Validators.required),
        Schedule2Time: new FormControl(Validators.required),
        Schedule2Seat: new FormControl(18, Validators.required),
        Schedule3Time: new FormControl(Validators.required),
        Schedule3Seat: new FormControl(18, Validators.required),
        Schedule4Time: new FormControl(Validators.required),
        Schedule4Seat: new FormControl(18, Validators.required),
        Schedule5Time: new FormControl(Validators.required),
        Schedule5Seat: new FormControl(18, Validators.required)
      });
    } else {
      this.MovieForm = new FormGroup({
        Title: new FormControl({value:'', disabled: true}, Validators.required),
        Image: new FormControl(''),
      });
    }
    
  }

  SaveMovieInfo(){
    let movieItem: Movie = new Movie();
    if(this.IsAdding){
      

      movieItem.MovieName = this.formControls["Title"].value;
      movieItem.MovieImage = this.Image; 
          
      for (var x = 0; x < 5; x++){
        let sched = new Schedule();
        let schedSeatFormControl = "Schedule".concat((x+1).toString(), "Seat");
        let schedTimeFormControl = "Schedule".concat((x+1).toString(), "Time");

        sched.ShowPrice = this.formControls["Price"].value;
        sched.ShowSeats = this.formControls[schedSeatFormControl].value;
        sched.ShowTime = this.formControls[schedTimeFormControl].value;

        movieItem.MovieSchedule.push(sched);
      }
    } else {
      movieItem.MovieID = this.MovieService.CurrentEditingItem.MovieID;
      movieItem.MovieName = this.MovieService.CurrentEditingItem.MovieName;
      movieItem.MovieImage = this.Image;
    }
    

    this.MovieService.apiSaveMovieInfo(movieItem).subscribe(data => {
      this.MovieService.MovieInfoResponse = data;
      this.Close();
    })
  }

  SetForm(){
    if (!this.IsAdding){
      this.MovieForm.setValue({
        Title: this.MovieService.CurrentEditingItem.MovieName,
        Image: ''
      });

      this.Image = this.MovieService.CurrentEditingItem.MovieImage
    }
  }

  Close (){
    this.MovieService.IsEditing = false;
    this.MovieService.IsAdding = false;
    $('.modal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  Upload(event: any){
    this.fileToUpload = event.target.files.item(0);
    this.MovieService.UploadFile(this.fileToUpload).subscribe(data => {
      this.Image = data;
      });
  }

  clicked(){
    $("#fileUploadImage").click();
  }

  


}
