import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
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
}
