import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean
  {
    let isLoggedIn = false;
    this.authService.isLoggedIn.subscribe(status => isLoggedIn = status);

    if (isLoggedIn)
    {
      return true;
    } else
    {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
