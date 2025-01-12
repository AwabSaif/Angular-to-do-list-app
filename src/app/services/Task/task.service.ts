import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks'; 

  constructor(private http: HttpClient) {}

  // Add new task
  addTask(taskData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, taskData);
  }

  // update task
  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, taskData);
  }

  // delete task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  
  toggleTaskStatus(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/toggle-status/${id}`, {});
  }
 

  //all task
  getAllTasks(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
