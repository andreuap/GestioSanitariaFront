import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { environment_ip } from 'src/environments/environment_ip';
import { UsersList } from '../interfaces/users-list';
import { UserListService } from '../services/user-list.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styles: [`
        :host ::ng-deep .p-cell-editing {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
    `]
})
export class UsersListComponent implements OnInit {

  userData : any = null;
  user : any = null;
  rolesList : any;
  rolesData : any = null;
  rol: any = null;
  clonedUser: { [s: string]: UsersList; } = {};

  constructor(private userListService : UserListService,
              private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList()
  {
    try
    {
      this.userListService.getUserList().subscribe((data) => {
        this.userData = data;
        console.log(this.userData);
      });
    }
    catch(Exception)
    {

    }
  }

  onRowEditInit(userData: UsersList) {
    this.rolesData = this.onGetRoles();
    console.log(this.rolesData);
    this.clonedUser[userData.id.toString()] = {...userData}

  }
  onRowEditSave(userData : UsersList)
  {
    const headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Access-Control-Allow-Headers', 'Content-Type')
    let jsonObject = JSON.stringify(userData);
    console.log('Los datos: ' + jsonObject);
    let petition = this.httpClient.put<UsersList>(environment_ip.baseUrl + '/api/UserApi/' + userData.id,
    {
      "Id": userData.id,
      "UserName": userData.userName,
      "Password": userData.password,
      "Email": userData.email,
      "DataAlta": userData.dataAlta,
      "DataBaixa": userData.databaixa,
      "EsBloquejat": userData.esBloquejat,
      "Rol": this.rol

    }, {headers}).subscribe();
    console.log(petition);
    return petition;

  }
  onRowEditCancel(userData: UsersList, index : number){

  }

  onGetRoles()
  {
    return this.httpClient.get(environment_ip.baseUrl + '/api/RolesApi').subscribe((data) => {
      this.rolesList = data;
      console.log(this.rolesList);
    });
  }

  onRolSelected(value: string)
  {
    this.rol = value;
    console.log("El valor seleccionado es: " + value);

  }
}


