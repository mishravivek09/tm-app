package com.task.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserDto {
    @Email(message = "Please enter a valid email id")
    private String email;
    private String password;
}
