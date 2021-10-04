using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Models
{
    public class Schedule
    {
        public int ShowID { get; set; }
        public DateTime ShowTime {get; set;}
        public int ShowSeats { get; set; }
        public decimal ShowPrice {get; set;}
        public int MovieID { get; set; }
    }
}
