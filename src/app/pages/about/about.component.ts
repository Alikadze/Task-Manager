import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
}