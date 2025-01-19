import { Component, inject, Input, OnInit } from '@angular/core';
import { TaskService } from '../../../services/Task/task.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { LoaderService } from '../../../services/loader/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { EditTaskDialogComponent } from '../dialogs/EditTaskDialog/EditTaskDialog.component';
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
  readonly dialog = inject(MatDialog);

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();

    this.taskService.getTasksUpdatedListener().subscribe(() => {
      this.fetchTasks();
    });
  }

  fetchTasks(): void {
    this.loaderService.showLoader();
    this.taskService.getAllTasks().subscribe(
      (response: Task[]) => {
        this.loaderService.hideLoader();
        this.tasks = response.reverse();
      },
      (error) => {
        this.notificationService.showNotification(
          'Failed to load tasks',
          'error'
        );
        this.loaderService.hideLoader();
      }
    );
  }

  trackByFn(index: number, task: Task): string {
    return task._id;
  }

  // Toggle task completion
  toggleTaskCompletion(taskId: string, currentStatus: boolean): void {
    this.loaderService.showLoader();
    if (taskId) {
      const updatedStatus = !currentStatus;

      this.taskService
        .toggleTaskStatus(taskId, { completed: updatedStatus })
        .subscribe(
          (response) => {
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'Task status updated',
              'success'
            );
          },
          (error) => {
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'Error updating task status',
              'error'
            );
          }
        );
    } else {
      this.loaderService.hideLoader();
      this.notificationService.showNotification(
        'Task ID is not defined',
        'error'
      );
    }
  }

  // Edit task
  openEditTaskDialog(taskId: string): void {
    this.loaderService.showLoader();
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '800px',
      panelClass: 'app-EditTaskDialog',
      data: { taskId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaderService.hideLoader();
        console.log('Dialog closed with result:', result);
      }
    });
  }


  // Delete task
  deleteTask(taskId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      panelClass: 'app-confirm-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loaderService.showLoader();
        this.taskService.deleteTask(taskId).subscribe(
          () => {
            this.tasks = this.tasks.filter((task) => task._id !== taskId);
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'The task has been deleted',
              'success'
            );
          },
          (error) => {
            this.loaderService.hideLoader();
            this.notificationService.showNotification(
              'Failed to delete task',
              'error'
            );
          }
        );
      }
    });
  }
}
