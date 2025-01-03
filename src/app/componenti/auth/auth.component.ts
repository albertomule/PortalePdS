import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../servizi/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: false
})
export class AuthComponent implements OnInit{
  
  private authService = inject(AuthService)
  private router = inject(Router)
  profile: any

  ngOnInit(): void {
    this.showData()
  }

  showData(){
    this.profile = this.authService.getProfile()
  }

  logOut(){
    this.authService.logout()
    this.router.navigate(['/start'])
  }

}
