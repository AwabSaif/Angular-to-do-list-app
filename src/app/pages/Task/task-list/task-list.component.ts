import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  // Fetch tasks from server
  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (response: Task[]) => {
        // this.tasks = response;
        this.tasks = response.reverse();
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load tasks';
        this.isLoading = false;
      }
    );
  }

  onTaskAdded(newTask: any): void {
    this.tasks.unshift(newTask);  
  }

  // Toggle task completion
  toggleTaskCompletion(taskId: string): void {
    this.taskService.toggleTaskStatus(taskId).subscribe(
      () => {
        this.tasks = this.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
      },
      (error) => {
        this.errorMessage = 'Failed to update task status';
      }
    );
  }

  // Delete task
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
      },
      (error) => {
        this.errorMessage = 'Failed to delete task';
      }
    );
  }
}
