package com.berke.ems.rest.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @Schema(example = "user")
    @NotBlank
    private String username;
    @Schema(example = "1234")
    @NotBlank
    private String password;
}
