import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  message: string = '';
  type: string = 'info';
  isVisible: boolean = false;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.message = notification.message;
      this.type = notification.type;
      this.isVisible = true;

    
      setTimeout(() => {
        this.isVisible = false;
      }, 5000);
    });
  }
}
