import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{
  isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService)
  {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  logout(): void
  {
    this.authService.logout();
  }
}
