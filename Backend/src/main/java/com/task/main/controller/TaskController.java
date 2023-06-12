package com.task.main.controller;

import com.task.main.dto.TaskDto;
import com.task.main.entity.Task;
import com.task.main.enums.Status;
import com.task.main.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RestController
@RequestMapping("/task")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @PostMapping("/create")
    public ResponseEntity<Task> createNewTask(@Valid @RequestBody TaskDto dto, @RequestParam long userId){
        return new ResponseEntity<>(taskService.createNewTask(userId,dto), HttpStatus.CREATED);
    }
    @GetMapping("/get")
    public ResponseEntity<List<Task>> getAllTasks(@RequestParam long userId){
        return new ResponseEntity<>(taskService.getAllTasks(userId),HttpStatus.OK);
    }
    @PutMapping("/update/data/{taskId}")
    public ResponseEntity<Task> updateTask(@RequestBody Task task,@PathVariable long taskId){
        return new ResponseEntity<>(taskService.updateTask(taskId,task),HttpStatus.OK);
    }
    @PutMapping("/update/{taskId}")
    public ResponseEntity<Task> updateStatus(@RequestParam Status status, @PathVariable long taskId){
        return new ResponseEntity<>(taskService.updateStatus(taskId,status),HttpStatus.OK);
    }
    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<Task> deleteTask(@PathVariable long taskId){
        return new ResponseEntity<>(taskService.deleteTask(taskId),HttpStatus.OK);
    }
    @GetMapping("/sort/title/{userId}")
    public ResponseEntity<List<Task>> sortByTitle(@PathVariable long userId){
        return new ResponseEntity<>(taskService.sortByTitle(userId),HttpStatus.OK);
    }
    @GetMapping("/sort/latest/{userId}")
    public ResponseEntity<List<Task>> sortByLatest(@PathVariable long userId){
        return new ResponseEntity<>(taskService.sortByLatest(userId),HttpStatus.OK);
    }
    @GetMapping("/sort/oldest/{userId}")
    public ResponseEntity<List<Task>> sortByOldest(@PathVariable long userId){
        return new ResponseEntity<>(taskService.sortByOldest(userId),HttpStatus.OK);
    }
    @GetMapping("/filter/pending/{userId}")
    public ResponseEntity<List<Task>> pendingTasks(@PathVariable long userId){
        return new ResponseEntity<>(taskService.pendingTasks(userId),HttpStatus.OK);
    }
    @GetMapping("/filter/completed/{userId}")
    public ResponseEntity<List<Task>> completedTasks(@PathVariable long userId){
        return new ResponseEntity<>(taskService.completedTasks(userId),HttpStatus.OK);
    }
}
