// src/app/item-card/item-card.component.ts

import { Component, Input } from '@angular/core'; // 1. Імпорт Input
import { Article } from '../shared/models/article.model';
import { CommonModule } from '@angular/common'; // 3. Імпорт CommonModule (для *ngIf та 'date')

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule], // 4. Додаємо в imports
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() article?: Article;
}