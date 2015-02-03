using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using Demo.Models;
using Demo.Cache;
namespace Demo.Repository
{
    public class FlickrCacheableRepository : IRepository
    {

        FlickrRepository flickrRepository;

        public FlickrCacheableRepository() {
            flickrRepository = new FlickrRepository();
        }

        /// <summary>
        /// Returns image based on the tag
        /// </summary>
        /// <param name="tags"></param>
        /// <returns></returns>
        public List<FlickrImage> GetImagesByTags(string tags)
        {
            // Load the data from the cache if it exist
            return CacheHelper<List<FlickrImage>>.Get(tags, () => {
                return flickrRepository.GetImagesByTags(tags);
            });
            
        }
    }
}
