import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit{
  ngOnInit(): void {
    history.pushState(null, '', location.href);
   window.onpopstate = function () {
   history.go(1);
};
  }
  
}