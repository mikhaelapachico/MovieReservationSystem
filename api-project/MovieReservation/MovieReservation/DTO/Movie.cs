using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.DTO
{
    public class Movie
    {
        public Movie()
        {
            this.MovieSchedule = new List<Schedule>();
        }
        public int MovieID { get; set; }
        public string MovieName { get; set; }
        public string MovieImage { get; set; }
        public List<Schedule> MovieSchedule { get; set; }
    }
}
