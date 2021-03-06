import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Usuario} from '../acesso/usuario.model'
import { Autenticacao } from '../autenticaao.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  //atributo responsável por enviar o valor do emmit para o componente pai (Acesso) 
  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>()

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  constructor(
    private autenticacao: Autenticacao
  ) { }

  ngOnInit() {
  }

  public exibirPainelLogin(): void {
    //Componente pai (Acesso) vai receber o valor 'login'
    this.exibirPainel.emit('login')
  }

  public cadastrarUsuario(): void{
    //console.log(this.formulario )

    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha
    )
    //console.log(usuario)

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => {
        this.exibirPainelLogin()
      })


    //Proximo passo
    //Transferir os dados para um serviço, que terá uma camada que se comunicará com o firebase
  }
}
