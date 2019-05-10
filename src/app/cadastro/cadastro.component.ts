import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //atributo responsável por enviar o valor do emmit para o componente pai (Acesso) 
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    //Componente pai (Acesso) vai receber o valor 'login'
    this.exibirPainel.emit('login')
  }
}
