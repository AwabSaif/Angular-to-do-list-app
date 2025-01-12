import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { TaskService } from '../../../services/Task/task.service';
import { TaskListComponent } from "../task-list/task-list.component";

export interface Task {
  title: string;
  description: string;
}
@Component({
  selector: 'app-Task',
  standalone: true,
  imports: [ReactiveFormsModule, TaskListComponent],
  templateUrl: './Task.component.html',
  styleUrls: ['./Task.component.css'],
})
export class TaskComponent {
  taskFrom: FormGroup;
  @Output() taskAdded = new EventEmitter<Task>();

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {
    this.taskFrom = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
    });
  }
  onSubmit(): void {
    if (this.taskFrom.valid) {
      const taskData: Task = this.taskFrom.value;
      // console.log('Sending data:', taskData);
      this.taskService.addTask(this.taskFrom.value).subscribe(
        (response) => {
          this.notificationService.showNotification(
            'Add Task successful',
            'success'
          );
          this.taskAdded.emit(response);
          this.taskFrom.reset();
        },
        (error) => {
          this.notificationService.showNotification('Add Task failed', 'error');
        }
      );
    }
  }
}
