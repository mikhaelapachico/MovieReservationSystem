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
    public class BookingAccess: IBookingAccess
    {
        private readonly string _sqlConnectionString;
        public BookingAccess(string sqlConnectionString)
        {
            _sqlConnectionString = sqlConnectionString;
        }
        public List<Models.Booking> GetBookings()
        {
            string getBookingssQuery = "select * from dbo.MovieBookings";
            List<Models.Booking> bookingList = new List<Models.Booking>();
            DataTable table = new DataTable();
            table = ReadQuery(getBookingssQuery);

            bookingList = table.AsEnumerable().Select(row =>
                    new Models.Booking
                    {
                        BookingID = row.Field<int>("BookingID"),
                        BookingName = row.Field<string>("BookingName"),
                        BookingAmount = row.Field<decimal>("BookingAmount"),
                        BookingTimeStamp = row.Field<DateTime>("BookingTimeStamp"),
                        BookingStatus = row.Field<int>("BookingStatus"),
                        BookingSeats = row.Field<string>("BookingSeats"),
                        ShowID = row.Field<int>("ShowID"),
                        MovieID = row.Field<int>("MovieID")
                    }).ToList();

            return bookingList;
        }

        public void CreateBooking(Models.Booking booking)
        {
            string insertBookingQuery = @"insert into dbo.moviebookings
                                       ([BookingName]
                                       ,[BookingAmount]
                                       ,[BookingStatus]
                                       ,[BookingTimeStamp]
                                       ,[ShowID]
                                       ,[MovieID]
                                       ,[BookingSeats])
                                        VALUES
                                        ('" + booking.BookingName + @"'
                                        ," + booking.BookingAmount + @"
                                        ," + booking.BookingStatus + @"
                                        , CURRENT_TIMESTAMP
                                        ," + booking.ShowID + @"
                                        ," + booking.MovieID + @"
                                        ,'" + booking.BookingSeats + @"'
                                        ); SELECT CAST(scope_identity() AS int)";

            InsertQuery(insertBookingQuery);
        }

        public void UpdateBooking(Models.Booking booking)
        {
            string updateBookingQuery = @"update dbo.MovieBookings
                                   set [BookingStatus] = '" + booking.BookingStatus + @"'
                                   where [BookingID] = " + booking.BookingID + @"; SELECT CAST(scope_identity() AS int)";

            UpdateQuery(updateBookingQuery);
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
