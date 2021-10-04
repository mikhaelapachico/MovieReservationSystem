using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieReservation.Configuration
{
    public class AppConfiguration : IAppConfiguration
    {

        private readonly IConfiguration _configuration;
        public AppConfiguration(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string GetConnectionString()
        {
            return this._configuration.GetConnectionString("AppCon");
        }
    }
}
