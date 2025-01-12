import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';
import { NotificationService } from '../../../services/notification/notification.service';

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
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  isLoading = true;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

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
        this.notificationService.showNotification(
          'Failed to load tasks',
          'error'
        );
        this.isLoading = false;
      }
    );
  }

  trackByFn(index: number, task: Task): string {
    return task._id;
  }

  onTaskAdded(newTask: any): void {
    this.tasks.unshift(newTask);
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
  // edit task
  editTask(taskId: string): void {
    
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
          'Failed to delete tas',
          'error'
        );
      }
    );
  }
}
