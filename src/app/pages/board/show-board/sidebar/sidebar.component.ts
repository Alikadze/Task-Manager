import { Component } from '@angular/core';
import { WorkspaceComponent } from "./workspace/workspace.component";
import { MatDivider } from '@angular/material/divider';
import { SidebarBoardsComponent } from "./sidebar-boards/sidebar-boards.component";

@Component({
    selector: 'app-sidebar',
    standalone: true,
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    imports: [
        WorkspaceComponent,
        MatDivider,
        SidebarBoardsComponent
    ]
})
export class SidebarComponent {

}
