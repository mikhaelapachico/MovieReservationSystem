using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Engine
{
    public interface IMovieEngine
    {
        DTO.MovieInfoResponse GetMovieInfo();
        DTO.MovieInfoResponse SaveMovieInfo(DTO.Movie movieInfoDTO);
        DTO.MovieInfoResponse SaveBookingInfo(DTO.Movie bookingInfo);
        DTO.MovieInfoResponse CancelBooking(DTO.Booking bookingInfo);
    }
}
