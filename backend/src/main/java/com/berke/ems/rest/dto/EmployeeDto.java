package com.berke.ems.rest.dto;

public record EmployeeDto(Long id, String username,
                          String name, String email,
                          String lastname, String role) {
}
