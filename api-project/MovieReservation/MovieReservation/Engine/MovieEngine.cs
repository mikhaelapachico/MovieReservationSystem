using Microsoft.Extensions.Configuration;
using MovieReservation.Access;
using MovieReservation.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Engine
{
    public class MovieEngine: IMovieEngine
    {
        const string genericErrorMessage = "An error has occurred";
        private readonly string _sqlConnection;

        public MovieEngine(string sqlConnection)
        {
            _sqlConnection = sqlConnection;
        }
        public DTO.MovieInfoResponse GetMovieInfo()
        {
            DTO.MovieInfoResponse movieResponse = new DTO.MovieInfoResponse();
            List<DTO.Movie> movieList = new List<DTO.Movie>();

            try
            {
                IMovieAccess movieAccess = new MovieAccess(_sqlConnection);
                IBookingAccess bookingAccess = new BookingAccess(_sqlConnection);

                var accessMovieList = movieAccess.GetMovies();
                var accessSchduleList = movieAccess.GetSchedules();
                var accessBookingList = bookingAccess.GetBookings();

                foreach(var movie in accessMovieList)
                {
                    DTO.Movie internalMovie = new DTO.Movie()
                    {
                        MovieID = movie.MovieID,
                        MovieName = movie.MovieName,
                        MovieImage = movie.MovieImage
                    };
                  
                    internalMovie.MovieSchedule = accessSchduleList.Where(sched => sched.MovieID == movie.MovieID).Select(sched => new DTO.Schedule
                    {
                        ShowID = sched.ShowID,
                        ShowTime = sched.ShowTime,
                        ShowPrice = sched.ShowPrice,
                        ShowSeats = sched.ShowSeats
                    }).ToList();

                    foreach(var sched in internalMovie.MovieSchedule)
                    {
                        sched.ShowBookingList = accessBookingList.Where(booking => booking.ShowID == sched.ShowID).Select(booking => new DTO.Booking
                        {
                            BookingID = booking.BookingID,
                            BookingName = booking.BookingName,
                            BookingAmount = booking.BookingAmount,
                            BookingStatus = booking.BookingStatus,
                            BookingTimeStamp = booking.BookingTimeStamp,
                            BookingSeats = ParseToList(booking.BookingSeats)
                        }).ToList();
                    }

                    movieList.Add(internalMovie);

                }

                movieResponse.MovieList = movieList;
                movieResponse.Result = 1;
                movieResponse.FailureMessage = "";
            }
            catch (Exception ex)
            {
                movieResponse.Result = 0;
                movieResponse.FailureMessage = genericErrorMessage;
            }

            return movieResponse;
        }

        public DTO.MovieInfoResponse SaveMovieInfo(DTO.Movie movieInfoDTO)
        {
            DTO.MovieInfoResponse movieInfoResponse = new DTO.MovieInfoResponse();
            IMovieAccess movieAccess = new MovieAccess(_sqlConnection);


            try
            {
                var mappedMovieProperties = MapMovieProperties(movieInfoDTO);
                var mappedSchedProperties = MapScheduleProperties(movieInfoDTO.MovieSchedule, movieInfoDTO.MovieID);

                if (movieInfoDTO.MovieID == 0) //add
                {
                    movieAccess.CreateMovieInfo(mappedMovieProperties, mappedSchedProperties);

                } else //edit
                {
                    movieAccess.UpdateMovieInfo(mappedMovieProperties);
                }

                movieInfoResponse.FailureMessage = "";
                movieInfoResponse.Result = 1;
            }
            catch (Exception ex)
            {
                movieInfoResponse.FailureMessage = "An error has occurred";
                movieInfoResponse.Result = 0;
            }

            return movieInfoResponse;
        }

        public DTO.MovieInfoResponse SaveBookingInfo(DTO.Movie bookingInfo)
        {
            DTO.MovieInfoResponse movieInfoResponse = new DTO.MovieInfoResponse();
            IBookingAccess bookingAccess = new BookingAccess(_sqlConnection);
            try
            {
                Booking bookingDTO = bookingInfo.MovieSchedule[0].ShowBookingList[0];
                int movieId = bookingInfo.MovieID;
                int showId = bookingInfo.MovieSchedule[0].ShowID;
                var mappedBookingProperties = MapBookingProperties(bookingDTO, movieId, showId);

                bookingAccess.CreateBooking(mappedBookingProperties);
                movieInfoResponse.FailureMessage = "";
                movieInfoResponse.Result = 1;

            }
            catch (Exception ex)
            {
                movieInfoResponse.FailureMessage = "An error has occurred";
                movieInfoResponse.Result = 0;
            }

            return movieInfoResponse;
        }

        public DTO.MovieInfoResponse CancelBooking(DTO.Booking bookingInfo)
        {

            DTO.MovieInfoResponse movieInfoResponse = new DTO.MovieInfoResponse();
            IBookingAccess bookingAccess = new BookingAccess(_sqlConnection);
            try
            {
                var mappedBookingProperties = MapBookingProperties(bookingInfo, 0, 0);

                bookingAccess.UpdateBooking(mappedBookingProperties);
                movieInfoResponse.FailureMessage = "";
                movieInfoResponse.Result = 1;

            }
            catch (Exception ex)
            {
                movieInfoResponse.FailureMessage = "An error has occurred";
                movieInfoResponse.Result = 0;
            }

            return movieInfoResponse;
        }

        private Models.Movie MapMovieProperties(DTO.Movie movieDTO)
        {
            Models.Movie movie = new Models.Movie();
            movie.MovieID = movieDTO.MovieID;
            movie.MovieImage = movieDTO.MovieImage;
            movie.MovieName = movieDTO.MovieName;

            return movie;
        }

        private List<Models.Schedule> MapScheduleProperties(List<DTO.Schedule> schedDTO, int movieID)
        {
            List<Models.Schedule> schedListModel = new List<Models.Schedule>();
            foreach(var sched in schedDTO)
            {
                Models.Schedule schedModel = new Models.Schedule();
                schedModel.MovieID = movieID;
                schedModel.ShowID = sched.ShowID;
                schedModel.ShowPrice = sched.ShowPrice;
                schedModel.ShowSeats = sched.ShowSeats;
                schedModel.ShowTime = sched.ShowTime;

                schedListModel.Add(schedModel);
            }

            return schedListModel;
        }

        private Models.Booking MapBookingProperties(DTO.Booking bookingDTO, int movieID, int showID)
        {
            Models.Booking bookingModel = new Models.Booking();
            bookingModel.MovieID = movieID;
            bookingModel.ShowID = showID;
            bookingModel.BookingID = bookingDTO.BookingID;
            bookingModel.BookingName = bookingDTO.BookingName;
            bookingModel.BookingStatus = bookingDTO.BookingStatus;
            bookingModel.BookingAmount = bookingDTO.BookingAmount;
            bookingModel.BookingSeats = ParseToString(bookingDTO.BookingSeats);

            return bookingModel;
        }

        private string ParseToString(List<int> seatList)
        {
            string seats = "";

            if(seatList.Count() > 0)
            {
                seats = string.Join(',', seatList);
            }

            return seats;
        }

        private List<int> ParseToList(string seats)
        {
            List<int> seatList = new List<int>();

            seatList = seats.Split(',').Select(Int32.Parse).ToList();

            return seatList;
        }
    }
}
