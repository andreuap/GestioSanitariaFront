import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginService } from '../services/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loading = true;

  loginForm = new UntypedFormGroup({
    username:  new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });



  constructor(
    private loginService: LoginService,
    private messages: MessageService,
    private router: Router,
    //private recaptchaV3Service: ReCaptchaV3Service


  ) { }

  ngOnInit(): void {
    if(this.loginService.checkUserLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.loading = false;
    }
  }

  async onSubmit(){
    this.loading = true;
    try {
      let login = await this.loginService.logIn(this.loginForm);
      if(!login) {
        this.messages.add({severity:'warn', summary:'Login failed', detail:'Check email, passowrd, or if you recived the activation email!'});
      }
    } catch (exception) {
      console.log(exception);
      this.messages.add({severity:'error', summary:'Something failed!', detail:'Something has failed. Check your internet connection or try again later'});

    }
    this.loading = false;
  }

}
