import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard = () => {
  const router = inject(Router);

  if (sessionStorage.getItem('elev8@user')) {
    return true;
  } else {
    return router.navigate(['/admin']);
  }
};
