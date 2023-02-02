import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { environment_ip } from 'src/environments/environment_ip';
import { UsersList } from '../interfaces/users-list';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getUserList()
  {
      return this.httpClient.get(environment_ip.baseUrl + '/api/UserApi');
  }
}


