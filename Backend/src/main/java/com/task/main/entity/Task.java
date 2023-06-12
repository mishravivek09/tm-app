package com.task.main.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.task.main.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long taskId;
    private String title;
    @Lob
    private String description;
    private Status status;
    @JsonFormat(pattern="E, dd MMM yyyy HH:mm:ss")
    private LocalDateTime createdAt;
    @JsonFormat(pattern="E, dd MMM yyyy HH:mm:ss")
    private LocalDateTime deadline;
}
