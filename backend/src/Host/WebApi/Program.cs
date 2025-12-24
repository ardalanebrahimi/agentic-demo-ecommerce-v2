using Catalog.Api;
using Catalog.Infrastructure;
using Catalog.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>()
            ?? ["http://localhost:4200"];
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

app.UseHttpsRedirection();
app.UseCors();

// Map Catalog endpoints
app.MapCatalogEndpoints();

app.Run();
