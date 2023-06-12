package com.task.main.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskDto {
    @Size(min = 3,message = "Please enter the title")
    private String title;
    @Size(min =3,message = "Please provide description")
    private String description;
    @JsonFormat(pattern="E, dd MMM yyyy HH:mm:ss")
    private LocalDateTime deadline;
}
