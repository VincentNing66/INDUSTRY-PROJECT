using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace INDUSTRY_PROJECT.Database
{
    public class Database : DbContext
    {
        private string connectionString = "connections string here";

        public DbSet<APIClass> TableName { get; set; }
        public DbSet<TimeStamp> TimeStamps { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString);
        }

        public void Create()
        {
            Database.EnsureCreated();
        }
    }

    //class layout for API
    public class APIClass
    {
        public int APIClassID { get; set; } //NOTE: must include ID
        public int APIInfo { get; set; }
    }

    public class TimeStamp
    {
        public int TimeStampID { get; set; }
        public DateTime Time { get; set; }
    }
}
