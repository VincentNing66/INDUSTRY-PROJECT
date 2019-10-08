using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using INDUSTRY_PROJECT.Database;

namespace INDUSTRY_PROJECT.API
{
    public class ComissionFactory
    {
        public const string CFURL = "https://api.commissionfactory.com/V1/Affiliate/Reports/Merchant";

        public static void CallComissionFactory(int id)
        {
            DateTime today = DateTime.Today;
            DateTime yesterday = today.AddDays(-1);

            string apiParams = $"?apiKey={Config.Configuration.config.CFKey}&fromDate={yesterday.ToString("yyyy-MM-dd")}&toDate={today.ToString("yyyy-MM-dd")}";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(CFURL+apiParams);//
            request.Method = "GET";
            request.KeepAlive = true;
            request.ContentType = "appication/json";
            request.Headers.Add("Content-Type", "appication/json");
            //request.ContentType = "application/x-www-form-urlencoded";

            HttpWebResponse response = (HttpWebResponse)request.GetResponse();
            string myResponse = "";
            using (System.IO.StreamReader sr = new System.IO.StreamReader(response.GetResponseStream()))
            {
                myResponse = sr.ReadToEnd();
            }
            List<CFResponse> apiResponse = JsonConvert.DeserializeObject<List<CFResponse>>(myResponse);
            using (DbModel db = new DbModel())
            {
                foreach (CFResponse item in apiResponse)
                {
                    Database.ComissionFactory input = new Database.ComissionFactory()
                    {
                        MerchantID = item.MerchantId,
                        MerchantName = item.MerchantName,
                        MerchantAvatarURL = item.MerchantAvatarUrl,
                        ImpressionsTotal = item.ImpressionsTotal,
                        ImpressionsBot = item.ImpressionsBot,
                        ClicksTotal = item.ClicksTotal,
                        ClicksBot = item.ClicksBot,
                        TransactionsPending = item.TransactionsPending,
                        TransactionsApproved = item.TransactionsApproved,
                        TransactionsVoid = item.TransactionsVoid,
                        SaleValuePending = item.SaleValuePending,
                        SaleValueApproved = item.SaleValueApproved,
                        SaleValueVoid = item.SaleValueVoid,
                        ComissionPending = item.CommissionPending,
                        ComissionAprroved = item.CommissionApproved,
                        ComissionVoid = item.CommissionVoid,
                        TimeStampID = id
                    };
                    db.ComissionFactory.Add(input);
                }
                db.SaveChanges();
            }

        }

        public class CFResponse { 
            public int MerchantId { get; set; }
            public string MerchantName {get; set; }
            public string MerchantAvatarUrl {get; set; }
            public int ImpressionsTotal {get; set; }
            public int ImpressionsBot {get; set; }
            public int ClicksTotal {get; set; }
            public int ClicksBot {get; set; }
            public int TransactionsPending {get; set; }
            public int TransactionsApproved {get; set; }
            public int TransactionsVoid {get; set; }
            public float SaleValuePending {get; set; }
            public float SaleValueApproved {get; set; }
            public float SaleValueVoid {get; set; }
            public float CommissionPending {get; set; }
            public float CommissionApproved {get; set; }
            public float CommissionVoid {get; set; }
        }
    }
}
