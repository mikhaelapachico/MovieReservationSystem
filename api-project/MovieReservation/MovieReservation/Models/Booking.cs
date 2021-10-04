using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Models
{
    public class Booking
    {
        public int BookingID { get; set; }
        public string BookingName { get; set; }
        public decimal BookingAmount { get; set; }
        public int BookingStatus { get; set; }
        public DateTime BookingTimeStamp { get; set; }
        public string BookingSeats { get; set; }
        public int ShowID { get; set; }
        public int MovieID { get; set; }
    }
}
