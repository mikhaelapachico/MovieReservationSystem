using Microsoft.Extensions.Configuration;
using MovieReservation.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Access
{
    public class MovieAccess :  IMovieAccess
    {
        private readonly string _sqlConnectionString;
        public MovieAccess(string sqlConnectionString)
        {
            _sqlConnectionString = sqlConnectionString;
        }
    
        public List<Models.Movie> GetMovies()
        {
            string getMoviesQuery = "select * from dbo.Movie";
            List<Models.Movie> movieList = new List<Models.Movie>();

            DataTable table = new DataTable();
            table = ReadQuery(getMoviesQuery);

            movieList = table.AsEnumerable().Select(row =>
                    new Models.Movie
                    {
                        MovieID = row.Field<int>("MovieID"),
                        MovieName = row.Field<string>("MovieName"),
                        MovieImage = row.Field<string>("MovieImage"),
                    }).ToList();

            return movieList;
        }

        public List <Models.Schedule> GetSchedules()
        {
            string getSchedulesQuery = "select * from dbo.MovieSchedules";
            List<Models.Schedule> scheduleList = new List<Models.Schedule>();

            DataTable table = new DataTable();
            table = ReadQuery(getSchedulesQuery);

            scheduleList = table.AsEnumerable().Select(row =>
                    new Models.Schedule
                    {
                        ShowID = row.Field<int>("ShowID"),
                        MovieID = row.Field<int>("MovieID"),
                        ShowPrice = row.Field<decimal>("ShowPrice"),
                        ShowSeats = row.Field<int>("ShowSeats"),
                        ShowTime = row.Field<DateTime>("ShowTime")
                    }).ToList();

            return scheduleList;
        }

        public void CreateMovieInfo(Models.Movie mappedMovieProperties, List<Models.Schedule> mappedSchedProperties)
        {
            string insertmoviequery = @"insert into dbo.Movie 
                                        ([MovieName]
                                       ,[MovieImage])
                                        VALUES
                                        ('" + mappedMovieProperties.MovieName + @"'
                                        ,'" + mappedMovieProperties.MovieImage + @"'
                                        ); SELECT CAST(scope_identity() AS int)";

                var movieId = InsertQuery(insertmoviequery);

            foreach(var sched in mappedSchedProperties)
            {
                string insertschedquery = @"insert into dbo.movieschedules
                                        ([ShowTime]
                                       ,[ShowSeats]
                                       ,[ShowPrice]
                                       ,[MovieID])
                                        VALUES
                                        ('" + sched.ShowTime + @"'
                                        ,'" + sched.ShowSeats + @"'
                                        ,'" + sched.ShowPrice + @"'
                                        ,'" + movieId + @"'
                                        ); SELECT CAST(scope_identity() AS int)";
                InsertQuery(insertschedquery);
            }

        }

        public void UpdateMovieInfo(Models.Movie mappedMovieProperties)
        {
            string updateQuery = @"update dbo.Movie
                                   set [MovieImage] = '" + mappedMovieProperties.MovieImage + @"'
                                   where [MovieId] = " + mappedMovieProperties.MovieID + @"; SELECT CAST(scope_identity() AS int)";

            UpdateQuery(updateQuery);
        }

        private DataTable ReadQuery(string query)
        {
            string dbquery = query;
            DataTable table = new DataTable();
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(_sqlConnectionString))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(dbquery, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader); ;

                    myReader.Close();
                    myCon.Close();
                }
            }

            return table;
        }

        private int InsertQuery(string query)
        {
            try
            {
                Int32 id = 0;
                using (SqlConnection conn = new SqlConnection(_sqlConnectionString))
                {
                    conn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, conn))
                    {
                        id = (Int32)myCommand.ExecuteScalar();
                        myCommand.Dispose();
                        conn.Close();
                    }                  
                  
                }

                return (int)id;
            }
            catch (Exception e)
            {
                return 0;
            }
            
        }

        private int UpdateQuery(string query)
        {
            try
            {
                int updatedRows = 0;
                using (SqlConnection conn = new SqlConnection(_sqlConnectionString))
                {
                    conn.Open();
                    using (SqlCommand myCommand = new SqlCommand(query, conn))
                    {
                        updatedRows = myCommand.ExecuteNonQuery();
                        myCommand.Dispose();
                        conn.Close();
                    }

                }

                return updatedRows;
            }
            catch (Exception e)
            {
                return 0;
            }
        }
    }
}
