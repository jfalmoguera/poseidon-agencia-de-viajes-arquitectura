import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly APP_USER = 'APP_USER';

  constructor(private loginService: LoginService) { }

  get isUserAuthenticated(): boolean {
    return localStorage.getItem(this.APP_USER) !== null;
  }

  get bearer(): string {

    const b = localStorage.getItem(this.APP_USER);

    if (b) {
      const user: Usuario = JSON.parse(b);
      return user.bearer;
    }

    return '';
  }

  get user(): Usuario | null {
    const b = localStorage.getItem(this.APP_USER);

    return b ? new Usuario(b) : null;
  }

  storeUser(usuario: Usuario): void {
    localStorage.setItem(this.APP_USER, JSON.stringify(usuario));
    // this.initializeRefreshToken(usuario);
  }

  logOutUser(): void {
    localStorage.removeItem(this.APP_USER);
  }

  initializeRefreshToken(usuario: Usuario): void {

    // inicialmente: 3600 -> 75%;

    const expires_in = usuario.expires_in * 0.75;

    setTimeout(() => {
      this.loginService.refreshToken(usuario).subscribe(x => {
        usuario.bearer = x.bearer;
        usuario.expires_in = x.expires_in;
        usuario.refresh_token = x.refresh_token;

        this.storeUser(usuario);
      })
    }, expires_in);
  }


}
