using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using INDUSTRY_PROJECT.Database;

namespace INDUSTRY_PROJECT
{
    public class Program
    {
        public static void Main(string[] args)
        {
            using( var db = new DbModel()){
                db.Database.EnsureCreated();
            }

            //DataGen.GenerateDummyData(); //for testing db, uncomment and run for testing db

            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
