import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login-service.service';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { environment_iis } from 'src/environments/environment_iis';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  loading = false;
  rolesList : any;

  //minimumRegistrationDate: Date;

  loginForm = new UntypedFormGroup({
    username:  new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    dataalta: new UntypedFormControl(this.currentDate(), [Validators.required]),
    rol: new UntypedFormControl('', [Validators.required])
  });

  constructor(
    private loginService: LoginService,
    private messages: MessageService,
    private httpClient: HttpClient
   ) {
  }

  ngOnInit(): void {
    this.onGetRoles();
  }



  async onSubmit(){
    this.loading = true;
    try {
      let petition = await this.loginService.register(this.loginForm);
      if(petition) {
        this.messages.add({severity:'success', summary:'Success!', detail:'Can you login or later'});
      } else {
        this.messages.add({severity:'warn', summary:'Username in use', detail:'Username exist!'});

      }

      } catch (exception) {
        this.messages.add({severity:'error', summary:'Something failed!', detail:'Something has failed. Check your internet connection or try again later'});
      }


    this.loading = false;
  }

  currentDate() {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

  onGetRoles()
  {
    //return this.httpClient.get(environment.baseUrl + '/api/RolesApi').subscribe((data) => { this.rolesList = data });
    return this.httpClient.get(environment.baseUrl + '/api/RolesApi').subscribe((data) => {
      this.rolesList = data;
    });
  }
}
