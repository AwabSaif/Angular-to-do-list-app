import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../services/Task/task.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface Task {
  title: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-taskCard',
  standalone: true,
  imports: [ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './taskCard.component.html',
  styleUrls: ['./taskCard.component.css'],
})
export class TaskCardComponent implements OnInit {
  editTaskFrom: FormGroup;
  taskId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private route: ActivatedRoute
  ) {
    this.editTaskFrom = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id');

      if (this.taskId) {
        this.taskService.getTask(this.taskId).subscribe(
          (task: Task) => {
            this.editTaskFrom.patchValue(task);
          },
          (error) => {
            this.notificationService.showNotification(
              'Failed to fetch task details',
              'error'
            );
          }
        );
      }
    });
  }
  onSubmit(): void {
    if (this.editTaskFrom.valid && this.taskId) {
      const taskData: Task = this.editTaskFrom.value;
      this.taskService
        .updateTask(this.taskId, this.editTaskFrom.value)
        .subscribe(
          (response) => {
            this.notificationService.showNotification(
              'The task has been successfully modified',
              'success'
            );
          },
          (error) => {
            this.notificationService.showNotification(
              'Modification task failed',
              'error'
            );
          }
        );
    }
  }
}
