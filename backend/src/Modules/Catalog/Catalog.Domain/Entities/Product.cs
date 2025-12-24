namespace Catalog.Domain.Entities;

public class Product
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;
    public string? Brand { get; private set; }
    public decimal PriceAmount { get; private set; }
    public string PriceCurrency { get; private set; } = "USD";
    public Guid CategoryId { get; private set; }
    public string? ShortDescription { get; private set; }

    public Category? Category { get; private set; }

    private Product() { } // EF Core

    public Product(
        Guid id,
        string name,
        string? brand,
        decimal priceAmount,
        string priceCurrency,
        Guid categoryId,
        string? shortDescription)
    {
        Id = id;
        Name = name;
        Brand = brand;
        PriceAmount = priceAmount;
        PriceCurrency = priceCurrency;
        CategoryId = categoryId;
        ShortDescription = shortDescription;
    }

    public static Product Create(
        string name,
        string? brand,
        decimal priceAmount,
        string priceCurrency,
        Guid categoryId,
        string? shortDescription = null)
    {
        return new Product(
            Guid.NewGuid(),
            name,
            brand,
            priceAmount,
            priceCurrency,
            categoryId,
            shortDescription);
    }
}
