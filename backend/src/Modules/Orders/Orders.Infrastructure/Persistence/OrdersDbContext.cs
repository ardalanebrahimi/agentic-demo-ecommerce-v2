using Orders.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Orders.Infrastructure.Persistence;

public class OrdersDbContext : DbContext
{
    public OrdersDbContext(DbContextOptions<OrdersDbContext> options)
        : base(options)
    {
    }

    public DbSet<Order> Orders => Set<Order>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("orders");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.OrderNumber).HasColumnName("order_number").HasMaxLength(50).IsRequired();
            entity.Property(e => e.CreatedAt).HasColumnName("created_at");
            entity.Property(e => e.UpdatedAt).HasColumnName("updated_at");
            entity.Property(e => e.Status).HasColumnName("status").HasConversion<string>().HasMaxLength(20);

            // Shipping Address
            entity.Property(e => e.ShippingFirstName).HasColumnName("shipping_first_name").HasMaxLength(100).IsRequired();
            entity.Property(e => e.ShippingLastName).HasColumnName("shipping_last_name").HasMaxLength(100).IsRequired();
            entity.Property(e => e.ShippingAddress).HasColumnName("shipping_address").HasMaxLength(500).IsRequired();
            entity.Property(e => e.ShippingCity).HasColumnName("shipping_city").HasMaxLength(100).IsRequired();
            entity.Property(e => e.ShippingState).HasColumnName("shipping_state").HasMaxLength(50).IsRequired();
            entity.Property(e => e.ShippingZipCode).HasColumnName("shipping_zip_code").HasMaxLength(20).IsRequired();
            entity.Property(e => e.ShippingPhone).HasColumnName("shipping_phone").HasMaxLength(30).IsRequired();

            // Shipping Method
            entity.Property(e => e.ShippingMethod).HasColumnName("shipping_method").HasMaxLength(20).IsRequired();
            entity.Property(e => e.ShippingCost).HasColumnName("shipping_cost").HasPrecision(18, 2);

            // Totals
            entity.Property(e => e.Subtotal).HasColumnName("subtotal").HasPrecision(18, 2);
            entity.Property(e => e.Total).HasColumnName("total").HasPrecision(18, 2);

            // Customer
            entity.Property(e => e.CustomerEmail).HasColumnName("customer_email").HasMaxLength(256);

            // Order Items as owned collection
            entity.OwnsMany(e => e.Items, item =>
            {
                item.ToTable("order_items");
                item.WithOwner().HasForeignKey("order_id");
                item.Property<Guid>("Id").HasColumnName("id");
                item.HasKey("Id");
                item.Property(i => i.ProductId).HasColumnName("product_id");
                item.Property(i => i.ProductName).HasColumnName("product_name").HasMaxLength(200).IsRequired();
                item.Property(i => i.UnitPrice).HasColumnName("unit_price").HasPrecision(18, 2);
                item.Property(i => i.Currency).HasColumnName("currency").HasMaxLength(3).IsRequired();
                item.Property(i => i.Quantity).HasColumnName("quantity");
            });
        });
    }
}
