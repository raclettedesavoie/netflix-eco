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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Swashbuckle (UI classique)
    app.UseSwagger();
    app.UseSwaggerUI();

    // 👉 NSwag (OpenAPI + UI alternative + générateur client)
    app.UseOpenApi();           // Route: /swagger/v1/swagger.json
    app.UseSwaggerUI();        // Route: /swagger
}

// CORS
app.UseCors("AllowLocalhost");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
