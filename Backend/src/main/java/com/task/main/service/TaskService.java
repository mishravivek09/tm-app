package com.task.main.service;

import com.task.main.dto.TaskDto;
import com.task.main.entity.Task;
import com.task.main.enums.Status;

import java.util.List;

public interface TaskService {
    public Task createNewTask(long userId, TaskDto dto);
    public List<Task> getAllTasks(long userId);
    public Task updateTask(long taskId,Task task);
    public Task updateStatus(long taskId, Status status);
    public Task deleteTask(long taskId);
    public List<Task> sortByTitle(long userId);
    public List<Task> sortByLatest(long userId);
    public List<Task> sortByOldest(long userId);
    public List<Task> pendingTasks(long userId);
    public List<Task> completedTasks(long userId);
}
