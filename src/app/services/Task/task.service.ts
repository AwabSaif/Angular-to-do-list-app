import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from '../TokenService.service';
import { tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'https://to-do-list-api-7axi.onrender.com/api/tasks';
  // private apiUrl = 'http://localhost:5000/api/tasks';

  private tasksUpdated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Add new task
  addTask(taskData: any): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http
      .post(`${this.apiUrl}`, taskData, { headers })
      .pipe(tap(() => this.tasksUpdated.next(true)));
  }

  // Update task
  updateTask(id: string, taskData: any): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http
      .put(`${this.apiUrl}/${id}`, taskData, { headers })
      .pipe(tap(() => this.tasksUpdated.next(true)));
  }

  // Delete task
  deleteTask(id: string): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http
      .delete(`${this.apiUrl}/${id}`, { headers })
      .pipe(tap(() => this.tasksUpdated.next(true)));
  }

  // Toggle task status
  toggleTaskStatus(
    taskId: string,
    data: { completed: boolean }
  ): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http
      .put(`${this.apiUrl}/toggle-status/${taskId}`, data, { headers })
      .pipe(tap(() => this.tasksUpdated.next(true)));
  }

  // Get task by ID
  getTask(id: string): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${id}`, { headers });
  }

  // Get all tasks
  getAllTasks(): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  // Get the tasks update
  getTasksUpdatedListener(): Observable<boolean> {
    return this.tasksUpdated.asObservable();
  }
}
