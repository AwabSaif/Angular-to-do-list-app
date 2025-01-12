import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '../TokenService.service';


export interface User {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; 

  constructor(
    private http: HttpClient,
    private tokenService: TokenService  
  ) {}

  //  register
  register(userData: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  // login
  login(userData: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  // update user
  updateUser(id: string, userData: Partial<User>): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();  
    return this.http.put(`${this.apiUrl}/${id}`, userData, { headers }).pipe(
      catchError((error) => {
        console.error('Update error:', error);
        return throwError(error);
      })
    );
  }

  //  delete user
  deleteUser(id: string): Observable<any> {
    const headers = this.tokenService.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError((error) => {
        console.error('Delete error:', error);
        return throwError(error);
      })
    );
  }
}


/* 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// interface
export interface User {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/users'; 

  constructor(private http: HttpClient) {}

  // register
  register(userData: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, userData).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  //  login
  login(userData: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, userData).pipe(
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }

  // Update user
  updateUser(id: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData).pipe(
      catchError((error) => {
        console.error('Update error:', error);
        return throwError(error);
      })
    );
  }

  // Delete user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('Delete error:', error);
        return throwError(error);
      })
    );
  }
}
*/