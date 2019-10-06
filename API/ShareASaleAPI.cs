using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Security.Cryptography;
using System.Text;
using System.Net;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using INDUSTRY_PROJECT.Database;

namespace INDUSTRY_PROJECT.API
{
    public class ShareASaleAPI
    {
        /// <summary>
        /// Request example and documentation found at https://account.shareasale.com/a-apimanager.cfm?
        /// </summary>
        /// <param name="actionVerb">name of api to invoke</param>
        /// <param name="parameterString"> url encoded arguments without a leading '&'</param>
        /// <returns></returns>
        public static void CallShareASale(string actionVerb = "dailyActivity", string parameterString = "")
        {
            //EXAMPLE REQUEST = https://api.shareasale.com/x.cfm?action=dailyActivity&affiliateId=1134550&token=ec1Pxz3xJWbmntb8&version=2.3
            string affiliateid = Config.Configuration.config.SAS_AffiliateID;
            string apiToken = Config.Configuration.config.SAS_Token;
            string apiSecret = Config.Configuration.config.SAS_Secret;
            string apiVersion = "2.3";

            string ut = DateTime.Now.ToUniversalTime().ToString("r");

            SHA256Managed hasher = new SHA256Managed();

            byte[] hash = hasher.ComputeHash(Encoding.UTF8.GetBytes(apiToken + ':' + ut + ':' + actionVerb + ':' + apiSecret));

            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < hash.Length; i++)
            {
                sb.Append(hash[i].ToString("x2"));
            }

            string authHeader = sb.ToString();

            WebRequest request = WebRequest.Create(
                "https://api.shareasale.com/x.cfm?affiliateID=" + affiliateid +
                "&token=" + apiToken +
                "&version=" + apiVersion +
                "&action=" + actionVerb +
                '&' + parameterString
            );

            request.Method = "GET";
            request.Headers.Add("x-ShareASale-Date", ut);
            request.Headers.Add("x-ShareASale-Authentication", authHeader);

            //StreamReader reader = new StreamReader(request.GetResponse().GetResponseStream());
            //return reader.ReadToEnd();
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            string myResponse = "";
            using (System.IO.StreamReader sr = new System.IO.StreamReader(response.GetResponseStream()))
            {
                myResponse = sr.ReadToEnd();
            }
            List<SASResponse> apiResponse = JsonConvert.DeserializeObject<List<SASResponse>>(myResponse);
            //Need to change the csv response format to DeserializeObject
           //currently returning as "Merchant|Status|Commissions|Unique Hits|Sales|Conversions|Reversals|Manual Credits|EPC|Last Page Clicked|Number Sales|Number Leads|Number TwoTier|Number Bonuses|Number PayPerCall|Number LeapFrog|Sale Commissions|Lead Commissions|TwoTier Commissions|Bonus Commissions|PayPerCall Commissions|LeapFrog Commissions\r\n67286-Brooklyn Bedding-www.brooklynbedding.com|Yes|$0|3|0|0%|0|0|$0||0|0|0|0|0|0|$0|$0|$0|$0|$0|$0\r\n76815-GoodMorning.com-www.goodmorning.com|Yes|$202.51|2|3|150%|0|0|$10125.5||3|0|0|0|0|0|$202.51|$0|$0|$0|$0|$0\r\n59174-Wink Beds LLC-winkbeds.com|Yes|$0|1|0|0%|0|0|$0||0|0|0|0|0|0|$0|$0|$0|$0|$0|$0\r\n67066-Brentwood Home-brentwoodhome.com|Yes|$0|1|0|0%|0|0|$0||0|0|0|0|0|0|$0|$0|$0|$0|$0|$0\r\n73372-Puffy Mattress-puffy.com|yes|$0|1|0|0%|0|0|$0||0|0|0|0|0|0|$0|$0|$0|$0|$0|$0\r\n76123-Happsy-happsy.com|yes|$66.42|1|1|100%|0|0|$6642||1|0|0|0|0|0|$66.42|$0|$0|$0|$0|$0\r\n87165-Polysleep Inc-polysleep.ca|Yes|$0|1|0|0%|0|0|$0||0|0|0|0|0|0|$0|$0|$0|$0|$0|$0\r\nSUM  ||$268.93|10|4|40.00%|0|0|$2689.30||4|0|0|0|0|0|$268.93|$0|$0|$0|$0|$0| "
            
            
            //List<SASResponse> apiResponse = JsonConvert.Serialize(myResponse);
            //var lines = System.IO.File.ReadAllLines(@"C:\file.txt");
            //foreach (string line in lines)
            //    csv.Add(line.Split(','));      
            //string json = new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(csv);



            using (DbModel db = new DbModel())
            {
                foreach (SASResponse item in apiResponse)
                {
                    Database.ShareASale input = new Database.ShareASale()
                    {
                        TimeStampID = 1,
                        CurrentStatus = item.CurrentStatus,
                        UniqueHits = item.UniqueHits,
                        TodaysSales = item.TodaysSales,
                        Conversions = item.Conversions,
                        Reversals = item.Reversals,
                        ManualCredits = item.ManualCredits,
                        EPC = item.EPC,
                        LastPageClicked = item.LastPageClicked,
                        NumberSales = item.NumberSales,
                        NumberLeads = item.NumberLeads,
                        NumberTwoTiers = item.NumberTwoTiers,
                        NumberBonuses = item.NumberBonuses,
                        NumberPayPerCell = item.NumberPayPerCell,
                        NumberLeapFrog = item.NumberLeapFrog
                    };
                    db.ShareASale.Add(input);
                }
                db.SaveChanges();
            }

        }
    }
    public class SASResponse
    {
        public string CurrentStatus { get; set; }
        public int UniqueHits { get; set; }
        public float TodaysSales { get; set; }
        public int Conversions { get; set; }
        public int Reversals { get; set; }
        public int ManualCredits { get; set; }
        public string EPC { get; set; }
        public string LastPageClicked { get; set; }
        public int NumberSales { get; set; }
        public int NumberLeads { get; set; }
        public int NumberTwoTiers { get; set; }
        public int NumberBonuses { get; set; }
        public float NumberPayPerCell { get; set; }
        public int NumberLeapFrog { get; set; }
    }
}
