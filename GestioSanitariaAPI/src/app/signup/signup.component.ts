import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loading = false;

  //minimumRegistrationDate: Date;

  loginForm = new UntypedFormGroup({
    username:  new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    dataalta: new UntypedFormControl('', [Validators.required]),
    databaixa: new UntypedFormControl('', []),
    bloquejat:  new UntypedFormControl(false, []),
  });

  constructor(
    private loginService: LoginService,
    //private messages: MessageService,

   ) {
  }

  ngOnInit(): void {


  }



  async onSubmit(){
    this.loading = true;
    //try {
      let petition = await this.loginService.register(this.loginForm);
      /*if(petition) {
        this.messages.add({severity:'success', summary:'Success!', detail:'Please check your email to activate your account'});
      } else {
        this.messages.add({severity:'warn', summary:'Email or url in use', detail:'Email or url already in use!'});

      }

      } catch (exception) {
        this.messages.add({severity:'error', summary:'Something failed!', detail:'Something has failed. Check your internet connection or try again later'});
      }*/


    this.loading = false;
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }
}
