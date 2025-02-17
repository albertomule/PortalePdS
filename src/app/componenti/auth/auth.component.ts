import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../servizi/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { DatistudenteService } from '../../servizi/datistudente.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  standalone: false
})
export class AuthComponent implements OnInit{
  
  private authService = inject(AuthService)
  //private router = inject(Router)
  profile: any
  uProfile: any

  constructor(private route: ActivatedRoute, private router: Router, private datistudente: DatistudenteService){}

  ngOnInit(): void {
    setTimeout(() => {
      this.claims()
    }, 5000);
  }

  claims(){
    this.profile = this.authService.getIdentityClaims()
    console.log(this.profile)
    this.saveData()
    this.redirect()
  }

  logOut(){
    this.authService.logout()
    //this.router.navigate(['/start'])
  }

  auth(){
    this.authService.login()
  }

  accessToken(){
    console.log(this.authService.getAccessToken())
  }
  idToken(){
    console.log(this.authService.getIdToken())
  }
  userProfile(){
    this.authService.loadUserProfile()
  }
  getUserProfile(){
    //console.log(this.authService.getUserProfile())
    if(this.authService.getIdentityClaims()){
      this.authService.getUserProfile.subscribe((profile) => {
        this.uProfile = profile
      })
    }
  }
  uProfileTest(){
    // "Claims": [
      //   "principal",
      //   "sub",
      //   "credential",
      //   "given_name",
      //   "family_name",
      //   "fiscalNumber",
      //   "email",
      //   "tenant"
      // ]
    console.log(this.uProfile)
    console.log(this.uProfile.principal)
    console.log(this.uProfile.sub)
    console.log(this.uProfile.credential)
    console.log(this.uProfile.given_name)
    console.log(this.uProfile.family_name)
    console.log(this.uProfile.fiscalNumber)
    console.log(this.uProfile.email)
    console.log(this.uProfile.tenant)
  }
  isLoggedIn(){
    console.log(this.authService.isLoggedIn())
  }
  decodeAT(){
    var res = this.authService.decode(this.authService.getAccessToken())
    console.log(res)
  }
  decodeIT(){
    var res = this.authService.decode(this.authService.getIdToken())
    console.log(res)
  }
  processIdToken(){
    this.authService.processIdToken()
  }
  grantedScopes(){
    this.authService.grantedScopes()
  }
  
  redirect(){
    if((this.profile.email).includes('studenti')){
      this.authService.setRank(1)
      this.router.navigate(['/homes'])
    }
    else{
      this.authService.setRank(2)
      this.router.navigate(['/homec'])
    }
  }

  saveData(){
    this.datistudente.nome = this.profile.given_name
    this.datistudente.cognome = this.profile.family_name
    this.datistudente.email = this.profile.email
  }

}
