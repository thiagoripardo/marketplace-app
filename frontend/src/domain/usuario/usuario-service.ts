import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from './usuario';

@Injectable()
export class UsuarioService {

    private _usuarioLogado: Usuario;

    constructor(private _http: Http) {}

    /*public efetuaLogin(email: string, senha: string) {
        let api = `https://aluracar.herokuapp.com/login?email=${email}&senha=${senha}`;
        
        return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            });
    }*/

    public efetuaLogin(email: string, password: string) {

        let api = 'http://lowcost-env.v9mpr7bkgz.us-west-2.elasticbeanstalk.com/';
        let headers = new Headers();

        headers.append('Accept', 'application/json');
	    headers.append('Content-Type', 'application/json');
        headers.append('Connection', 'keep-alive');

        let data = {
	    	email: email,
	    	password: password
	    };

        return this._http.post(api, 
        JSON.stringify(data), 
        {"headers": headers})
	      .subscribe(res => {
	      	console.log(res.json());
            //let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
            let usuario = new Usuario('uniquest@uniquest.com', '57n92s');
            this._usuarioLogado = usuario;
            return usuario;
	      });
        /*return this._http
            .get(api)
            .map(res => res.json().usuario)
            .toPromise()
            .then(dado => {
                let usuario = new Usuario(dado.nome, dado.dataNascimento, dado.email, dado.telefone);
                this._usuarioLogado = usuario;
                return usuario;
            });*/
    }


    obtemUsuarioLogado() {
        return this._usuarioLogado;
    }
}