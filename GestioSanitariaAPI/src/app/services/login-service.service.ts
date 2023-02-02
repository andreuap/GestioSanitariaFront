import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, UntypedFormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject } from 'rxjs';
import { environment_iis } from 'src/environments/environment_iis';
import { environment_ip } from 'src/environments/environment_ip';


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
        let petition: any = await this.http.post(environment_ip.baseUrl + '/api/UserApi/LoginUser', this.utils.objectToFormData(loginForm.value)).toPromise();
        //let petition: any = await this.http.post(environment_iis.baseUrl + '/api/UserApi/LoginUser',
        //this.utils.objectToFormData(loginForm.value)).toPromise();
      if (petition.userName)
      {
        localStorage.setItem('authToken', petition.token);
        console.log("Los datos del token son: " + petition.token);
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
      let registerUser =  this.utils.objectToFormData(registerForm.value);
      let petition: any = await this.http.post(environment_iis.baseUrl + '/api/UserApi', registerUser).toPromise();
      let jsonStringPetition = JSON.stringify(petition);
      if (jsonStringPetition.length > 0) {
        success = true;
        this.router.navigate(['/login']);
      }
    } catch (exception) {
      console.error(exception);
    }
    this.logingEventEmitter.next('Registrado');
    return success;
  }

  async requestPasswordReset(email: string, captchaResponse: string) {
    const payload = new FormData();
    let res = false;
    payload.append('email', email);
    payload.append('captchaResponse', captchaResponse);
    let response: any = await this.http.post(environment_iis.baseUrl + '/forgotPassword', payload).toPromise();
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
