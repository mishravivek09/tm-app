package com.task.main.service;

import com.task.main.dto.LoginUserDto;
import com.task.main.dto.RegisterUserDto;
import com.task.main.entity.User;

import java.util.List;

public interface UserService {
    public User registerUser(RegisterUserDto dto);
    public User validateUser(LoginUserDto dto);
    public List<User> getAllUsers();
    public User deleteUserByEmail(String email);
}
