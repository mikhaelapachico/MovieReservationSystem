using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Access
{
    public interface IBookingAccess
    {
        List<Models.Booking> GetBookings();
        void CreateBooking(Models.Booking booking);
        void UpdateBooking(Models.Booking booking);
    }
}
