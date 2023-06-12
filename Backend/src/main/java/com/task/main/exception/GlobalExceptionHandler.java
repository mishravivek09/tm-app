package com.task.main.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MyRuntimeException.class)
    public ResponseEntity<MyErrorDetails> runtimeExceptionHandler(MyRuntimeException e, WebRequest w){
        MyErrorDetails err=new MyErrorDetails();
        err.setDateTime(LocalDateTime.now());
        err.setMessage(e.getMessage());
        err.setDetails(w.getDescription(false));
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MyErrorDetails> checkedExceptionHandler(Exception e, WebRequest w){
        MyErrorDetails err=new MyErrorDetails();
        err.setDateTime(LocalDateTime.now());
        err.setMessage(e.getMessage());
        err.setDetails(w.getDescription(false));
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<MyErrorDetails> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e){
        MyErrorDetails err=new MyErrorDetails();
        err.setDateTime(LocalDateTime.now());
        err.setMessage(e.getMessage());
        err.setDetails(e.getBindingResult().getFieldError().getDefaultMessage());
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<MyErrorDetails> noHandlerFoundExceptionHandler(NoHandlerFoundException e, WebRequest w){
        MyErrorDetails err=new MyErrorDetails();
        err.setDateTime(LocalDateTime.now());
        err.setMessage(e.getMessage());
        err.setDetails(w.getDescription(false));
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
}
