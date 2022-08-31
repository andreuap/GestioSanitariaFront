import { Component, OnInit } from '@angular/core';
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
  cols : any = null;
  constructor(private userListService : UserListService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList()
  {
    try
    {
      this.userListService.getUserList().subscribe((data) => {
        this.userData = data;

        this.cols= [
          { field: 'userName', header: 'UserName' },
          { field: 'password', header: 'password' },
          { field: 'email', header: 'Email' },
          { field: 'dataAlta', header: 'Data Alta' },
          { field: 'dataBaixa', header: 'Data Baixa' },
          { field: 'esBloquejat', header: 'Bloquejat'},
          { field: 'rol', header: 'Rol'}
      ];
        console.log(this.userData);
      });
    }
    catch(Exception)
    {

    }
  }

  onRowEditInit(userData: UsersList) {

  }
  onRowEditSave(user : UsersList)
  {

  }
  onRowEditCancel(userData: UsersList, index : number){

  }
}
