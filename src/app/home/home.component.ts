import { Component, OnInit } from '@angular/core';
import { Autenticacao } from '../autenticaao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  public sair(): void {
    this.autenticacao.sair()
  }

}
