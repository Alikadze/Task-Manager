import { Component } from '@angular/core';
import { GetStartedComponent } from "../../../components/get-started/get-started.component";

@Component({
    selector: 'app-transform',
    standalone: true,
    templateUrl: './transform.component.html',
    styleUrl: './transform.component.scss',
    imports: [GetStartedComponent]
})
export class TransformComponent {

}
