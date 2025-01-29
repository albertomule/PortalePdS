import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oAuthService = inject(OAuthService)

  //0 = user non loggato
  //1 = studente
  //2 = commissione
  //3 = sysadmin
  rank = 3

  constructor(private http: HttpClient) { this.initConfiguration() }

  initConfiguration(){
    const authConfig: AuthConfig = {
      issuer: 'https://iam.unipi.it/oauth2',
      clientId: 'Wbws32kf9AffowqIo8_yFZWfljIa',
      loginUrl: 'https://iam.unipi.it/oauth2/authorize',
      redirectUri: 'http://pds.di.unipi.it:4200/auth',
      logoutUrl: 'http://pds.di.unipi.it:4200/start',
      scope: 'openid profile email Wbws32kf9AffowqIo8_yFZWfljIa',
      userinfoEndpoint: 'https://iam.unipi.it/oauth2/userinfo',
      tokenEndpoint: 'https://iam.unipi.it/oauth2/token',
      requireHttps: false,
      oidc: true,
      strictDiscoveryDocumentValidation: false,
      responseType: 'id_token token',
      requestAccessToken: true,
      skipIssuerCheck: true,
      showDebugInformation: true
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
    }

    this.oAuthService.configure(authConfig)
    this.oAuthService.setupAutomaticSilentRefresh()
    this.oAuthService.tryLogin()
  }
  login(){
    //this.oAuthService.initCodeFlow()
    //this.oAuthService.initImplicitFlow()
    //this.oAuthService.initLoginFlow()
    this.oAuthService.tryLogin().catch(err => {
      console.error(err);
    }).then(() => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initImplicitFlow()
      }
    });
  }
  logout(){
    this.oAuthService.revokeTokenAndLogout()
    this.oAuthService.logOut()
  }
  getIdentityClaims(){
    return this.oAuthService.getIdentityClaims()
  }
  getAccessToken(){
    return this.oAuthService.getAccessToken()
  }
  loadUserProfile(){
    this.oAuthService.loadUserProfile().then((userProfile) => {
      console.log(JSON.stringify(userProfile))
    })
  }
  getIdToken(){
    return this.oAuthService.getIdToken()
  }
  get getUserProfile(){
    const url = "https://iam.unipi.it/oauth2/userinfo"

    return this.http.get(url, {
      headers:{
        Authorization: `Bearer ${this.oAuthService.getAccessToken()}`
      }
    })
  }
  isLoggedIn(){
    return this.oAuthService.hasValidAccessToken()
  }
  decode(token: string){
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
  
      return JSON.parse(jsonPayload);
  }
  // decode2(token: string){
  //   return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  // }
  processIdToken(){
    var ptoken = this.oAuthService.processIdToken(this.oAuthService.getIdToken(), this.oAuthService.getAccessToken(), true)
    console.log(ptoken)
  }
  grantedScopes(){
    console.log(this.oAuthService.getGrantedScopes())
  }

  isStudente(){
    return(this.rank === 1 || this.rank === 3)
  }
  isCommissione(){
    return(this.rank === 2 || this.rank === 3)
  }
}
