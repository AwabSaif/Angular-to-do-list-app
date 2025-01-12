import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

 
  getRefreshToken(): string {
    const encryptedData = localStorage.getItem('TodoList');
    if (encryptedData) {
      try {
        const bytes = CryptoJS.AES.decrypt(
          encryptedData,
          'jkanslknlakscnlisacoipjpoascjpojacs55'
        );
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData?.refreshToken || '';
      } catch (error) {
        console.error('Error decrypting data:', error);
        return '';
      }
    }
    return '';
  }

  
  getAuthHeaders(): HttpHeaders {
    const refreshToken = this.getRefreshToken();
    return new HttpHeaders({
      Authorization: `Bearer ${refreshToken}`,
    });
  }
}
