import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Observable } from 'rxjs';
import { LuckyNumberService } from '../shared/services/lucky-number.service';
import { LuckyNumber } from '../shared/models/lucky-number';



@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit
{
  cpf!: string;
  luckyNumbers: LuckyNumber[] = [];
  showBalloon: boolean = false;
  selectedNumberId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService, private luckyNumberService: LuckyNumberService) { }

  ngOnInit(): void
  {
    this.cpf = this.authService.getUserCPF();

    this.fetchLuckyNumbers();
  }
  fetchLuckyNumbers()
  {
    this.luckyNumberService.fetchLuckyNumbers().subscribe(
      (data: LuckyNumber[]) =>
      {
        this.luckyNumbers = data;
        console.log('Lucky numbers fetched:', this.luckyNumbers);
      },
      (error) =>
      {
        console.error('Error fetching lucky numbers:', error);
      }
    );
  }

  updateNumero(numberId: number)
  {
    this.luckyNumberService.updateNumero(numberId).subscribe(
      (response) =>
      {
        console.log('Registro atualizado com sucesso:', response);
        this.fetchLuckyNumbers();
      },
      (error) =>
      {
        console.error('Error updating lucky number:', error);
      }
    );
  }



  toggleBalloon(numberId: number): void
  {
    this.showBalloon = !this.showBalloon;
    this.selectedNumberId = numberId;
  }

  handleActionCompleted(numberId: number): void
  {
    console.log('Action completed for number ID:', numberId);
    this.showBalloon = false;
    this.selectedNumberId = null;
    this.updateNumero(numberId);
  }

}
