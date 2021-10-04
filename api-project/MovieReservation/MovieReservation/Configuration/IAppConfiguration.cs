using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Configuration
{
    public interface IAppConfiguration
    {
        public string GetConnectionString();
    }
}
