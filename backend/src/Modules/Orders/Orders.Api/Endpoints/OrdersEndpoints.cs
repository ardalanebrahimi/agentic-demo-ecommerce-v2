using Orders.Application.DTOs;
using Orders.Domain.Entities;
using Orders.Infrastructure.Persistence;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace Orders.Api.Endpoints;

public static class OrdersEndpoints
{
    public static IEndpointRouteBuilder MapOrderEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/orders")
            .WithTags("Orders");

        group.MapPost("/", CreateOrder)
            .WithName("CreateOrder")
            .WithOpenApi();

        group.MapGet("/{id:guid}", GetOrderById)
            .WithName("GetOrderById")
            .WithOpenApi();

        group.MapGet("/", GetOrders)
            .WithName("GetOrders")
            .WithOpenApi();

        group.MapPatch("/{id:guid}/status", UpdateOrderStatus)
            .WithName("UpdateOrderStatus")
            .WithOpenApi();

        return app;
    }

    private static async Task<IResult> CreateOrder(
        CreateOrderRequest request,
        OrdersDbContext db)
    {
        if (request.Items == null || request.Items.Count == 0)
        {
            return Results.BadRequest(new { error = "At least one item is required" });
        }

        // Create order items from request
        var orderItems = request.Items.Select(item =>
            OrderItem.Create(
                item.ProductId,
                item.ProductName,
                item.UnitPrice,
                item.Currency,
                item.Quantity)).ToList();

        // Calculate subtotal
        var subtotal = orderItems.Sum(i => i.LineTotal);

        // Calculate shipping cost
        var shippingCost = CalculateShippingCost(request.ShippingMethod, subtotal);

        // Create order
        var order = Order.Create(
            request.ShippingAddress.FirstName,
            request.ShippingAddress.LastName,
            request.ShippingAddress.Address,
            request.ShippingAddress.City,
            request.ShippingAddress.State,
            request.ShippingAddress.ZipCode,
            request.ShippingAddress.Phone,
            request.ShippingMethod,
            shippingCost,
            request.CustomerEmail,
            orderItems);

        db.Orders.Add(order);
        await db.SaveChangesAsync();

        var orderDto = MapToOrderDto(order);
        return Results.Created($"/api/orders/{order.Id}", orderDto);
    }

    private static async Task<IResult> GetOrderById(Guid id, OrdersDbContext db)
    {
        var order = await db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
        {
            return Results.NotFound();
        }

        return Results.Ok(MapToOrderDto(order));
    }

    private static async Task<IResult> GetOrders(
        OrdersDbContext db,
        string? status = null)
    {
        var query = db.Orders
            .Include(o => o.Items)
            .AsQueryable();

        if (!string.IsNullOrEmpty(status) && Enum.TryParse<OrderStatus>(status, true, out var orderStatus))
        {
            query = query.Where(o => o.Status == orderStatus);
        }

        var orders = await query
            .OrderByDescending(o => o.CreatedAt)
            .Select(o => MapToOrderDto(o))
            .ToListAsync();

        return Results.Ok(orders);
    }

    private static async Task<IResult> UpdateOrderStatus(
        Guid id,
        UpdateOrderStatusRequest request,
        OrdersDbContext db)
    {
        var order = await db.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order is null)
        {
            return Results.NotFound();
        }

        if (!Enum.TryParse<OrderStatus>(request.Status, true, out var newStatus))
        {
            return Results.BadRequest(new { error = "Invalid status. Valid values: Pending, Processing, Shipped, Delivered, Cancelled" });
        }

        order.UpdateStatus(newStatus);
        await db.SaveChangesAsync();

        return Results.Ok(MapToOrderDto(order));
    }

    private static decimal CalculateShippingCost(string shippingMethod, decimal subtotal)
    {
        // Express shipping is always $14.99
        if (shippingMethod.Equals("Express", StringComparison.OrdinalIgnoreCase))
        {
            return 14.99m;
        }

        // Standard shipping is free over $100, otherwise $9.99
        return subtotal >= 100 ? 0m : 9.99m;
    }

    private static OrderDto MapToOrderDto(Order order)
    {
        return new OrderDto(
            order.Id,
            order.OrderNumber,
            order.CreatedAt,
            order.UpdatedAt,
            order.Status.ToString(),
            new ShippingAddressDto(
                order.ShippingFirstName,
                order.ShippingLastName,
                order.ShippingAddress,
                order.ShippingCity,
                order.ShippingState,
                order.ShippingZipCode,
                order.ShippingPhone),
            order.ShippingMethod,
            order.ShippingCost,
            order.Subtotal,
            order.Total,
            order.CustomerEmail,
            order.Items.Select(i => new OrderItemDto(
                i.Id,
                i.ProductId,
                i.ProductName,
                i.UnitPrice,
                i.Currency,
                i.Quantity,
                i.LineTotal)).ToList());
    }
}
