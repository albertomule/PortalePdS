import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oAuthService = inject(OAuthService)

  constructor(private http: HttpClient) { this.initConfiguration() }

  initConfiguration(){
    const authConfig: AuthConfig = {
      issuer: 'https://iam.unipi.it',
      clientId: 'Wbws32kf9AffowqIo8_yFZWfljIa',
      loginUrl: 'https://iam.unipi.it/oauth2/authorize',
      redirectUri: 'http://pds.di.unipi.it:4200/auth',
      logoutUrl: 'http://pds.di.unipi.it/start',
      scope: 'openid profile email',
      userinfoEndpoint: 'https://iam.unipi.it/oauth2/userinfo',
      tokenEndpoint: 'https://iam.unipi.it/oauth2/token',
      requireHttps: false,
      oidc: true,
      strictDiscoveryDocumentValidation: false,
      responseType: 'id_token token',
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
    this.oAuthService.initImplicitFlow()
    //this.oAuthService.initLoginFlow()
    //   this.oAuthService.tryLogin().catch(err => {
    //     console.error(err);
    //   }).then(() => {
    //     if (!this.oAuthService.hasValidAccessToken()) {
    //       this.oAuthService.initImplicitFlow()
    //     }
    //   });
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
        Authorization: `Bearer ${this.getAccessToken()}`
      }
    })
  }
  isLoggedIn(){
    return this.oAuthService.hasValidAccessToken()
  }
}
