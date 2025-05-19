using Microsoft.AspNetCore.Mvc;

namespace netflix_eco_back.Controllers
{
    public class SeriesApi : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
