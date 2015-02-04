using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Demo.Cache
{
    public static class CacheHelper<T>
    {
        /// <summary>
        /// Simple cache helper that support
        /// </summary>
        /// <param name="key"></param>
        /// <param name="function"></param>
        /// <returns></returns>
        public static T Get(string key, Func<T> function) {
            //var obj = (T)HttpContext.Current.Cache[key];
            var obj = HttpContext.Current.Cache[key];
            
            if (obj == null)
            {
                // if no cached data is found
                obj = function.Invoke();
                HttpContext.Current.Cache.Add(key, obj, null, DateTime.Now.AddMinutes(3), TimeSpan.Zero, System.Web.Caching.CacheItemPriority.Normal, null);
            }

            // if cached append obj data
            return (T)obj;
        }
    }
}