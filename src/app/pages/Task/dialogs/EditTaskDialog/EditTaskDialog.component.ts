import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../../../../services/Task/task.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-EditTaskDialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule,],
  templateUrl: './EditTaskDialog.component.html',
  styleUrls: ['./EditTaskDialog.component.css'],
})
export class EditTaskDialogComponent implements OnInit {
  editTaskFrom: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private notificationService: NotificationService,
    private loaderService: LoaderService,
    public dialogRef: MatDialogRef<EditTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskId: string }
  ) {
    this.editTaskFrom = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      completed: [false],
    });
  }

  ngOnInit(): void {
    this.loaderService.showLoader();
    if (this.data.taskId) {
      this.taskService.getTask(this.data.taskId).subscribe(
        (task) => {
          this.editTaskFrom.patchValue(task);
          this.loaderService.hideLoader();
        },
        (error) => {
          this.loaderService.hideLoader();
          this.notificationService.showNotification(
            'Failed to fetch task details',
            'error'
          );
        }
      );
    }
  }

  onSubmit(): void {
    this.loaderService.showLoader();
    if (this.editTaskFrom.valid) {
      const taskData = this.editTaskFrom.value;
      this.taskService.updateTask(this.data.taskId, taskData).subscribe(
        () => {
          this.loaderService.hideLoader();
          this.notificationService.showNotification(
            'The task has been successfully modified',
            'success'
          );
          this.dialogRef.close(true);
        },
        () => {
          this.loaderService.hideLoader();
          this.notificationService.showNotification(
            'Modification task failed',
            'error'
          );
        }
      );
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
