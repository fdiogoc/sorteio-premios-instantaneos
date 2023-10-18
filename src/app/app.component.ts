import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit 
{

  title = 'sorteio-premios-instantaneos';
  ngOnInit(): void
  {
    initFlowbite();
  }
  id = "tsparticles";


}


