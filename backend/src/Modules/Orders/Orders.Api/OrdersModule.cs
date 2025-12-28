using Orders.Api.Endpoints;
using Microsoft.AspNetCore.Routing;

namespace Orders.Api;

public static class OrdersModule
{
    public static IEndpointRouteBuilder MapOrdersEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapOrderEndpoints();
        return app;
    }
}
