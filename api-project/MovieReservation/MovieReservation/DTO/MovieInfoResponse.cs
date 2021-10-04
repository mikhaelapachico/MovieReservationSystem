using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.DTO
{
    public class MovieInfoResponse
    {
        public MovieInfoResponse()
        {
            this.MovieList = new List<Movie>();
        }
        public List<Movie> MovieList { get; set; }
        public int Result { get; set; }
        public string FailureMessage { get; set; }
    }
}
