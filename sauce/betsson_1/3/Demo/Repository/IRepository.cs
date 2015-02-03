using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Demo.Models;

namespace Demo.Repository
{
    interface IRepository
    {
        List<FlickrImage> GetImagesByTags(string tags);
    }
}
