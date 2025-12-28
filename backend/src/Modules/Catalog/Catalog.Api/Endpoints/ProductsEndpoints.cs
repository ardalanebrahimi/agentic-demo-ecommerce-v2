using Catalog.Application.DTOs;
using Catalog.Domain.Entities;
using Catalog.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Api.Endpoints;

public static class ProductsEndpoints
{
    public static IEndpointRouteBuilder MapProductsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/products")
            .WithTags("Products");

        group.MapGet("/", GetProducts)
            .WithName("GetProducts")
            .WithOpenApi();

        group.MapGet("/{id:guid}", GetProductById)
            .WithName("GetProductById")
            .WithOpenApi();

        group.MapPost("/", CreateProduct)
            .WithName("CreateProduct")
            .WithOpenApi();

        return app;
    }

    private static async Task<IResult> GetProducts(
        CatalogDbContext db,
        Guid? categoryId = null)
    {
        var query = db.Products
            .Include(p => p.Category)
            .AsQueryable();

        if (categoryId.HasValue)
        {
            query = query.Where(p => p.CategoryId == categoryId.Value);
        }

        var products = await query
            .Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Brand,
                p.PriceAmount,
                p.PriceCurrency,
                p.CategoryId,
                p.Category != null ? p.Category.Name : null,
                p.ShortDescription))
            .ToListAsync();

        return Results.Ok(products);
    }

    private static async Task<IResult> GetProductById(Guid id, CatalogDbContext db)
    {
        var product = await db.Products
            .Include(p => p.Category)
            .Where(p => p.Id == id)
            .Select(p => new ProductDto(
                p.Id,
                p.Name,
                p.Brand,
                p.PriceAmount,
                p.PriceCurrency,
                p.CategoryId,
                p.Category != null ? p.Category.Name : null,
                p.ShortDescription))
            .FirstOrDefaultAsync();

        return product is null
            ? Results.NotFound()
            : Results.Ok(product);
    }

    private static async Task<IResult> CreateProduct(
        CreateProductRequest request,
        CatalogDbContext db)
    {
        var categoryExists = await db.Categories.AnyAsync(c => c.Id == request.CategoryId);
        if (!categoryExists)
        {
            return Results.BadRequest(new { error = "Category not found" });
        }

        var product = Product.Create(
            request.Name,
            request.Brand,
            request.PriceAmount,
            request.PriceCurrency,
            request.CategoryId,
            request.ShortDescription);

        db.Products.Add(product);
        await db.SaveChangesAsync();

        var category = await db.Categories.FindAsync(request.CategoryId);

        var productDto = new ProductDto(
            product.Id,
            product.Name,
            product.Brand,
            product.PriceAmount,
            product.PriceCurrency,
            product.CategoryId,
            category?.Name,
            product.ShortDescription);

        return Results.Created($"/api/products/{product.Id}", productDto);
    }
}
