using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

namespace netflix_eco_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;
        private readonly string _baseUrl = "https://api.themoviedb.org/3";
        private readonly string _bearerToken;

        public MovieController(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClient = httpClientFactory.CreateClient();
            _config = config;
            _bearerToken = _config["TMDb:BearerToken"]; ; // Ajoute dans appsettings.json
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _bearerToken);
        }

        // GET api/movie/search?query=inception&type=movie
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] string query, [FromQuery] string type = "movie")
        {
            if (string.IsNullOrWhiteSpace(query)) return BadRequest("Query is required.");

            var url = $"{_baseUrl}/search/{type}?query={Uri.EscapeDataString(query)}&language=fr-FR";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonSerializer.Deserialize<JsonElement>(content);
            return Ok(json);
        }

        // GET api/movie/details/11?type=movie
        [HttpGet("details/{id}")]
        public async Task<IActionResult> GetDetails([FromRoute] int id, [FromQuery] string type = "movie")
        {
            var url = $"{_baseUrl}/{type}/{id}?language=fr-FR";

            var response = await _httpClient.GetAsync(url);
            if (!response.IsSuccessStatusCode) return StatusCode((int)response.StatusCode, await response.Content.ReadAsStringAsync());

            var content = await response.Content.ReadAsStringAsync();
            var json = JsonSerializer.Deserialize<JsonElement>(content);
            return Ok(json);
        }
    }
}