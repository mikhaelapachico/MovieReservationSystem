using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MovieReservation.Engine;
using MovieReservation.Models;
using Newtonsoft.Json;
using System.Web;

namespace MovieReservation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly string sqlConnection;
        public MovieController(IConfiguration config)
        {
            sqlConnection = config.GetConnectionString("AppCon");
        }

        [HttpGet]
        public JsonResult Get()
        {
            IMovieEngine movieEngine = new MovieEngine(sqlConnection);

            return new JsonResult(movieEngine.GetMovieInfo());
        }

        [HttpPost]

        public JsonResult Post([FromBody] DTO.Movie moviePostInfo)
        {
            IMovieEngine movieEngine = new MovieEngine(sqlConnection);

            DTO.MovieInfoResponse saveInfoResponse = movieEngine.SaveMovieInfo(moviePostInfo);

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
