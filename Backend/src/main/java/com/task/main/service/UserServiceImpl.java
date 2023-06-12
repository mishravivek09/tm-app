package com.task.main.service;

import com.task.main.dto.LoginUserDto;
import com.task.main.dto.RegisterUserDto;
import com.task.main.encryption.PasswordEncryption;
import com.task.main.entity.User;
import com.task.main.exception.MyRuntimeException;
import com.task.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncryption encryption;
    @Override
    public User registerUser(RegisterUserDto dto) {
        User usr=userRepository.findByEmail(dto.getEmail());
        if(usr!=null){
            throw new MyRuntimeException("User is already registered with email : "+dto.getEmail());
        }
        byte[] salt=encryption.generateSalt();
        User user=new User();
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        byte[] hashedPassword=encryption.encryptPassword(dto.getPassword(),salt);
        user.setPassword(hashedPassword);
        user.setPasswordSalt(salt);
        return userRepository.save(user);
    }

    @Override
    public User validateUser(LoginUserDto dto) {
        User user=userRepository.findByEmail(dto.getEmail());
        if(user==null){
            throw new MyRuntimeException("Invalid username or password");
        }
        boolean passwordMatched=encryption.verifyPassword(dto.getPassword(),user.getPassword(),user.getPasswordSalt());
        if(!passwordMatched){
            throw new MyRuntimeException("Invalid username or password");
        }
        return  user;
    }

    @Override
    public List<User> getAllUsers() {
        List<User> list=userRepository.findAll();
        if(list.isEmpty()){
            throw new MyRuntimeException("User list is empty");
        }
        return list;
    }

    @Override
    public User deleteUserByEmail(String email) {
        User user=userRepository.findByEmail(email);
        if(user==null){
            throw new MyRuntimeException("User is not registered");
        }
        userRepository.delete(user);
        return user;
    }
}
