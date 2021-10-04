using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Access
{
    public interface IMovieAccess
    {
        List<Models.Movie> GetMovies();
        List<Models.Schedule> GetSchedules();
        void CreateMovieInfo(Models.Movie mappedMovieProperties, List<Models.Schedule> mappedSchedProperties);
        void UpdateMovieInfo(Models.Movie mappedMovieProperties);
    }
}
