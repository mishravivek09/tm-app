package com.task.main.encryption;

import org.jetbrains.annotations.NotNull;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
@Component
public class PasswordEncryption {
    public byte[] generateSalt(){
        SecureRandom random=new SecureRandom();
        byte[] salt=new byte[16];
        random.nextBytes(salt);
        return salt;
    }
    public byte[] encryptPassword(String password,byte[] salt){
        try{
            MessageDigest md=MessageDigest.getInstance("SHA-256");
            md.update(salt);
            byte[] hashedPassword=md.digest(password.getBytes());
            return hashedPassword;
        }catch (NoSuchAlgorithmException e){
            e.printStackTrace();
        }
        return null;
    }
    public boolean verifyPassword(String password,byte[] hashedPassword,byte[] salt){
        byte[] hashedAttemp=encryptPassword(password,salt);
        if(hashedAttemp==null || hashedAttemp.length != hashedPassword.length){
            return false;
        }
        for(int i=0;i<hashedAttemp.length;i++){
            if(hashedAttemp[i] != hashedPassword[i]){
                return false;
            }
        }
        return true;
    }

}
