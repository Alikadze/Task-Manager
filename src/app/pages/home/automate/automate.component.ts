import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GetStartedComponent } from "../../../components/get-started/get-started.component";

@Component({
    selector: 'app-automate',
    standalone: true,
    templateUrl: './automate.component.html',
    styleUrl: './automate.component.scss',
    imports: [
        RouterLink,
        GetStartedComponent
    ]
})
export class AutomateComponent {

}
