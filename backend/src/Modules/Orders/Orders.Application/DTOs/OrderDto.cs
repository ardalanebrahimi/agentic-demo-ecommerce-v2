namespace Orders.Application.DTOs;

public record OrderDto(
    Guid Id,
    string OrderNumber,
    DateTime CreatedAt,
    DateTime? UpdatedAt,
    string Status,
    ShippingAddressDto ShippingAddress,
    string ShippingMethod,
    decimal ShippingCost,
    decimal Subtotal,
    decimal Total,
    string? CustomerEmail,
    List<OrderItemDto> Items);
