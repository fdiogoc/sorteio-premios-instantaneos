import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

interface LuckyNumber
{
  id: number;
  cpf: string;
  premio_instataneo: string;
  data: string;
  valor_cupom: number;
  premio_instataneo_disponivel: boolean;
  winner: boolean;
}

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit
{
  apiUrl = 'http://localhost:3000/numeros_sorte';
  cpf!: string;
  luckyNumbers: LuckyNumber[] = [];
  showBalloon: boolean = false;
  selectedNumberId: number | null = null;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void
  {
    this.cpf = this.authService.getUserCPF();

    this.fetchLuckyNumbers();
  }
  fetchLuckyNumbers()
  {
    const apiUrl = `http://localhost:3000/numeros_sorte?cpf=${this.cpf}`;
    this.http.get(apiUrl).subscribe(
      (data: Object) =>
      {
        this.luckyNumbers = data as LuckyNumber[];
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

    const dataToUpdate = { premio_instataneo_disponivel: false };

    const url = `${this.apiUrl}/${numberId}`;

    this.http.patch(url, dataToUpdate).subscribe((response) =>
    {
      console.log('Registro atualizado com sucesso:', response);
      this.fetchLuckyNumbers();

    });

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
