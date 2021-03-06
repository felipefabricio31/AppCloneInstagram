import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase'

@Injectable()
export class Autenticacao {

    constructor(
        private router: Router
    ) {

    }

    public token_id: string

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        //console.log('Chegamos até o serviço', usuario)

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //remove a senha do atributo senha do objeto usuario
                delete usuario.senha

                //btoa(string) criptografa a string para enviar ao firebase
                //atob(string) descriptografa a string 
                //registra dados complementares do usuario no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario) //ou .push()
            })
            .catch((erro: Error) => {
                console.log(erro)
            })
    }

    public autenticar(email: string, senha: string): void {

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                //Promisse que recupera o token
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        //Recupera o token
                        this.token_id = idToken

                        //Grava o idToken dentro do localStorage
                        localStorage.setItem('idToken', idToken)

                        //redireciona  para o componente Hom
                        this.router.navigate(['/home'])
                    })
            })
            .catch((erro: Error) => {
                console.log(erro)
            })
    }

    public autenticado(): boolean {

        //Verificar caso o token esteja definido, verificar no localstorage se existe algum token
        if (this.token_id === undefined && localStorage.getItem('idToken') !== null) {
            this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined)
        {
            this.router.navigate(['/'])
        }

        //Retorna true se for diferente e false se for indefinido
        return this.token_id !== undefined
    }

    public sair(): void {

        firebase.auth().signOut()
            .then(() => {
                //Remove o token do localStorage
                localStorage.removeItem('idToken')
                this.token_id = undefined
                this.router.navigate(['/'])
            })
    }
}