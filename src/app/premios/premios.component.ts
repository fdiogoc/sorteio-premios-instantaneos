import { Component } from '@angular/core';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent
{
  showBalloon: boolean = false;
  toggleBalloon(): void
  {
    this.showBalloon = !this.showBalloon;
  }
  handleActionCompleted(): void
  {
    this.showBalloon = false;
  }

}
