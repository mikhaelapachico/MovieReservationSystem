import { Movie } from "./Movie";

export class MovieInfoResponse {
    MovieList: Array<Movie>;
    Result: number;
    FailureMessage: string;

    constructor(){
        this.MovieList =  new Array<Movie>();
        this.Result = 0;
        this.FailureMessage = "";
    }
}