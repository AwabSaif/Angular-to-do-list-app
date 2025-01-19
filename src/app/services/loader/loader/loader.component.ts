import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../loader.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common'; 
import { Observable } from 'rxjs';
 isLoading: Observable<boolean>;
@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})

export class LoaderComponent {
  isLoading: Observable<boolean>; 

  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.loading$; 
  }
  }
