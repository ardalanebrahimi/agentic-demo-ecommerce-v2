namespace Orders.Domain.Entities;

public class Order
{
    public Guid Id { get; private set; }
    public string OrderNumber { get; private set; } = string.Empty;
    public DateTime CreatedAt { get; private set; }
    public DateTime? UpdatedAt { get; private set; }
    public OrderStatus Status { get; private set; }

    // Shipping Address
    public string ShippingFirstName { get; private set; } = string.Empty;
    public string ShippingLastName { get; private set; } = string.Empty;
    public string ShippingAddress { get; private set; } = string.Empty;
    public string ShippingCity { get; private set; } = string.Empty;
    public string ShippingState { get; private set; } = string.Empty;
    public string ShippingZipCode { get; private set; } = string.Empty;
    public string ShippingPhone { get; private set; } = string.Empty;

    // Shipping Method
    public string ShippingMethod { get; private set; } = string.Empty;
    public decimal ShippingCost { get; private set; }

    // Totals
    public decimal Subtotal { get; private set; }
    public decimal Total { get; private set; }

    // Customer
    public string? CustomerEmail { get; private set; }

    // Order Items
    private readonly List<OrderItem> _items = new();
    public IReadOnlyCollection<OrderItem> Items => _items.AsReadOnly();

    private Order() { } // EF Core

    public Order(
        Guid id,
        string orderNumber,
        DateTime createdAt,
        DateTime? updatedAt,
        OrderStatus status,
        string shippingFirstName,
        string shippingLastName,
        string shippingAddress,
        string shippingCity,
        string shippingState,
        string shippingZipCode,
        string shippingPhone,
        string shippingMethod,
        decimal shippingCost,
        decimal subtotal,
        decimal total,
        string? customerEmail,
        List<OrderItem> items)
    {
        Id = id;
        OrderNumber = orderNumber;
        CreatedAt = createdAt;
        UpdatedAt = updatedAt;
        Status = status;
        ShippingFirstName = shippingFirstName;
        ShippingLastName = shippingLastName;
        ShippingAddress = shippingAddress;
        ShippingCity = shippingCity;
        ShippingState = shippingState;
        ShippingZipCode = shippingZipCode;
        ShippingPhone = shippingPhone;
        ShippingMethod = shippingMethod;
        ShippingCost = shippingCost;
        Subtotal = subtotal;
        Total = total;
        CustomerEmail = customerEmail;
        _items = items;
    }

    public static Order Create(
        string shippingFirstName,
        string shippingLastName,
        string shippingAddress,
        string shippingCity,
        string shippingState,
        string shippingZipCode,
        string shippingPhone,
        string shippingMethod,
        decimal shippingCost,
        string? customerEmail,
        List<OrderItem> items)
    {
        var subtotal = items.Sum(i => i.LineTotal);
        var total = subtotal + shippingCost;
        var orderNumber = GenerateOrderNumber();

        return new Order(
            Guid.NewGuid(),
            orderNumber,
            DateTime.UtcNow,
            null,
            OrderStatus.Pending,
            shippingFirstName,
            shippingLastName,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingZipCode,
            shippingPhone,
            shippingMethod,
            shippingCost,
            subtotal,
            total,
            customerEmail,
            items);
    }

    public void UpdateStatus(OrderStatus newStatus)
    {
        Status = newStatus;
        UpdatedAt = DateTime.UtcNow;
    }

    private static string GenerateOrderNumber()
    {
        var timestamp = DateTime.UtcNow.ToString("yyyyMMdd");
        var random = new Random().Next(10000, 99999);
        return $"ORD-{timestamp}-{random}";
    }
}
