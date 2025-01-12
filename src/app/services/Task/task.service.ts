import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../TokenService.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Add new task
  addTask(taskData: any): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();  
    return this.http.post(`${this.apiUrl}`, taskData, { headers });
  }

  // update task
  updateTask(id: string, taskData: any): Observable<any> {
    const headers = this.tokenService.getAuthHeaders(); 
    return this.http.put(`${this.apiUrl}/${id}`, taskData, { headers });
  }

  // delete task
  deleteTask(id: string): Observable<any> {
    const headers = this.tokenService.getAuthHeaders(); 
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }


  // تغيير حالة المهمة
  toggleTaskStatus(id: string): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();  
    return this.http.patch(`${this.apiUrl}/toggle-status/${id}`, {}, { headers });
  }
  //all task
  getAllTasks(): Observable<any> {
    const headers = this.tokenService.getAuthHeaders(); 
    return this.http.get(`${this.apiUrl}`, { headers });
  }
}
