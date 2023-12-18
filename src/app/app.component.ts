import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService)
  {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }
  ngOnInit(): void
  {
    initFlowbite();
  }

}


