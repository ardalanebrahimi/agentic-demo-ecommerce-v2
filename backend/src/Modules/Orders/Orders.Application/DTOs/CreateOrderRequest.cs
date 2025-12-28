using System.ComponentModel.DataAnnotations;

namespace Orders.Application.DTOs;

public record CreateOrderItemRequest(
    [Required]
    Guid ProductId,

    [Required]
    [StringLength(200, MinimumLength = 1)]
    string ProductName,

    [Required]
    [Range(0.01, double.MaxValue, ErrorMessage = "Price must be greater than 0")]
    decimal UnitPrice,

    [Required]
    [StringLength(3, MinimumLength = 3)]
    string Currency,

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1")]
    int Quantity);

public record CreateOrderRequest(
    [Required]
    ShippingAddressDto ShippingAddress,

    [Required]
    [StringLength(20, MinimumLength = 1)]
    string ShippingMethod,

    string? CustomerEmail,

    [Required]
    [MinLength(1, ErrorMessage = "At least one item is required")]
    List<CreateOrderItemRequest> Items);
