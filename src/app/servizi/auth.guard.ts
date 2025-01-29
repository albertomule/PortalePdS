import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';

export const studenteGuard: CanActivateFn = () => {
  return inject(AuthService).isStudente();
};

export const commissioneGuard: CanActivateFn = () => {
    return inject(AuthService).isCommissione();
  };