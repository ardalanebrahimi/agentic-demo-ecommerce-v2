using System.Text;
using Auth.Api;
using Catalog.Api;
using Catalog.Infrastructure;
using Catalog.Infrastructure.Persistence;
using Orders.Api;
using Orders.Infrastructure;
using Orders.Infrastructure.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add JWT Authentication
var jwtKey = builder.Configuration["Jwt:Key"]
    ?? throw new InvalidOperationException("JWT Key not configured");
var jwtIssuer = builder.Configuration["Jwt:Issuer"] ?? "ECommerceDemo";
var jwtAudience = builder.Configuration["Jwt:Audience"] ?? "ECommerceDemo";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
        };
    });

builder.Services.AddAuthorization();

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

// Add Orders module
builder.Services.AddOrdersInfrastructure(connectionString);

var app = builder.Build();

// Apply migrations and seed data (guarded by env var for production safety)
var runMigrations = builder.Configuration.GetValue<bool>("RUN_MIGRATIONS", defaultValue: true);
if (runMigrations)
{
    using var scope = app.Services.CreateScope();

    // Migrate Catalog
    var catalogDb = scope.ServiceProvider.GetRequiredService<CatalogDbContext>();
    await catalogDb.Database.MigrateAsync();
    await CatalogDbContextSeed.SeedAsync(catalogDb);

    // Migrate Orders
    var ordersDb = scope.ServiceProvider.GetRequiredService<OrdersDbContext>();
    await ordersDb.Database.MigrateAsync();
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

app.UseAuthentication();
app.UseAuthorization();

// Map Auth endpoints
app.MapAuthEndpoints();

// Map Catalog endpoints
app.MapCatalogEndpoints();

// Map Orders endpoints
app.MapOrdersEndpoints();

app.Run();
