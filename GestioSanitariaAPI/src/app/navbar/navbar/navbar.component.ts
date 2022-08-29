import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUrl = '';
  showDefaultNav = true;
  showLoggedNav = false;
  items: MenuItem[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showDefaultNav = !( this.currentUrl == '/signup' || this.currentUrl == '/login' || this.currentUrl == '/home' || this.currentUrl == '/users-list');
        this.showLoggedNav =  (this.currentUrl == '/home' || this.currentUrl == '/users-list');
        console.log(this.showDefaultNav);
      }
    });
   }

  ngOnInit(): void {
    this.items = [
      {
          label: 'Admin',
          items: [
            {
                label: 'Users',
                icon: 'pi pi-fw pi-users',
                items: [
                  {
                    label: 'List of users',
                    routerLink : ['/users-list']
                  },
                ]
            },
            {
              label: 'Roles',
              icon: 'pi pi-fw pi-user',
              items: [
                  {label: 'List of rols'},
                  {label: 'Other'},
              ]
          },
          ]
      },
      {
          label: 'Edit',
          icon: 'pi pi-fw pi-pencil',
          items: [
              {label: 'Delete', icon: 'pi pi-fw pi-trash'},
              {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
          ]
      },
      {
        label: 'LogOut',
        icon: 'pi pi-fw pi-sign-out' ,
        command : () => this.onLogout()
      },
  ];
}

  onLogout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
