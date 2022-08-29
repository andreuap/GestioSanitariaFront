import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
      return this.httpClient.get(environment.baseUrl + '/api/UserApi');
  }
}


