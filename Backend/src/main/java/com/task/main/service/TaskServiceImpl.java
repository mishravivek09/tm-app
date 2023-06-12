package com.task.main.service;

import com.task.main.dto.TaskDto;
import com.task.main.entity.Task;
import com.task.main.entity.User;
import com.task.main.enums.Status;
import com.task.main.exception.MyRuntimeException;
import com.task.main.repository.TaskRepository;
import com.task.main.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{
    @Autowired
    private TaskRepository taskRepository;
    @Autowired
    private UserRepository userRepository;

    @Override
    public Task createNewTask(long userId, TaskDto dto) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        Task task=new Task();
        task.setCreatedAt(LocalDateTime.now());
        task.setStatus(Status.PENDING);
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setDeadline(dto.getDeadline());
        user.getTasks().add(task);

        return taskRepository.save(task);
    }

    @Override
    public List<Task> getAllTasks(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        if(list.isEmpty()){
            throw new MyRuntimeException("Task list is empty");
        }
        return list;
    }

    @Override
    public Task updateTask(long taskId, Task task) {
        Optional<Task> opt=taskRepository.findById(taskId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid task id");
        }
        Task tsk=opt.get();
        tsk.setDeadline(task.getDeadline());
        tsk.setCreatedAt(task.getCreatedAt());
        tsk.setStatus(task.getStatus());
        tsk.setTitle(task.getTitle());
        tsk.setDescription(task.getDescription());

        return taskRepository.save(tsk);
    }

    @Override
    public Task updateStatus(long taskId, Status status) {
        Optional<Task> opt=taskRepository.findById(taskId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid task id");
        }
        Task tsk=opt.get();
        if(tsk.getStatus().equals(Status.COMPLETED)){
            throw new RuntimeException("Task is already completed");
        }
        tsk.setStatus(status);
        return taskRepository.save(tsk);
    }

    @Override
    public Task deleteTask(long taskId) {
        Optional<Task> opt=taskRepository.findById(taskId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid task id");
        }
        Task tsk=opt.get();
        taskRepository.delete(tsk);
        return tsk;
    }

    @Override
    public List<Task> sortByTitle(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        Collections.sort(list, new Comparator<Task>() {
            @Override
            public int compare(Task o1, Task o2) {
                return o1.getTitle().compareTo(o2.getTitle());
            }
        });
        return list;
    }

    @Override
    public List<Task> sortByLatest(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        Collections.sort(list, new Comparator<Task>() {
            @Override
            public int compare(Task o1, Task o2) {
                return o2.getCreatedAt().compareTo(o1.getCreatedAt());
            }
        });
        return list;
    }

    @Override
    public List<Task> sortByOldest(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        Collections.sort(list, new Comparator<Task>() {
            @Override
            public int compare(Task o1, Task o2) {
                return o1.getCreatedAt().compareTo(o2.getCreatedAt());
            }
        });
        return list;
    }

    @Override
    public List<Task> pendingTasks(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        List<Task> res=list.stream().filter(t-> t.getStatus().equals(Status.PENDING)).collect(Collectors.toList());
        if(res.isEmpty()){
            throw new MyRuntimeException("List is empty");
        }
        return res;
    }

    @Override
    public List<Task> completedTasks(long userId) {
        Optional<User> opt=userRepository.findById(userId);
        if(!opt.isPresent()){
            throw new MyRuntimeException("Invalid user id");
        }
        User user=opt.get();
        List<Task> list=user.getTasks();
        List<Task> res=list.stream().filter(t-> t.getStatus().equals(Status.COMPLETED)).collect(Collectors.toList());
        if(res.isEmpty()){
            throw new MyRuntimeException("List is empty");
        }
        return res;
    }
}
