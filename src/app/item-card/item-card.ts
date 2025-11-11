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

  public get isNew(): boolean {
    // Якщо даних статті ще немає, вона не нова
    if (!this.article) {
      return false;
    }

    const today = new Date(); // Сьогоднішня дата
    const publicationDate = new Date(this.article.date); // Дата публікації (перетворюємо на об'єкт Date)

    // 1. Отримуємо різницю в мілісекундах
    const diffInMs = today.getTime() - publicationDate.getTime();
    
    // 2. Переводимо мілісекунди в дні
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    // 3. Встановлюємо "діапазон дат" (наприклад, 3 дні)
    // Якщо з моменту публікації пройшло менше 3 днів, новина - НОВА.
    return diffInDays < 3;
  }
}
