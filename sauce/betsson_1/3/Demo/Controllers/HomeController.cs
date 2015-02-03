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

        public ActionResult GetImages(string tags) { 
            var flickrRepository = new FlickrRepository();
            return Json(flickrRepository.GetImagesByTags(tags), JsonRequestBehavior.AllowGet);
        }

    }
}
