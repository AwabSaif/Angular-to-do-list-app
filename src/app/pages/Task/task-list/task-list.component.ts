import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
export interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();

 
    this.taskService.getTasksUpdatedListener().subscribe(() => {
      this.fetchTasks(); 
    });
  }


  fetchTasks(): void {
    this.taskService.getAllTasks().subscribe(
      (response: Task[]) => {
        this.tasks = response.reverse();
      },
      (error) => {
        this.notificationService.showNotification(
          'Failed to load tasks',
          'error'
        );
      }
    );
  }

  trackByFn(index: number, task: Task): string {
    return task._id;
  }


  // Toggle task completion
  toggleTaskCompletion(taskId: string, currentStatus: boolean): void {
    if (taskId) {
      const updatedStatus = !currentStatus;

      this.taskService
        .toggleTaskStatus(taskId, { completed: updatedStatus })
        .subscribe(
          (response) => {
            this.notificationService.showNotification(
              'Task status updated',
              'success'
            );
          },
          (error) => {
            this.notificationService.showNotification(
              'Error updating task status',
              'error'
            );
          }
        );
    } else {
      this.notificationService.showNotification(
        'Task ID is not defined',
        'error'
      );
    }
  }

  // Edit task
  editTask(taskId: string): void {
    this.router.navigate(['/tasks/', taskId]);
  }

  // Delete task
  deleteTask(taskId: string): void {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.tasks = this.tasks.filter((task) => task._id !== taskId);
        this.notificationService.showNotification(
          'The task has been deleted',
          'success'
        );
      },
      (error) => {
        this.notificationService.showNotification(
          'Failed to delete task',
          'error'
        );
      }
    );
  }
}
