import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  // nossas variáveis e métodos
  userModel = new User()
  mensagem = ""

  receberDados() {
    // console.log(this.userModel);

    const blackList = ["SELECT", "OR", ' ""="" ', "-- ", ";", "1 = 1", "1=1", "DROP", "\"\"=\"\"", "'='"];//lista de palavras chave

    let ataque = 0;

    //percorrer o array e verifica se encontrou alguma das palavras da blacklist

    blackList.forEach((palavra) => {
      if (this.userModel.email?.toUpperCase().includes(palavra)) {
        ataque++;
      }
    });

    if (this.userModel.email == "" || this.userModel.password == "" || ataque > 0) {//tem palavra proibida | se esqueceu de preencher algum campo
      this.mensagem = "preencher os campos corretamente"
    } else {//pode chamar a API
      //disparando/send
      this.userService.logarUsuario(this.userModel).subscribe({
        next: (response) => {//sucesso
          console.log("Deu certo");
          console.log(response);
          this.mensagem = "Logado com Sucesso"
        },
        error: (err) => {//erro
          console.log("Deu RUIMMM");
          console.log(err);
          this.mensagem = err.error;
        },
      })
    }
  }
}
