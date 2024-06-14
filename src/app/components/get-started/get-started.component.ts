import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss'
})
export class GetStartedComponent {
  router = inject(Router);

  navigateAndScrollToTop() {
    this.router.navigate(['auth/register']).then(() => {
      window.scrollTo(0, 0);
    });
  }
}
