import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const encryptedData = localStorage.getItem('TodoList');
  
  if (encryptedData) {
    try {

      const bytes = CryptoJS.AES.decrypt(
        encryptedData,
        'jkanslknlakscnlisacoipjpoascjpojacs55'
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      

      if (decryptedData != null) {
        return true;  
      }
    } catch (error) {
      console.error('Error decrypting data:', error);
    }
  }


  router.navigateByUrl("login");
  return false;  
};
