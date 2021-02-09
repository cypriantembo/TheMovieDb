using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Server.Filters;
using Server.Model;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    [EnableCors("Allow")]
    [ApiKey]
    public class TmdbController : ControllerBase
    {
        string api_key = "e2d7e58bc68b352267f2ea4c2387eb6e";
        [Route("popular")]
        // api/Tmdb/popular?page=100
        public async Task<ActionResult<Root>> GetAll(int page=1)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"https://api.themoviedb.org/3/movie/popular?api_key={api_key}&language=en-US&page={page}"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var responseList = JsonConvert.DeserializeObject<Root>(apiResponse);
                    return responseList;
                }
            }
        }

        [Route("search")]
        //?query="spiderman"

        public async Task<IEnumerable<Movies>> SearchMovie(string query)
        {
            {
                using (var httpClient = new HttpClient())
                {
                    using (var response = await httpClient.GetAsync($"https://api.themoviedb.org/3/search/movie?api_key={api_key}&query={query}"))
                    {
                        string apiResponse = await response.Content.ReadAsStringAsync();
                        var responseList = JsonConvert.DeserializeObject<Root>(apiResponse);
                        return responseList.results.ToList();
                    }
                }
            }
        }

        [Route("id/{id:int}")]

        public async Task<ActionResult<Movies>> SearchId(int? id)
        {
            using (var httpClient = new HttpClient())
            {
                using (var response = await httpClient.GetAsync($"http://api.themoviedb.org/3/movie/{id}?api_key={api_key}&language=en-US"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    var responseObject = JsonConvert.DeserializeObject<Movies>(apiResponse);
                    return responseObject;
                }
            }
        }

    }
}
