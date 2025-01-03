import { Injectable, inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private oAuthService = inject(OAuthService)

  constructor() { this.initConfiguration() }

  initConfiguration(){
    const authConfig: AuthConfig = {
      loginUrl: 'https://iam.unipi.it/oauth2/authorize',
      //strictDiscoveryDocumentValidation: false,
      clientId: 'Wbws32kf9AffowqIo8_yFZWfljIa',
      // redirectUri: window.location.origin + '/auth',
      redirectUri: 'https://pds.di.unipi.it/auth',
      scope: 'openid profile',
      userinfoEndpoint: 'https://iam.unipi.it/oauth2/userinfo',
      tokenEndpoint: 'https://iam.unipi.it/oauth2/token',
      //requireHttps: false
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
    //this.oAuthService.loadDiscoveryDocumentAndTryLogin()
  }
  login(){
    this.oAuthService.initImplicitFlow()
    //this.oAuthService.initLoginFlow()
  }
  logout(){
    this.oAuthService.revokeTokenAndLogout()
    this.oAuthService.logOut()
  }
  getProfile(){
    this.oAuthService.getIdentityClaims()
  }
  getToken(){
    this.oAuthService.getAccessToken()
  }
}
