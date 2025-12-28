namespace Orders.Domain.Entities;

public class OrderItem
{
    public Guid Id { get; private set; }
    public Guid ProductId { get; private set; }
    public string ProductName { get; private set; } = string.Empty;
    public decimal UnitPrice { get; private set; }
    public string Currency { get; private set; } = "USD";
    public int Quantity { get; private set; }

    public decimal LineTotal => UnitPrice * Quantity;

    private OrderItem() { } // EF Core

    public OrderItem(
        Guid id,
        Guid productId,
        string productName,
        decimal unitPrice,
        string currency,
        int quantity)
    {
        Id = id;
        ProductId = productId;
        ProductName = productName;
        UnitPrice = unitPrice;
        Currency = currency;
        Quantity = quantity;
    }

    public static OrderItem Create(
        Guid productId,
        string productName,
        decimal unitPrice,
        string currency,
        int quantity)
    {
        return new OrderItem(
            Guid.NewGuid(),
            productId,
            productName,
            unitPrice,
            currency,
            quantity);
    }
}
