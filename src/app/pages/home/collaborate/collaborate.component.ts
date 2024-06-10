import { Component } from '@angular/core';
import { GetStartedComponent } from "../../../components/get-started/get-started.component";

@Component({
    selector: 'app-collaborate',
    standalone: true,
    templateUrl: './collaborate.component.html',
    styleUrl: './collaborate.component.scss',
    imports: [GetStartedComponent]
})
export class CollaborateComponent {

}
