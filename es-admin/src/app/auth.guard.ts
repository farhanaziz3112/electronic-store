import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';

export const authGuard = () => {

  const router = inject(Router);
  const auth = inject(AuthService);

  return auth.user$.subscribe(user => {
    if (user == undefined) {
      router.navigate(['/'])
      return false;
    } else {
      return true;
    }
  })


  // if (auth.isAuthenticated$) {
  //   auth.user$.subscribe(x => {
  //     console.log(x);
  //   })
  //   return true;
  // } 

  

  

  return router.createUrlTree(['/'])
};
