import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment_ip } from 'src/environments/environment_ip';
import { Sexe } from '../interfaces/sexe';
import { UtilsService } from '../services/utils.service';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {
loading = false;
CreatePacienteForm= new UntypedFormGroup({
  nom:  new UntypedFormControl(''),
  primercognom: new UntypedFormControl(''),
  segoncognom: new UntypedFormControl(''),
  email : new UntypedFormControl(''),
  edat: new UntypedFormControl(''),
  dataneixament: new UntypedFormControl(this.startDate()),
  direccio: new UntypedFormControl(''),
  telefon: new UntypedFormControl(''),
});
selectedGenere : any;
genere : Sexe[];
public logingEventEmitter: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private utils: UtilsService,
              private http: HttpClient,
              private router: Router,) {
    this.genere = [
      {name: 'Home', code: 'H'},
      {name: 'Dona', code: 'D'},
      {name: 'Indefinit', code: 'I'},
    ]
   }

  ngOnInit(): void {
    this.selectedGenere = this.genere[2];
  }

  async onSubmit() : Promise<boolean>
  {
    let success = false;
    try {
      console.log("Los datos del formulario son: ", this.CreatePacienteForm.value);
      let createPaciente =  this.utils.objectToFormData(this.CreatePacienteForm.value);
      console.log("El formData es: ", createPaciente);
      let petition: any = await this.http.post(environment_ip.baseUrl + '/api/PacientesApi', createPaciente).toPromise();
      console.log(petition);
      let jsonStringPetition = JSON.stringify(petition);
      if (jsonStringPetition.length > 0) {
        success = true;
        this.router.navigate(['/home']);
      }
    } catch (exception) {
      console.error(exception);
    }
    this.logingEventEmitter.next('Ficha de paciente creada');
    return success;
  }

  startDate()
  {
    const currentDate = new Date();
    return currentDate.toISOString().substring(0,10);
  }

}
