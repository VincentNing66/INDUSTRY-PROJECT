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
        #region CreateUserAccount GET & POST Methods
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
        #endregion

        #region EditUserAccount GET & POST Methods
        [HttpGet("[action]")]
        public UserAccount GetUserAccountDetails(int userID)
        {
            //To retrieve all details of a single user from the database
            using (var db = new DbModel())
            {
                UserAccount userDetails = db.UserAccount.Where(x=>x.UserAccountID== userID).ToList().First();
                return userDetails;
            }
        }
        [HttpPost("[action]")]
        public bool updateUserAccount()
        {
            string UserJson = null;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                UserJson = reader.ReadToEnd();
            };
            UserAccount user = JsonConvert.DeserializeObject<UserAccount>(UserJson);
            using (var db = new DbModel())
            {
                db.UserAccount.Update(user);
                db.SaveChanges();
            }
            return true;
        }
        #endregion

        #region Sample Controller
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

        #region LoginForm
        [HttpGet("[action]")]
        public UserAccount GetUserAccountDetailsForLogin(string username, string password)
        {
            //To retrieve all details of a single user from the database where the username and password matches an account. 
            using (var db = new DbModel())
            {
                UserAccount userDetails;
                List<UserAccount> userDetailsList = db.UserAccount.Where(x => x.Username.ToLower() == username.ToLower() && x.Password==password).ToList();
                if(userDetailsList.Count == 0)
                {
                    userDetails = new UserAccount()
                    {
                        UserAccountID = 0,
                        Username = "undefined"
                    };
                }
                else
                {
                    userDetails = userDetailsList.First();
                }
                return userDetails;
            }
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

        #endregion
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
        #endregion
    }
}
