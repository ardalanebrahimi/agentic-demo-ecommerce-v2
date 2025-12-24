namespace Catalog.Application.DTOs;

public record ProductDto(
    Guid Id,
    string Name,
    string? Brand,
    decimal PriceAmount,
    string PriceCurrency,
    Guid CategoryId,
    string? CategoryName,
    string? ShortDescription);
