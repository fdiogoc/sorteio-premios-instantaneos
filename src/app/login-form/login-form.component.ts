import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent
{
  username: string = '';
  password: string = '';
  private authSubscription: Subscription;
  constructor(private router: Router, private authService: AuthService)
  {
    this.authSubscription = this.authService.isLoggedIn.subscribe(isLoggedIn =>
    {
      if (isLoggedIn)
      {
        this.router.navigate(['/']);
      }
    });
  }
  onSubmit()
  {
    this.authService.login(this.username, this.password)
      .subscribe(success =>
      {
        if (success)
        {
          // Handle successful login
          this.router.navigate(['/']);
          console.log('Login successful');
        } else
        {
          // Handle login failure
          console.error('Login failed');
        }
      });
  }
}
