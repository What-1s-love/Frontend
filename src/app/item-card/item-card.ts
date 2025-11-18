import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() article?: Article;
  @Output() select = new EventEmitter<Article>();

  // Динамічне обчислення "Новизни"
  public get isNew(): boolean {
    if (!this.article) {
      return false;
    }
    const today = new Date();
    const publicationDate = new Date(this.article.date);
    const diffInMs = today.getTime() - publicationDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    
    return diffInDays < 3; // Новина вважається новою менше 3 днів
  }

  // Метод для кнопки
  public onDetailsClick(): void {
    this.select.emit(this.article);
  }
}