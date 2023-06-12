package com.task.main.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterUserDto {
    @Size(min = 3,message = "Please enter your firstname")
    private String firstName;
    @Size(min = 3,message = "Please enter your lastname")
    private String lastName;
    @Email(message = "Please enter a valid email id")
    private String email;
    @Pattern(regexp = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",message = "Password should be minimum eight characters, at least one upper letter , one special character and one number")
    private String password;
}
