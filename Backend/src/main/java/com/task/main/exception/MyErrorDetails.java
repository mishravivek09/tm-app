package com.task.main.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MyErrorDetails {
    private LocalDateTime dateTime;
    private String message;
    private String details;
}
