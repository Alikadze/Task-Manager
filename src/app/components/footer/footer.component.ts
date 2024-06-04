import { Component } from '@angular/core';
import { FooterInfoComponent } from "../footer-info/footer-info.component";
import { FOOTER_INFO } from '../../data/footer-item';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [FooterInfoComponent]
})
export class FooterComponent {
  footerInfo = FOOTER_INFO;
}
