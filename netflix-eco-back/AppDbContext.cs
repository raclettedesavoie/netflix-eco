using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<SerieBase>().OwnsOne(s => s.NextEpisodeToAir);
    }
    public DbSet<SerieBase> Series { get; set; }
}
