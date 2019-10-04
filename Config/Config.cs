using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.IO;

namespace INDUSTRY_PROJECT.Config
{
    public class ConfigModel
    {
        public string ConnectionString { get; set; }
        public string CFKey { get; set; }
    }
    public class Configuration
    {
        //configuration class to get configuration information from
        public static ConfigModel config;
        public static void configure()
        {
            string file;
            
            file = Path.Combine(AppContext.BaseDirectory, "_config.json");

            //ensures _config.json exists
            if (!File.Exists(file))
            {
                throw new ApplicationException("Unable to locate the _config.json file.");
            }

            //loads configuration from _config.json file into memory
            config = JsonConvert.DeserializeObject<ConfigModel>(File.ReadAllText(file));
        }
    }
}
