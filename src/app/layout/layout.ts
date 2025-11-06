

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemsListComponent } from '../items-list/items-list';
import { HeaderComponent } from '../header/header'; 
import { FooterComponent } from '../footer/footer'; 

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterModule, 
    ItemsListComponent,
    HeaderComponent, 
    FooterComponent   
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class LayoutComponent {
}