using Catalog.Api.Endpoints;
using Microsoft.AspNetCore.Routing;

namespace Catalog.Api;

public static class CatalogModule
{
    public static IEndpointRouteBuilder MapCatalogEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapCategoriesEndpoints();
        app.MapProductsEndpoints();
        return app;
    }
}
