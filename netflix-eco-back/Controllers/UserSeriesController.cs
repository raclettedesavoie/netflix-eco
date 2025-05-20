using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace netflix_eco_back.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserSeriesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UserSeriesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/series
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SerieBase>>> GetSeries()
        {
            return await _context.Series.ToListAsync();
        }

        // GET: api/series/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SerieBase>> GetSerie(int id)
        {
            var serie = await _context.Series.FindAsync(id);

            if (serie == null)
                return NotFound();

            return serie;
        }

        [HttpPost]
        public async Task<ActionResult<SerieBase>> CreateSerie(SerieBase serie)
        {
            // S'assurer que l'ID n'est pas défini ou égal à 0 (car auto-incrémenté)
            serie.Id = 0;

            _context.Series.Add(serie);
            await _context.SaveChangesAsync();

            // Retourne la ressource créée avec son id et l'url
            return CreatedAtAction(nameof(GetSerie), new { id = serie.SerieId }, serie);
        }

        // DELETE: api/series/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSerie(int id)
        {
            var serie = await _context.Series.FirstOrDefaultAsync(serie=>serie.SerieId == id);
            if (serie == null)
                return NotFound();

            _context.Series.Remove(serie);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SerieExists(int id)
        {
            return _context.Series.Any(e => e.Id == id);
        }
    }
}