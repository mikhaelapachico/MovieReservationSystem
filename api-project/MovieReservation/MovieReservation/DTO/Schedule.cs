using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.DTO
{
    public class Schedule
    {
        public Schedule()
        {
            this.ShowBookingList = new List<Booking>();
        }
        public int ShowID { get; set; }
        public DateTime ShowTime { get; set; }
        public int ShowSeats { get; set; }
        public decimal ShowPrice { get; set; }
        public List<Booking> ShowBookingList { get; set; }
    }
}
