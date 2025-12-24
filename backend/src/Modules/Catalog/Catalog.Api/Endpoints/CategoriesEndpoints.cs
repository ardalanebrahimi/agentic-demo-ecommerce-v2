using Catalog.Application.DTOs;
using Catalog.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Api.Endpoints;

public static class CategoriesEndpoints
{
    public static IEndpointRouteBuilder MapCategoriesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/categories")
            .WithTags("Categories");

        group.MapGet("/", GetCategories)
            .WithName("GetCategories")
            .WithOpenApi();

        return app;
    }

    private static async Task<IResult> GetCategories(CatalogDbContext db)
    {
        var categories = await db.Categories
            .Select(c => new CategoryDto(c.Id, c.Name))
            .ToListAsync();

        return Results.Ok(categories);
    }
}
