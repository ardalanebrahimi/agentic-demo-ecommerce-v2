using Catalog.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Catalog.Infrastructure.Persistence;

public static class CatalogDbContextSeed
{
    public static async Task SeedAsync(CatalogDbContext context)
    {
        if (await context.Categories.AnyAsync())
            return;

        var electronics = new Category(Guid.Parse("11111111-1111-1111-1111-111111111111"), "Electronics");
        var clothing = new Category(Guid.Parse("22222222-2222-2222-2222-222222222222"), "Clothing");
        var furniture = new Category(Guid.Parse("33333333-3333-3333-3333-333333333333"), "Furniture");
        var sports = new Category(Guid.Parse("44444444-4444-4444-4444-444444444444"), "Sports");
        var books = new Category(Guid.Parse("55555555-5555-5555-5555-555555555555"), "Books");

        context.Categories.AddRange(electronics, clothing, furniture, sports, books);

        var products = new List<Product>
        {
            new Product(Guid.NewGuid(), "Sony WH-1000XM5", "Sony", 349.00m, "USD", electronics.Id, "Premium noise-cancelling headphones"),
            new Product(Guid.NewGuid(), "Apple Watch Ultra 2", "Apple", 799.00m, "USD", electronics.Id, "Rugged smartwatch for athletes"),
            new Product(Guid.NewGuid(), "MacBook Pro 14\" M3", "Apple", 1999.00m, "USD", electronics.Id, "Professional laptop with M3 chip"),
            new Product(Guid.NewGuid(), "Samsung Galaxy S24", "Samsung", 899.00m, "USD", electronics.Id, "Flagship smartphone with AI features"),
            new Product(Guid.NewGuid(), "Nike Tech Fleece Hoodie", "Nike", 120.00m, "USD", clothing.Id, "Comfortable fleece hoodie for everyday wear"),
            new Product(Guid.NewGuid(), "Levi's 501 Original Jeans", "Levi's", 89.00m, "USD", clothing.Id, "Classic straight-leg denim jeans"),
            new Product(Guid.NewGuid(), "Adidas Ultraboost Running Shoes", "Adidas", 180.00m, "USD", sports.Id, "High-performance running shoes"),
            new Product(Guid.NewGuid(), "Herman Miller Aeron Chair", "Herman Miller", 1395.00m, "USD", furniture.Id, "Ergonomic office chair"),
            new Product(Guid.NewGuid(), "IKEA MALM Desk", "IKEA", 179.00m, "USD", furniture.Id, "Modern workspace desk"),
            new Product(Guid.NewGuid(), "Nike Air Zoom Pegasus 40", "Nike", 130.00m, "USD", sports.Id, "Versatile running shoe"),
            new Product(Guid.NewGuid(), "Atomic Habits", "Penguin", 18.00m, "USD", books.Id, "Guide to building good habits"),
            new Product(Guid.NewGuid(), "The Psychology of Money", "Harriman House", 20.00m, "USD", books.Id, "Timeless lessons on wealth"),
            new Product(Guid.NewGuid(), "Patagonia Better Sweater", "Patagonia", 139.00m, "USD", clothing.Id, "Eco-friendly fleece jacket"),
            new Product(Guid.NewGuid(), "Bose QuietComfort Earbuds", "Bose", 279.00m, "USD", electronics.Id, "True wireless noise-cancelling earbuds"),
            new Product(Guid.NewGuid(), "Wilson Pro Staff Tennis Racket", "Wilson", 229.00m, "USD", sports.Id, "Professional tennis racket"),
        };

        context.Products.AddRange(products);
        await context.SaveChangesAsync();
    }
}
