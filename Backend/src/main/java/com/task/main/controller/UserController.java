package com.task.main.controller;

import com.task.main.dto.LoginUserDto;
import com.task.main.dto.RegisterUserDto;
import com.task.main.entity.User;
import com.task.main.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import java.util.List;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@Valid @RequestBody RegisterUserDto dto){
        return new ResponseEntity<>(userService.registerUser(dto), HttpStatus.CREATED);
    }
    @PostMapping("/validate")
    public ResponseEntity<User> validateUser(@Valid @RequestBody LoginUserDto dto){
        return new ResponseEntity<>(userService.validateUser(dto),HttpStatus.OK);
    }
    @GetMapping("/list")
    public ResponseEntity<List<User>> getAllUser(){
        return new ResponseEntity<>(userService.getAllUsers(),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{email}")
    public ResponseEntity<User> deleteUser(@PathVariable @Email String email){
        return new ResponseEntity<>(userService.deleteUserByEmail(email),HttpStatus.OK);
    }
}
