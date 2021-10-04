import { Schedule } from "./Schedule";

export class Movie {
    MovieID: number;
    MovieName: string;
    MovieImage: string;
    MovieSchedule: Array<Schedule>;

    constructor(){
        this.MovieID = 0;
        this.MovieName = "";
        this.MovieImage = "";
        this.MovieSchedule = new Array<Schedule>();
    }
}