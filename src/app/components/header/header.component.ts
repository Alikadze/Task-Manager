import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '../../core/facades/auth.facade';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  authFacade = inject(AuthFacade)

  get isAuthenticated() {
    return this.authFacade.isAuthenticated
  }

  logout() {
    this.authFacade.logOut()
  }
}
