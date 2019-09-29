using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace INDUSTRY_PROJECT.Database
{
    public class DataGen
    {
        public static Random rand;

        public static void GenerateDummyData()
        {
            rand = new Random();

            int Usercount = 10;
            int Calls = 20;
            int Responses = 1;

            using(var db = new DbModel())
            {
                for(int x = 0; x < Usercount; x++) //generate 10 users
                {
                    var user = GenerateUserAccount();
                    user.Permissions = GeneratePermission();
                    for( int y = 0; y < 10; y++)
                    {
                        user.Permissions.Features.Add(GenerateFeature());
                    };
                    db.UserAccount.Add(user);
                }
                for(int z = 0; z < Calls; z++)
                {
                    TimeStamp call = GenerateTimestamp();
                    for(int a = 0; a < Responses; a++)
                    {
                        call.GoogleAnalytics.Add(GenerateGoogle());
                        call.ComissionFactory.Add(GenerateCF());
                        call.ShareASale.Add(GenerateSAS());
                        call.PepperJam.Add(GeneratePJ());
                    }
                    db.TimeStamps.Add(call);
                }
                db.SaveChanges();
            }
        }

        public static UserAccount GenerateUserAccount()
        {
            UserAccount user = new UserAccount()
            {
                Username = GenerateString(10),
                FirstName = GenerateString(10),
                LastName = GenerateString(10),
                Password = GenerateString(8),
                Address = GenerateString(10),
                EmailAddress = GenerateString(14)
            };
            return user;
        }

        public static Permission GeneratePermission()
        {
            Permission permission = new Permission()
            {
                PermissionName = GenerateString(10),
                Description = GenerateString(20),
                Features = new List<PermissionFeature>()
            };
            return permission;
        }

        public static PermissionFeature GenerateFeature()
        {
            Feature feature = new Feature()
            {
                FeatureName = GenerateString(10)
            };
            PermissionFeature fullFeature = new PermissionFeature()
            {
                Feature = feature
            };
            return fullFeature;
        }

        public static TimeStamp GenerateTimestamp()
        {
            TimeStamp time = new TimeStamp()
            {
                TimeStampValue = GenerateDate(),
                GoogleAnalytics = new List<GoogleAnalytics>(),
                ComissionFactory = new List<ComissionFactory>(),
                ShareASale = new List<ShareASale>(),
                PepperJam = new List<PepperJam>()
            };
            return time;
        }

        public static GoogleAnalytics GenerateGoogle()
        {
            GoogleAnalytics response = new GoogleAnalytics()
            {
                Users = GenerateInt(),
                Sessions = GenerateInt(),
                BounceRate = GenerateFloat(),
                AvgSessionDuration = GenerateInt(),
                Country = GenerateString(15)
            };
            return response;
        }

        public static ComissionFactory GenerateCF()
        {
            ComissionFactory response = new ComissionFactory()
            {
                MerchantID = GenerateInt(),
                MerchantName = GenerateString(10),
                MerchantAvatarURL = GenerateString(25),
                ImpressionsTotal = GenerateInt(),
                ImpressionsBot = GenerateInt(),
                ClicksTotal = GenerateInt(),
                ClicksBot = GenerateInt(),
                TransactionsPending = GenerateInt(),
                TransactionsApproved = GenerateInt(),
                TransactionsVoid = GenerateInt(),
                SaleValuePending = GenerateFloat(),
                SaleValueApproved = GenerateFloat(),
                SaleValueVoid = GenerateFloat(),
                ComissionPending = GenerateFloat(),
                ComissionAprroved = GenerateFloat(),
                ComissionVoid = GenerateFloat()
            };
            return response;
        }

        public static ShareASale GenerateSAS()
        {
            ShareASale response = new ShareASale()
            {
                CurrentStatus = GenerateString(5),
                UniqueHits = GenerateInt(),
                TodaysSales = GenerateInt(),
                Conversions = GenerateInt(),
                Reversals = GenerateInt(),
                ManualCredits = GenerateInt(),
                EPC = GenerateString(5),
                LastPageClicked = GenerateString(10),
                NumberSales = GenerateInt(),
                NumberLeads = GenerateInt(),
                NumberTwoTiers = GenerateInt(),
                NumberBonuses = GenerateInt(),
                NumberPayPerCell = GenerateFloat(),
                NumberLeapFrog = GenerateInt()
            };
            return response;
        }

        public static PepperJam GeneratePJ()
        {
            PepperJam response = new PepperJam()
            {
                Method = GenerateString(11),
                Notes = GenerateString(30),
                Amount = GenerateFloat(),
                Date = GenerateDate()
            };
            return response;
        }

        public static int GenerateInt()
        {
            return rand.Next(1000);
        }

        public static float GenerateFloat()
        {
            return (float)(Math.Round((rand.NextDouble() * 10.0), 2));
        }

        public static string GenerateString(int length)
        {
            string characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz";
            StringBuilder result = new StringBuilder(length);
            for (int i = 0; i < length; i++)
            {
                result.Append(characters[rand.Next(characters.Length)]);
            }
            return result.ToString();
        }

        public static DateTime GenerateDate()
        {
            DateTime start = new DateTime(1995, 1, 1);
            int range = (DateTime.Today - start).Days;
            return start.AddDays(rand.Next(range));
        }
    }
}
