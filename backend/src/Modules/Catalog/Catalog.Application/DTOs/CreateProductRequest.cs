using System.ComponentModel.DataAnnotations;

namespace Catalog.Application.DTOs;

public record CreateProductRequest(
    [Required]
    [StringLength(200, MinimumLength = 1)]
    string Name,

    string? Brand,

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    decimal PriceAmount,

    [Required]
    [StringLength(3, MinimumLength = 3)]
    string PriceCurrency,

    [Required]
    Guid CategoryId,

    [StringLength(500)]
    string? ShortDescription);
