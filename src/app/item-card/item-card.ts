import { Component, Input } from '@angular/core';
import { Article } from '../shared/models/article.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../shared/pipes/truncate-pipe';
import { HighlightDirective } from '../shared/directives/highlight.directive';


@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, HighlightDirective],
  templateUrl: './item-card.html',
  styleUrls: ['./item-card.css']
})
export class ItemCardComponent {
  @Input() article?: Article;

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

}
