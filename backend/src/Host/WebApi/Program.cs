using Catalog.Api;
using Catalog.Infrastructure;
using Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
            ?? ["http://localhost:4200", "https://ardalanebrahimi.github.io"];
        policy.WithOrigins(allowedOrigins)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add Catalog module
var connectionString = builder.Configuration.GetConnectionString("CatalogDb")
    ?? throw new InvalidOperationException("Connection string 'CatalogDb' not found.");
builder.Services.AddCatalogInfrastructure(connectionString);

var app = builder.Build();

// Apply migrations and seed data (guarded by env var for production safety)
var runMigrations = builder.Configuration.GetValue<bool>("RUN_MIGRATIONS", defaultValue: true);
if (runMigrations)
{
    using var scope = app.Services.CreateScope();
    var db = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
    await db.Database.MigrateAsync();
    await CatalogDbContextSeed.SeedAsync(db);
}

// Configure the HTTP request pipeline
// Swagger enabled in all environments (per ARD)
app.MapOpenApi();
app.MapScalarApiReference();
app.UseSwagger();
app.UseSwaggerUI();

// Only use HTTPS redirection in non-containerized environments
// Container Apps handles HTTPS at the ingress level
if (!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("CONTAINER_APP_NAME")))
{
    // Skip HTTPS redirection in Container Apps
}
else
{
    app.UseHttpsRedirection();
}
app.UseCors();

// Map Catalog endpoints
app.MapCatalogEndpoints();

app.Run();
