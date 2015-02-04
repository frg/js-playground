using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Demo.Repository;

namespace Demo.Controllers
{
    public class HomeController : Controller
    {
        //
        // GET: /Home/

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetImages(string tags, bool cached = true) {
            // keeps a more formatted data structure for front end
            Dictionary<string, object> data = new Dictionary<string, object>();

            if (cached)
            {
                var flickrCacheableRepository = new FlickrCacheableRepository();
                data.Add("data", flickrCacheableRepository.GetImagesByTags(tags));
                // mark as cached
                data.Add("cached", 1);
                return Json(data, JsonRequestBehavior.DenyGet);
            }

            var flickrRepository = new FlickrRepository();
            data.Add("data", flickrRepository.GetImagesByTags(tags));
            // mark as not cached
            data.Add("cached", 0);
            return Json(data, JsonRequestBehavior.DenyGet);
        }

    }
}
