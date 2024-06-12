import { Component, OnChanges, SimpleChanges, inject } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { GetStartedComponent } from "../../components/get-started/get-started.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [
        RouterOutlet,
        RouterLink,
        GetStartedComponent
    ]
})
export class HomeComponent {
  currentRoute = '';
  router = inject(Router)

  navigateAndScrollToTop() {
    this.router.navigate(['auth/register']).then(() => {
      window.scrollTo(0, 93);
    });
  }
}
