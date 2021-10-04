using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MovieReservation.Engine;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MovieReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {

        private readonly string sqlConnection;
        public BookingController(IConfiguration config)
        {
            sqlConnection = config.GetConnectionString("AppCon");
        }

        // POST api/<BookingController>
        [HttpPost]
        public JsonResult Post([FromBody] DTO.Movie bookingInfo)
        {
            IMovieEngine movieEngine = new MovieEngine(sqlConnection);

            DTO.MovieInfoResponse saveInfoResponse = movieEngine.SaveBookingInfo(bookingInfo);

            if (saveInfoResponse.Result == 1)
            {
                DTO.MovieInfoResponse movieInfoList = movieEngine.GetMovieInfo();
                return new JsonResult(movieInfoList);
            }
            else
            {
                return new JsonResult(saveInfoResponse);
            }
        }

        [HttpPut]
        public JsonResult Put([FromBody] DTO.Booking bookingInfo)
        {
            IMovieEngine movieEngine = new MovieEngine(sqlConnection);

            DTO.MovieInfoResponse saveInfoResponse = movieEngine.CancelBooking(bookingInfo);

            if (saveInfoResponse.Result == 1)
            {
                DTO.MovieInfoResponse movieInfoList = movieEngine.GetMovieInfo();
                return new JsonResult(movieInfoList);
            }
            else
            {
                return new JsonResult(saveInfoResponse);
            }
        }
    }
}
