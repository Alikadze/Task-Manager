import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer-info',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './footer-info.component.html',
  styleUrl: './footer-info.component.scss'
})
export class FooterInfoComponent {
  @Input() title: string = '';

  @Input() links: {title: string, url: string}[] = [];

}
