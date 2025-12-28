using System.ComponentModel.DataAnnotations;

namespace Orders.Application.DTOs;

public record UpdateOrderStatusRequest(
    [Required]
    string Status);
