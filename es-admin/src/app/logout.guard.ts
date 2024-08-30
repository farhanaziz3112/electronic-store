import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

export const logoutGuard = () => {
  
  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.user$.subscribe((user) => {
    if (user == undefined) {
      return true;
    } else {
      router.navigate(['/home']);
      return false;
    }
  });
};
