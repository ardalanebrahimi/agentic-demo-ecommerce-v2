namespace Orders.Application.DTOs;

public record ShippingAddressDto(
    string FirstName,
    string LastName,
    string Address,
    string City,
    string State,
    string ZipCode,
    string Phone);
