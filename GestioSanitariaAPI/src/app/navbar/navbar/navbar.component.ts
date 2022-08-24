import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
currentUrl = '';
  showDefaultNav = true;
  showLoggedNav = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url;
        this.showDefaultNav = !( this.currentUrl == '/signup' || this.currentUrl == '/login' || this.currentUrl == '/home' );
        this.showLoggedNav =  this.currentUrl == '/home';
        console.log(this.showDefaultNav);
      }
    });
   }

  ngOnInit(): void {
  }

  onLogout()
  {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
