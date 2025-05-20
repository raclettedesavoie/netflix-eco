using Microsoft.AspNetCore.Builder;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
    .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddEnvironmentVariables();

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpClient();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(); // Swashbuckle (UI)

// 👉 NSwag
builder.Services.AddOpenApiDocument(config =>
{
    config.Title = "Movie API";
    config.Version = "v1";
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000","https://netflix-eco.onrender.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "7238";
builder.WebHost.UseUrls($"http://+:{port}");

var app = builder.Build();

// CORS : doit être avant UseAuthorization / UseRouting
app.UseCors("AllowLocalhost");

// Swagger et OpenAPI si en dev
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseOpenApi(); // NSwag
    app.UseSwaggerUI();
}

// Redirection HTTPS uniquement en local (Render est déjà en HTTPS)
if (!app.Environment.IsProduction())
{
    app.UseHttpsRedirection();
}

app.UseAuthorization();
app.MapControllers();
app.Run();