import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemCardComponent } from '../item-card/item-card';
import { Article } from '../shared/models/article.model';
import { DataService } from '../shared/services/data'; // Імпорт сервісу

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, FormsModule],
  templateUrl: './items-list.html',
  styleUrls: ['./items-list.css']
})
export class ItemsListComponent implements OnInit {

  public searchText: string = '';
  public allArticles: Article[] = []; // Тут тепер пусто, дані прийдуть з сервісу

  // Інжектуємо сервіс
  constructor(private dataService: DataService) {}

  // Отримуємо дані при старті
  ngOnInit(): void {
    this.allArticles = this.dataService.getData();
  }

  // Getter для фільтрації (пошук)
  public get filteredArticles(): Article[] {
    if (!this.searchText) {
      return this.allArticles;
    }
    return this.allArticles.filter(article =>
      article.title.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  // Обробка кліку на кнопку "Детальніше"
  public handleArticleSelect(article: Article): void {
    console.log('Обрано статтю (з батьківського компонента):', article.title);
  }
}