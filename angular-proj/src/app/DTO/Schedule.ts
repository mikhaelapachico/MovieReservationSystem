import { Booking } from "./Booking";

export class Schedule {
    ShowID: number;
    ShowTime: Date;
    ShowSeats: number;
    ShowPrice: number;
    ShowBookingList: Array<Booking>;

    constructor(){
        this.ShowID = 0;
        this.ShowTime = new Date();
        this.ShowSeats = 18;
        this.ShowPrice = 0.00;
        this.ShowBookingList = new Array<Booking>();
    }
}