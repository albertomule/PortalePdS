import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../servizi/auth.service';

@Component({
  selector: 'app-homecommissione',
  templateUrl: './homecommissione.component.html',
  styleUrl: './homecommissione.component.css',
  standalone: false
})
export class HomecommissioneComponent implements OnInit{
  private authService = inject(AuthService)

  ngOnInit(): void {
    console.log(this.authService.rank)
  }
  
}
