using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using INDUSTRY_PROJECT.Database;
using Newtonsoft.Json;
using System.IO;
using System.Text;

namespace INDUSTRY_PROJECT.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        private static string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        [HttpGet("[action]")]
        public IEnumerable<WeatherForecast> WeatherForecasts()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                DateFormatted = DateTime.Now.AddDays(index).ToString("d"),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            });
        }

        [HttpPost("[action]")]
        public bool AddUser()
        {
            string UserJson = null;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                UserJson = reader.ReadToEnd();
            };
            UserAccount user = JsonConvert.DeserializeObject<UserAccount>(UserJson);
            using (var db = new DbModel())
            {
                db.UserAccount.Add(user);
                db.SaveChanges();
            }
            return true;
        }

        [HttpGet("[action]")]
        public List<Permission> GetPermissions()
        {
            //To retrieve all permissions from the database
            using (var db = new DbModel())
            {
                List<Permission> permissions = db.Permissions.ToList();
                return permissions;
            }
        }


        public class WeatherForecast
        {
            public string DateFormatted { get; set; }
            public int TemperatureC { get; set; }
            public string Summary { get; set; }

            public int TemperatureF
            {
                get
                {
                    return 32 + (int)(TemperatureC / 0.5556);
                }
            }
        }
    }
}
