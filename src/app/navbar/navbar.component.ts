import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../shared/service/token-storage/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
  }

  navigateToHome(): void {
    this.router.navigate(['/home']);
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  navigateToAccount(): void {
    this.router.navigate(['/account']);
  }

  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  navigateToNewOrder(): void {
    this.router.navigate(['/new-order']);
  }

  navigateToReceivedOrder(): void {
    this.router.navigate(['/received-order']);
  }

  logOut(): void {
    this.tokenService.signOut();
  }
}
