import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  loading = false;

  loginForm = new UntypedFormGroup({
    username:  new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    rol: new UntypedFormControl('', [Validators.required])
  });

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit()
  {

  }

}
