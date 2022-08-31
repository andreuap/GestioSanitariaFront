import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public logingEventEmitter: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(
    private http: HttpClient,
    private router: Router,
    private utils: UtilsService,
    private jwt: JwtService,

  ) { }

  checkUserLoggedIn(): boolean {
    return this.jwt.tokenValid();
  }

  async logIn(loginForm: UntypedFormGroup): Promise<boolean> {
    let success = false;
    try {
      let petition: any = await this.http.post(environment.baseUrl + '/api/UserApi/LoginUser',
        this.utils.objectToFormData(loginForm.value)).toPromise();
        console.log(petition)
      if (petition.userName)
      {
        localStorage.setItem('authToken', petition.token);

        success = true;
        this.router.navigate(['/home']);
      }
    } catch (exception) {
      console.error(exception);

    }
    this.logingEventEmitter.next('logged in');
    return success;
  }

  async register(registerForm: FormGroup): Promise<boolean> {
    let success = false;
    try {
      console.log('Los datos del registro son: ', registerForm.value);
      let registerUser =  this.utils.objectToFormData(registerForm.value);
      console.log('Los datos del registro son: ', registerUser);
      let petition: any = await this.http.post(environment.baseUrl + '/api/UserApi', registerUser).toPromise();
      let jsonStringPetition = JSON.stringify(petition);
      console.log('Los datos de la peticion son: '+ jsonStringPetition);
      if (jsonStringPetition.length > 0) {
        success = true;
        this.router.navigate(['/login']);
      }
    } catch (exception) {
      console.error(exception);
    }
    this.logingEventEmitter.next('Registardo');
    return success;
  }

  async requestPasswordReset(email: string, captchaResponse: string) {
    const payload = new FormData();
    let res = false;
    payload.append('email', email);
    payload.append('captchaResponse', captchaResponse);
    let response: any = await this.http.post(environment.baseUrl + '/forgotPassword', payload).toPromise();
    console.log(response.success);
    if(response && response.success) {
      this.router.navigate(['/']);
    }

    return res;
  }

  async resetPassword(email: string, code: string, password: string) {
    const payload = new FormData();
    let res = false;
    payload.append('email', email);
    payload.append('code', code);
    payload.append('password', password);
    let response: any = await this.http.post(environment.baseUrl + '/resetPassword', payload).toPromise();
    if(response && response.success) {
      this.router.navigate(['/']);
    }

    return res;
  }
}
