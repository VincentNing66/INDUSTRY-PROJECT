using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using INDUSTRY_PROJECT.Config;

namespace INDUSTRY_PROJECT.Database
{
    public class DbModel : DbContext
    {
        private string connectionString = Configuration.config.ConnectionString;

        public DbSet<UserAccount> UserAccount { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<Feature> Feature { get; set; }
        public DbSet<PermissionFeature> PermissionFeatures { get; set; }
        public DbSet<TimeStamp> TimeStamps { get; set; }
        public DbSet<GoogleAnalytics> GoogleAnalytics { get; set; }
        public DbSet<ComissionFactory> ComissionFactory { get; set; }
        public DbSet<ShareASale> ShareASale { get; set; }
        public DbSet<PepperJam> PepperJam { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PermissionFeature>().HasKey(sc => new { sc.PermissionID, sc.FeatureID });
        }
    }


    public class UserAccount
    {
        public int UserAccountID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string EmailAddress { get; set; }

        public int PermissionsID { get; set; }
        public Permission Permissions { get; set; }
    }

    public class Permission
    {
        public int PermissionID { get; set; }
        public string PermissionName { get; set; }
        public string Description { get; set; }

        public List<UserAccount> Users { get; set; }
        public List<PermissionFeature> Features { get; set; }
    }

    public class Feature
    {
        public int FeatureID { get; set; }
        public string FeatureName { get; set; }

        public List<PermissionFeature> Permissions { get; set; }
    }

    public class PermissionFeature
    {
        public int PermissionID { get; set; }
        public Permission Permission { get; set; }

        public int FeatureID { get; set; }
        public Feature Feature { get; set; }
    }

    public class TimeStamp
    {
        public int TimeStampID { get; set; }
        public DateTime TimeStampValue { get; set; }

        public List<GoogleAnalytics> GoogleAnalytics { get; set; }
        public List<ComissionFactory> ComissionFactory { get; set; }
        public List<ShareASale> ShareASale { get; set; }
        public List<PepperJam> PepperJam { get; set; }
    }

    public class GoogleAnalytics
    {
        [Key]
        public int ResponseID { get; set; }

        public int Users { get; set; }
        public int Sessions { get; set; }
        public float BounceRate { get; set; }
        public int AvgSessionDuration { get; set; }
        public string Source { get; set; }
        public string Country { get; set; }

        public int TimeStampID { get; set; }
        public TimeStamp TimeStamp { get; set; }
    }

    public class ComissionFactory
    {
        [Key]
        public int ResponseID { get; set; }

        public int MerchantID { get; set; }
        public string MerchantName { get; set; }
        public string MerchantAvatarURL { get; set; }
        public int ImpressionsTotal { get; set; }
        public int ImpressionsBot { get; set; }
        public int ClicksTotal { get; set; }
        public int ClicksBot { get; set; }
        public int TransactionsPending { get; set; }
        public int TransactionsApproved { get; set; }
        public int TransactionsVoid { get; set; }
        public float SaleValuePending { get; set; }
        public float SaleValueApproved { get; set; }
        public float SaleValueVoid { get; set; }
        public float ComissionPending { get; set; }
        public float ComissionAprroved { get; set; }
        public float ComissionVoid { get; set; }

        public int TimeStampID { get; set; }
        public TimeStamp TimeStamp { get; set; }
    }

    public class ShareASale
    {
        [Key]
        public int ResponseID { get; set; }

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

        public int TimeStampID { get; set; }
        public TimeStamp TimeStamp { get; set; }
    }

    public class PepperJam
    {
        [Key]
        public int ResponseID {get; set; }

        public int PaymentID { get; set; }
        public string Method { get; set; }
        public string Notes { get; set; }
        public float Amount { get; set; }
        public DateTime Date  { get; set; }

        public int TimeStampID { get; set; }
        public TimeStamp TimeStamp { get; set; }
    }
    
}
