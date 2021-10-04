export class Booking {
    BookingID: number;
    BookingName: string;
    BookingAmount: number;
    BookingStatus: number;
    BookingTimeStamp: Date;
    BookingSeats: Array<number>;

    constructor(){
        this.BookingID = 0;
        this.BookingName = "";
        this.BookingAmount = 0.00;
        this.BookingStatus = 0;
        this.BookingTimeStamp = new Date();
        this.BookingSeats = new Array<number>();
    }
}