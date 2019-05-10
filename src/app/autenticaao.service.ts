import { Usuario } from './acesso/usuario.model';
import * as firebase from 'firebase'


export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        //console.log('Chegamos até o serviço', usuario)

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
        console.log(email, senha)

        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => {
                console.log(resposta)
            })
            .catch((erro: Error) => {
                console.log(erro)
            })
    }
}