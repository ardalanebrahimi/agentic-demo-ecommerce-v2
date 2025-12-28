using Auth.Api.Endpoints;
using Microsoft.AspNetCore.Routing;

namespace Auth.Api;

public static class AuthModule
{
    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        AuthEndpoints.MapAuthEndpoints(app);
        return app;
    }
}
