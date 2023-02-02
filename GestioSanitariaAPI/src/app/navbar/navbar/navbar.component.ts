import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {MenuItem} from 'primeng/api';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';
import { LoginService } from 'src/app/services/login-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUrl = '';
  showDefaultNav = true;
  showLoggedNav = false;
  userRol = '';
  itemsAdmin: MenuItem[] = [];
  itemsMetges : MenuItem[] = [];
  itemsAdministrativo: MenuItem[] = [];
  loginSubscription : Subscription;

  constructor(private router: Router, private jwt: JwtService, private loginService : LoginService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showDefaultNav = !( this.currentUrl == '/signup' || this.currentUrl == '/login' || this.currentUrl == '/home' || this.currentUrl == '/users-list' || this.currentUrl == '/paciente');
        this.showLoggedNav =  (this.currentUrl == '/home' || this.currentUrl == '/users-list' || this.currentUrl == '/paciente');
        console.log("El valor del navbar es: " + this.showDefaultNav);
      }
    });

     this.loginSubscription = this.loginService.logingEventEmitter.subscribe(loginEvent => {
        this.onGetTokenData();
      });
   }

  ngOnInit(): void {
    this.onGetTokenData();
    this.onGetItemsAdmin();
    this.ongetItemsMetges();
    this.onItemsAdministrativo();
}

  onLogout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  onGetTokenData()
  {
    let tokenData = this.jwt.getTokenData();
    console.log('Los datos del token: ' ,tokenData);
    this.userRol= tokenData['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    console.log('El rol del usuario es: ' + this.userRol);
    return this.userRol;

  }

  onGetItemsAdmin()
  {
      this.itemsAdmin = [
      {
          label: 'Admin',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
                label: 'Usuarios',
                icon: 'pi pi-fw pi-users',
                items: [
                  {
                    label: 'Lista de usuarios',
                    routerLink : ['/users-list']
                  },
                ]
            },
            {
              label: 'Roles',
              icon: 'pi pi-fw pi-user',
              items: [
                  {label: 'Lista de roles'},
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

  ongetItemsMetges()
  {
    this.itemsMetges = [
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

  onItemsAdministrativo()
  {
    this.itemsAdministrativo = [
      {
          label: 'Pacientes',
          icon: 'pi pi-fw pi-cog',
          items: [
            {
                label: 'Ficha Pacientes',
                icon: 'pi pi-fw pi-users',
                items: [
                {
                  label: 'Crear Ficha de paciente',
                  icon: 'pi pi-fw pi-user-plus',
                  routerLink : ['/paciente']
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

  ngOnDestroy()
  {
    this.loginSubscription.unsubscribe();
  }
}
