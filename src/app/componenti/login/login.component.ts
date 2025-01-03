import { Component, inject } from '@angular/core';
import { AuthService } from '../../servizi/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {
  title = "Benvenuto nel portale Piani di Studio. Per continuare è richiesta l'autenticazione."
  private authService = inject(AuthService)

  auth(){
    this.authService.login()
  }
}
