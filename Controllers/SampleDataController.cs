using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using INDUSTRY_PROJECT.Database;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace INDUSTRY_PROJECT.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        #region CreateUserAccount GET & POST Methods
        [HttpPost("[action]")]
        public string AddUser(int currentUserID)
        {
            bool userEmailStatus;
            bool userUserNameStatus;
            string UserJson = null;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                UserJson = reader.ReadToEnd();
            };
            UserAccount user = JsonConvert.DeserializeObject<UserAccount>(UserJson);
            using (var db = new DbModel())
            {

                //To check if the email address has already been used in the database (will try to grab the first instance)
                List<UserAccount> userResultList = db.UserAccount.Where(x => x.EmailAddress == user.EmailAddress && x.UserAccountID != currentUserID).ToList();
                userEmailStatus = userResultList.Count.Equals(0) ? false : true;
                //To check if the username has already been used in the database (will try to grab the first instance)
                List<UserAccount> userResultList2 = db.UserAccount.Where(x => x.Username == user.Username && x.UserAccountID != currentUserID).ToList();
                userUserNameStatus = userResultList2.Count.Equals(0) ? false : true;
                //If it fails to find the same username or email, it means that it's okay to insert into the database
                if (new[] { userUserNameStatus, userEmailStatus }.All(x => x == false))
                {
                    //Will insert a new user into the database
                    db.UserAccount.Add(user);
                    db.SaveChanges();
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 200;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(true) && userEmailStatus.Equals(false))
                {
                    //Code 99 = The username exists but the email doesn't exist
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 99;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(false) && userEmailStatus.Equals(true))
                {
                    //Code 98 = The username doesn't exists but the email does exist
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 98;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(true) && userEmailStatus.Equals(true))
                {
                    //Code 97 = The username exists and the email exists
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 97;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else
                {
                    //Code 96 = Unknown
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 96;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
            }
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
        public string updateUserAccount()
        {
            bool userEmailStatus;
            bool userUserNameStatus;
            string UserJson = null;
            using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
            {
                UserJson = reader.ReadToEnd();
            };
            UserAccount user = JsonConvert.DeserializeObject<UserAccount>(UserJson);
            using (var db = new DbModel())
            {
                //To check if the email address has already been used in the database (will try to grab the first instance)
                List<UserAccount> userResultList = db.UserAccount.Where(x => x.EmailAddress == user.EmailAddress && x.UserAccountID != user.UserAccountID).ToList();
                userEmailStatus = userResultList.Count.Equals(0) ? false : true;
                //To check if the username has already been used in the database (will try to grab the first instance)
                List<UserAccount> userResultList2 = db.UserAccount.Where(x => x.Username == user.Username && x.UserAccountID != user.UserAccountID).ToList();
                userUserNameStatus = userResultList2.Count.Equals(0) ? false : true;
                //If it fails to find the same username or email, it means that it's okay to insert into the database
                if (new[] { userUserNameStatus, userEmailStatus }.All(x => x == false))
                {
                    //Will insert a new user into the database
                    db.UserAccount.Update(user);
                    db.SaveChanges();
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 200;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(true) && userEmailStatus.Equals(false))
                {
                    //Code 99 = The username exists but the email doesn't exist
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 99;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(false) && userEmailStatus.Equals(true))
                {
                    //Code 98 = The username doesn't exists but the email does exist
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 98;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else if (userUserNameStatus.Equals(true) && userEmailStatus.Equals(true))
                {
                    //Code 97 = The username exists and the email exists
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 97;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
                else
                {
                    //Code 96 = Unknown
                    ResponseStatus result = new ResponseStatus();
                    result.StatusCode = 96;
                    string output = JsonConvert.SerializeObject(result);
                    return output;
                }
            }
        }
        [HttpGet("[action]")]
        public string GetPermName(int permID)
        {
            //To retrieve a permission's name from the database
            using (var db = new DbModel())
            {
                string permName = db.Permissions.Where(x => x.PermissionID == permID).Select(x => x.PermissionName).First();
                return permName;
            }
        }
        #endregion

        #region ManageUserAccount GET & POST Methods
        [HttpGet("[action]")]
        public UserAccount SearchForUserAccount(string field)
        {
            //To retrieve all details of user account that has a username/email from the database
            using (var db = new DbModel())
            {
                List<UserAccount> userResultList1 = db.UserAccount.Where(x => x.EmailAddress == field).ToList();
                if(userResultList1.Count.Equals(0))
                {
                    List<UserAccount> userResultList2 = db.UserAccount.Where(x => x.Username == field).ToList();
                    if(userResultList1.Count.Equals(0))
                    {
                        UserAccount res = db.UserAccount.Where(x => x.UserAccountID == 1).ToList().First();
                        return res;
                    }
                    else
                    {
                        return userResultList2.First();
                    }
                }
                else
                {
                    return userResultList1.First();
                }
                
            }
     
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

        #region Dashboard

        public class apiInfo
        {
            public int clicks { get; set; }
            public float comissionTotal { get; set; }
            public float earnPerClick { get; set; }
            public float earnPerUser { get; set; }
        }

        [HttpGet("Action")]
        public apiInfo getApiInfo(int test)
        {
            using (var db = new DbModel())
            {
                apiInfo response = new apiInfo();
                var timestampID = db.TimeStamps.Last().TimeStampID;

                var responseList = db.ComissionFactory.Where(x => x.TimeStampID == timestampID).ToList();

                response.clicks = responseList.Sum(x => x.ClicksTotal);
                response.comissionTotal = responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid);
                response.earnPerUser = (responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid) / responseList.Count);
                response.earnPerClick = (responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid) / responseList.Sum(x => x.ClicksTotal));

                return response;
            }
        }

        [HttpGet("Action")]
        public apiInfo RefreshAPI(int test)
        {
            using (var db = new DbModel())
            {
                apiInfo response = new apiInfo();

                db.TimeStamps.Add(new TimeStamp()
                {
                    TimeStampValue = DateTime.Now
                });
                db.SaveChanges();

                var timestampID = db.TimeStamps.Last().TimeStampID;
                API.ComissionFactory.CallComissionFactory(timestampID);

                var responseList = db.ComissionFactory.Where(x => x.TimeStampID == timestampID).ToList();

                response.clicks = responseList.Sum(x => x.ClicksTotal);
                response.comissionTotal = responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid);
                response.earnPerUser = (responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid) / responseList.Count);
                response.earnPerClick = (responseList.Sum(x => x.ComissionAprroved + x.ComissionPending + x.ComissionVoid) / responseList.Sum(x => x.ClicksTotal));

                return response;
            }
        }

        #endregion
    }
}
