using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.DTO
{
    public class Booking
    {
        public int BookingID { get; set; }
        public string BookingName { get; set; }
        public decimal BookingAmount { get; set; }
        public int BookingStatus { get; set; }
        public List<int> BookingSeats { get; set; }
        public DateTime BookingTimeStamp { get; set; }
    }
}
