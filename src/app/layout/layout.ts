import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.html',  
  styleUrls: ['./layout.css'],
  imports: [RouterModule]
})

export class LayoutComponent {
  appTitle = 'Новини ІТ-індустрії';
}